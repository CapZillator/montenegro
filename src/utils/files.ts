export const truncateFileName = (fileName: string, maxLength = 32) => {
  if (fileName.length <= maxLength) return fileName;

  const extIndex = fileName.lastIndexOf(".");
  const ext = extIndex !== -1 ? fileName.slice(extIndex) : "";
  const baseName = fileName.slice(0, maxLength - 3 - ext.length);
  
  return `${baseName}...${ext}`;
};
