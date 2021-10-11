import { config } from '../config';
import { logMetric } from '../data/log';
import { cls, lcp, tbt } from '../data/metrics';
import { initLayoutShift } from './cumulativeLayoutShift';
import { initFirstInputDelay } from './firstInput';
import { perfObservers } from './observeInstances';
import {
  initElementTiming,
  initFirstPaint,
  initLargestContentfulPaint,
} from './paint';
import { po, poDisconnect } from './performanceObserver';
import { initResourceTiming } from './resourceTiming';
export const initPerformanceObserver = (): void => {
  // fp & fcp & tbt（perfObservers[4]）
  perfObservers[0] = po('paint', initFirstPaint);
  // fid
  perfObservers[1] = po('first-input', initFirstInputDelay);
  // lcp
  perfObservers[2] = po('largest-contentful-paint', initLargestContentfulPaint);
  // 收集页面全部资源的性能数据
  // if (config.isResourceTiming) {
  //   po('resource', initResourceTiming);
  // }
  // cls
  perfObservers[3] = po('layout-shift', initLayoutShift);
  // 某一个元素开始绘制的时间，需要侵入代码 比如：<div id="app" elementtiming="elPageTitle">Hello</div>
  // if (config.isElementTiming) {
  //   po('element', initElementTiming);
  // }
};

export const disconnectPerfObserversHidden = (): void => {
  if (perfObservers[2]) {
    logMetric(lcp.value, `lcpFinal`);
    poDisconnect(2);
  }
  if (perfObservers[3]) {
    if (typeof perfObservers[3].takeRecords === 'function') {
      perfObservers[3].takeRecords();
    }
    logMetric(cls.value, `clsFinal`);
    poDisconnect(3);
  }
  if (perfObservers[4]) {
    logMetric(tbt.value, `tbtFinal`);
    poDisconnect(4);
  }
};
