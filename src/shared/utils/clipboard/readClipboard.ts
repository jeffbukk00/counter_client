export const readClipboard = async () => {
  const pasted = await window.navigator.clipboard.readText();
  return pasted;
};
