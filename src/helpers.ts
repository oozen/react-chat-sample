export const validateText = (text: string) => {
  const pattern = /^[a-zA-Z 0-9-=.,]+$/;
  const regex = new RegExp(pattern, "i");
  if (!regex.test(text)) {
    return false;
  }
  return true;
};

export const generateRandomId = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};