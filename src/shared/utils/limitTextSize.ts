const limitTextSize = (text: string, percentage: number): string => {
  const textLength = text.length;

  const sliceEnd = textLength > 0 ? Math.floor(textLength * percentage) : 0;

  return text.slice(0, sliceEnd);
};

export { limitTextSize };
