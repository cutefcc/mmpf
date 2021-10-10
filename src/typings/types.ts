export interface IMmpfDataConsumption {
  beacon: number;
  css: number;
  fetch: number;
  img: number;
  other: number;
  script: number;
  total: number;
  xmlhttprequest: number;
}
export interface IMmpfNavigationTiming {
  fetchTime?: number;
  workerTime?: number;
  totalTime?: number;
  downloadTime?: number;
  ttfb?: number;
  headerSize?: number;
  dnsLookupTime?: number;
  tcpTime?: number;
  whiteTime?: number;
  domreadyTime?: number;
  loadTime?: number;
  parseDomTime?: number;
}
export type EffectiveConnectionType =
  | '2g'
  | '3g'
  | '4g'
  | '5g'
  | 'slow-2g'
  | 'lte';
export interface IMmpfNetworkInformation {
  downlink?: number;
  effectiveType?: EffectiveConnectionType;
  onchange?: () => void;
  rtt?: number;
  saveData?: boolean;
}
export type IMmpfData =
  | number
  | IMmpfNavigationTiming
  | IMmpfNetworkInformation;

export interface INavigatorInfo {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  isLowEndDevice?: boolean;
  isLowEndExperience?: boolean;
  serviceWorkerStatus?: 'controlled' | 'supported' | 'unsupported';
}
export type IVitalsScore = 'good' | 'needsImprovement' | 'poor' | null;

export interface IAnalyticsTrackerOptions {
  metricName: string;
  data: IMmpfData;
  eventProperties: object;
  navigatorInformation?: INavigatorInfo;
  vitalsScore: IVitalsScore;
}
export interface IMmpfOptions {
  // Metrics
  captureError?: boolean;
  resourceTiming?: boolean;
  elementTiming?: boolean;
  // Analytics
  analyticsTracker?: (options: IAnalyticsTrackerOptions) => void;
  // Logging
  maxMeasureTime?: number;
  logUrl?: string;
}
export interface IReportData {
  sendToAnalytics(level: AskPriority, body: string): void;
}
/**
 * @param isResourceTiming - 是否开启资源数据
 * @param isElementTiming - 是否开启性能数据
 * @param analyticsTracker - 最大请求时间
 * @param analyticsTracker - void方法参数IAnalyticsTrackerOptions
 * @param maxTime - 自定义分析工具
 * @interface 系统配置接口
 * @public
 */
export interface IMmpfConfig {
  reportData: IReportData;
  isResourceTiming: boolean;
  isElementTiming: boolean;
  analyticsTracker?: (options: IAnalyticsTrackerOptions) => void;
  maxTime: number;
}

export interface IPerfObservers {
  [measureName: string]: any;
}
//性能指标参数
export type IPerformanceObserverType =
  | 'first-input'
  | 'largest-contentful-paint'
  | 'layout-shift'
  | 'longtask'
  | 'measure'
  | 'navigation'
  | 'paint' // paint entryType  包含：first-paint  first-content-paint
  | 'element'
  | 'resource';
//性能指标具体请求类型
export type IPerformanceEntryInitiatorType =
  | 'beacon'
  | 'css'
  | 'fetch'
  | 'img'
  | 'other'
  | 'script'
  | 'xmlhttprequest';
export declare interface IPerformanceEntry {
  decodedBodySize?: number;
  duration: number;
  entryType: IPerformanceObserverType;
  initiatorType?: IPerformanceEntryInitiatorType;
  loadTime: number;
  name: string;
  renderTime: number;
  startTime: number;
  hadRecentInput?: boolean;
  value?: number;
  identifier?: string;
}
//度量指标数据
export interface IMetricMap {
  [measureName: string]: boolean;
}
// https://wicg.github.io/event-timing/#sec-performance-event-timing
export interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: DOMHighResTimeStamp;
  target?: Node;
}
//请求响应优先级
export enum AskPriority {
  URGENT = 1,
  IDLE = 2,
}
