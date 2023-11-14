export const setLocalStorageItem = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };
  
export const getLocalStorageItem = (key: string): string | null => {
      const value = localStorage.getItem(key);
      return value ;

  };
  
export const removeLocalStorageItem = (key: string): void => {
      localStorage.removeItem(key);
}

export const checkLoged = (): boolean => {
    if (typeof window !== 'undefined') {
      if (getLocalStorageItem('Token')) {
        return true;
      }
    }
    return false;
}