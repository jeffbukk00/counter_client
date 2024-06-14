// 유저의 클립보드에 씀.
export const writeClipboard = async (link: string) => {
  try {
    await window.navigator.clipboard.writeText(link);
  } catch (error) {
    console.log(error);
  }
};
