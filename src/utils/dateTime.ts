export const getDate = (dateTime: string) => dateTime.slice(0, 10);
export const getTime = (dateTime: string) => dateTime.slice(11, 16);

export const formatDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
  const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
  const formattedDateTime = `${formattedDate}T${formattedTime}:00.000Z`;
  return [formattedDate, formattedTime, formattedDateTime];
};
