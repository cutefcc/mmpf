import { fcp, tbt } from '../data/metrics';
import { IPerformanceEntry } from '../typings/types';

export const initTotalBlockingTime = (
  performanceEntries: IPerformanceEntry[]
): void => {
  performanceEntries.forEach((entry) => {
    //从fcp -> tti获取长耗时任务（self表示耗时长任务来自于渲染帧）
    // console.log('🍌', entry);
    if (entry.name !== 'self' || entry.startTime < fcp.value) {
      return;
    }
    // console.log('🍌2', entry);
    //https://developer.mozilla.org/zh-CN/docs/Web/API/Long_Tasks_API
    //长耗时任务意味着执行时间超过50ms的
    const blockingTime = entry.duration - 50;
    if (blockingTime > 0) {
      tbt.value += blockingTime;
    }
  });
};
