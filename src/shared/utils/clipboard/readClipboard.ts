// 유저의 클립보드를 읽어옴.
export const readClipboard = async () => {
  const pasted = await window.navigator.clipboard.readText();
  return pasted;
};
