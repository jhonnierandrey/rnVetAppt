export const dateFormatter = (date: Date) => {
  const newDate = new Date(date);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return newDate.toLocaleDateString('en-EN', options);
};
