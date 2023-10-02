export const setToLocalStorage = (key: string, token: string) => {
  localStorage.setItem(key, token);
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
