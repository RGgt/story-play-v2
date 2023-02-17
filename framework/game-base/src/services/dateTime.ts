const formatDate = (date: Date, format: string) => {
  const padStart = (value: number): string => value.toString().padStart(2, '0');
  return format
    .replace(/yyyy/g, padStart(date.getFullYear()))
    .replace(/dd/g, padStart(date.getDate()))
    .replace(/mm/g, padStart(date.getMonth() + 1))
    .replace(/hh/g, padStart(date.getHours()))
    .replace(/ii/g, padStart(date.getMinutes()))
    .replace(/ss/g, padStart(date.getSeconds()));
};

const dateToShortText = (date: Date) => {
  return formatDate(date, 'yyyy-mm-dd hh-ii-ss');
};

const nowToShortText = () => {
  return formatDate(new Date(), 'yyyy-mm-dd hh-ii-ss');
};
export { formatDate, dateToShortText, nowToShortText };
