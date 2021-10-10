import { logData } from './log';
import { convertToMB } from '../helpers/utils';

/**
 * The estimate() method of the StorageManager interface asks the Storage Manager
 * for how much storage the app takes up (usage),
 * and how much space is available (quota).
 */
export const reportStorageEstimate = (storageInfo: StorageEstimate) => {
  const estimateUsageDetails =
    'usageDetails' in storageInfo ? (storageInfo as any).usageDetails : {};
  logData('storageEstimate', {
    quota: convertToMB((storageInfo as any).quota),
    usage: convertToMB((storageInfo as any).usage),
    // caches: convertToMB(estimateUsageDetails.caches),
    indexedDB: convertToMB(estimateUsageDetails.indexedDB),
    // serviceWorker: convertToMB(estimateUsageDetails.serviceWorkerRegistrations),
  });
};
