const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const formatDate = (date: Date, format: string) => {
  const padStart = (value: number): string => value.toString().padStart(2, '0');
  return format
    .replace(/yyyy/g, padStart(date.getFullYear()))
    .replace(/ddd/g, dayNames[date.getDay()])
    .replace(/dd/g, padStart(date.getDate()))
    .replace(/mmm/g, monthNames[date.getMonth() + 1])
    .replace(/mm/g, padStart(date.getMonth() + 1))
    .replace(/hh/g, padStart(date.getHours()))
    .replace(/ii/g, padStart(date.getMinutes()))
    .replace(/ss/g, padStart(date.getSeconds()));
};

const dateToShortText = (date: Date) => {
  return formatDate(date, 'ddd, mmm dd yyyy,\n hh:ii:ss');
};

const nowToShortText = () => {
  return formatDate(new Date(), 'ddd, mmm dd yyyy,\n hh:ii:ss');
};
export { formatDate, dateToShortText, nowToShortText };
