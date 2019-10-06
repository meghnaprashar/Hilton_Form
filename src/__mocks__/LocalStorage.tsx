import { APP_NAME } from "../Constants";

const isAvailable = true;

const getKey = (key: string) => `${APP_NAME}.${key}`;

export const set = (key: string, value: string) => {
  try {
    localStorage.setItem(getKey(key), value);
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
};

export const get = (key: string) => {
  try {
    return localStorage.getItem(getKey(key));
  } catch (e) {
    console.error("Error fetching from localStorage", e);
  }
};

export default { isAvailable, set, get };
