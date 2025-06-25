export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters except + and -
  const cleaned = value.replace(/[^\d+-]/g, '');

  // If starts with +, keep it and format the rest
  if (cleaned.startsWith('+')) {
    const numbers = cleaned.slice(1);
    // Group numbers in chunks of 3-4 digits
    const groups = numbers.match(/.{1,4}/g) || [];

    return `+${groups.join(' ')}`;
  }

  // Format local numbers
  const groups = cleaned.match(/.{1,4}/g) || [];

  return groups.join(' ');
};

export const formatPhoneForTel = (humanReadable: string) =>
  humanReadable.replace(/[^\d+]/g, '');
