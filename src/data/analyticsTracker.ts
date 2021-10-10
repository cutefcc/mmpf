import { IAnalyticsTrackerOptions } from '../typings/types';
const analyticsTracker = (options: IAnalyticsTrackerOptions): void => {
  // const {
  //   metricName,
  //   eventProperties,
  //   data,
  //   navigatorInformation,
  //   vitalsScore,
  // } = options;
  console.table(options);
};
export default analyticsTracker;
