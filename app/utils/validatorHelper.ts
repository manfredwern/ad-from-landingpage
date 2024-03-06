export const isValidURL = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    if (!parsedUrl.protocol.startsWith('http') && !parsedUrl.protocol.startsWith('ftp')) {
      return false; // Scheme requirement not met
    }

    if (!parsedUrl.host) {
      return false; // Relative URL found
    }
    return true;
  } catch {
    return false;
  }
};
