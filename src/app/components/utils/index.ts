// This works on clientSide
export const copyText = async (textToCopy: string) => {
  if (typeof window !== "undefined") {
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Text copied to clipboard!");
    });
  }
};
