import { C } from '../data/constants';
import { perfObservers } from './observeInstances';
import { IPerformanceObserverType } from '../typings/types';

/**
 * PerformanceObserver 异步订阅封装
 */
export const po = (
  eventType: IPerformanceObserverType,
  cb: (performanceEntries: any[]) => void
): PerformanceObserver | null => {
  try {
    const perfObserver = new PerformanceObserver((entryList) => {
      cb(entryList.getEntries());
    });
    // 订阅时间或者开始计时 buffered不立即执行在内存中留下PerformanceObserver实例
    // 只有订阅了，才能在相应事件发生时去执行上面的cb
    perfObserver.observe({ type: eventType, buffered: true });
    return perfObserver;
  } catch (e) {
    C.warn('mmpf:', e);
  }
  return null;
};
//断开测试通道
export const poDisconnect = (observer: any) => {
  if (perfObservers[observer]) {
    perfObservers[observer].disconnect();
  }
  delete perfObservers[observer];
};
