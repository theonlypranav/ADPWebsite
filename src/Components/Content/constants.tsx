export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://adpwebs-a4geehfwhtchdraw.centralindia-01.azurewebsites.net/api";

// Item "link" fields are free-text user input rendered as an <a href>. Only allow
// http(s) links so a club coordinator can't stash a javascript: URI that runs when
// a bosslevel admin clicks it (and steals their token out of localStorage).
export const isSafeHttpUrl = (value) => {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};