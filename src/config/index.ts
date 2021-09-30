import ReportData from '../data/ReportData';
import { IYidengConfig, IReportData } from '../typings/types';

export const config: IYidengConfig = {
  // Metrics
  reportData: new ReportData({ logUrl: 'hole' }),
  isResourceTiming: false,
  isElementTiming: false,
  // Logging
  maxTime: 15000,
};
