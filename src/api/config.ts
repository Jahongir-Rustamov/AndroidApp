export const getBackendUrl = () => {
  if (__DEV__) {
    return "http://192.168.39.218:3000"; // Backend manzili
  }
  return "http://192.168.39.218:3000"; // Production uchun ham bir xil
};
