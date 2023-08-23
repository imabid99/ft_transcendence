export const setLocalStorageItem = (key: string, value: any): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };
  
  export const getLocalStorageItem = (key: string): any | null => {
      const value = localStorage.getItem(key);
      return value ;

  };
  
  export const removeLocalStorageItem = (key: string): void => {
      localStorage.removeItem(key);
}