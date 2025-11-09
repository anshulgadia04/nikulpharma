export const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || "";
export const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "";

const KEY = "adminAuthed";
const USER_KEY = "adminUser";

export const isAdminAuthed = () => localStorage.getItem(KEY) === "1";

export const loginAdmin = (u, p) => {
  const ok = u === ADMIN_USER && p === ADMIN_PASS;
  if (ok) localStorage.setItem(KEY, "1");
  return ok;
};

export const setCurrentAdmin = (userData) => {
  localStorage.setItem(KEY, "1");
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const getCurrentAdmin = () => {
  try {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem(KEY);
  localStorage.removeItem(USER_KEY);
};
