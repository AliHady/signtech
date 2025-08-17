export interface PeriodStats {
  Total: number;
  New: number;
  Pending: number;
  Completed: number;
}

export interface PeriodStatisticsDto {
  ThisWeek: PeriodStats;
  ThisMonth: PeriodStats;
}