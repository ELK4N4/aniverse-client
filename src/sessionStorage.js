export const getSessionStorage = (field) => {
    return JSON.parse(sessionStorage.getItem(field));
  };
  
export const setSessionStorage = (field, value) => {
  sessionStorage.setItem(field, JSON.stringify(value));
};

export const removeSessionStorage = (field) => {
  sessionStorage.removeItem(field);
};
