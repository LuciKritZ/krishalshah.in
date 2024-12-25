export const formatDate = (date: string) => {
  return new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatDateForExperience = (date: Date | undefined): string => {
  if (!date) return '';
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const getStartAndEndDate = (
  isCurrent: boolean,
  startDate: Date,
  endDate: Date | undefined
) => {
  let duration = formatDateForExperience(startDate);
  if (isCurrent || !endDate) {
    return `${duration} - Present`;
  }
  return `${duration} - ${formatDateForExperience(endDate)}`;
};
