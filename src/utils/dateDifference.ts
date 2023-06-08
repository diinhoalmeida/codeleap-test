const formatTimeDifference = (date: Date): string => {
  const now = new Date();
  const createdDate = new Date(date);
  const diff = Math.abs(now.getTime() - createdDate.getTime());
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const day = createdDate.getDate();
    const month = createdDate.getMonth() + 1;
    const year = createdDate.getFullYear();
    return `${day}/${month}/${year}`;
  } else if (hours >= 1) {
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  } else {
    return `${minutes}m`;
  }
};

export default formatTimeDifference;
