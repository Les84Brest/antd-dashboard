
export function getMonthShort (month: number | string) : string {
    const monthStr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'okt', 'now', 'dec'];

    return monthStr[+month];
}