export const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || "";
export const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "";

const KEY = "adminAuthed";

export const isAdminAuthed = () => localStorage.getItem(KEY) === "1";

export const loginAdmin = (u, p) => {
  const ok = u === ADMIN_USER && p === ADMIN_PASS;
  if (ok) localStorage.setItem(KEY, "1");
  return ok;
};

export const logoutAdmin = () => localStorage.removeItem(KEY);
