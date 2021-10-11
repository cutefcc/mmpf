/**
 * 脉脉性能监控SDK 1.0.0 Mmpf（maimai performance）
 * @remarks
 * @packageDocumentation
 */
import { config } from './config';
import { D, W, WN, WP } from './data/constants';
import { logData } from './data/log';
import { getNavigationTiming } from './performance/getNavigationTiming';
import {
  disconnectPerfObserversHidden,
  initPerformanceObserver,
} from './performance/observe';
import { isPerformanceSupported } from './tools/isSupported';
import { IReportData, IMmpfOptions } from './typings/types';
import ErrorTrace from './error';
import analyticsTracker from './data/analyticsTracker';
import ReportData from './data/reportData';
import { didVisibilityChange } from './helpers/onVisibilityChange';
import { getNetworkInformation } from './helpers/getNetworkInformation';
import { reportStorageEstimate } from './data/storageEstimate';
import { getNavigatorInfo } from './helpers/getNavigatorInfo';

export default class Mmpf {
  private v = '1.0.0';
  private reportData: IReportData;
  constructor(options: IMmpfOptions = {}) {
    // 扩展基础配置
    const logUrl = options.logUrl;
    if (!logUrl) {
      throw new Error(`监控平台${this.v}提示未传递logUrl`);
    }
    //向后台输送数据
    const insReportData = new ReportData({
      logUrl,
    });
    config.reportData = insReportData;
    //对外暴露上传接口
    this.reportData = insReportData;
    //集合数据汇总
    const _analyticsTracker = options.analyticsTracker;
    if (_analyticsTracker) {
      config.analyticsTracker = _analyticsTracker;
    } else {
      config.analyticsTracker = analyticsTracker;
    }
    config.isResourceTiming = !!options.resourceTiming;
    config.isElementTiming = !!options.elementTiming;
    config.maxTime = options.maxMeasureTime || config.maxTime;
    if (options.captureError) {
      //开启错误跟踪
      const errorTtace = new ErrorTrace();
      errorTtace.run();
    }

    //如果浏览器不支持性能指标只能放弃
    if (!isPerformanceSupported()) {
      return;
    }
    //浏览器支持的起FRP这样的Observer统计性能
    if ('PerformanceObserver' in W) {
      initPerformanceObserver();
    }
    //初始化
    if (typeof D.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      D.addEventListener(
        'visibilitychange',
        didVisibilityChange.bind(this, disconnectPerfObserversHidden)
      );
    }

    W.addEventListener('load', () => {
      console.log('page is fully loaded');
      setTimeout(() => {
        console.log('---navigationTiming---start');
        // 记录系统DNS tcp dom解析 白屏等时间
        logData('navigationTiming', getNavigationTiming());
        // 记录用户的网速 H5+多普勒测速
        // logData('networkInformation', getNetworkInformation());
        // // 记录离线缓存数据
        // if (WN && WN.storage && typeof WN.storage.estimate === 'function') {
        //   WN.storage.estimate().then(reportStorageEstimate);
        // }
        // logData('navigatorInformation', getNavigatorInfo())
      }, 0)
    })
  }
}
