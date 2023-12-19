/**
 * @description Returns short string month name based on month number
 * @param month
 */
export function getMonthShort (month: number | string) : string {
    const monthStr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'now', 'dec'];

    return monthStr[+month];
}