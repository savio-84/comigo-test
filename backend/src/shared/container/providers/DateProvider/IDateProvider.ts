export interface IDateProvider {
  sumWorkingDays(startDate: Date, daysToAdd: number): Date;
}