import ReportData from '../data/ReportData';
import { IMmpfConfig, IReportData } from '../typings/types';

export const config: IMmpfConfig = {
  // Metrics
  reportData: new ReportData({ logUrl: 'hole' }),
  isResourceTiming: false,
  isElementTiming: false,
  // Logging
  maxTime: 15000,
};
