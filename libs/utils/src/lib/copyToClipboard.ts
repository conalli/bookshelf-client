export const copyToClipboard = async (text: string) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  }
  return document.execCommand("copy", true, text);
};
