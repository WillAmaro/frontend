export function generateRandomString(length: number) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join("");
}

export async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

export function base64UrlEncode(arrayBuffer: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function generateCodeChallenge(codeVerifier: string) {
  const hashed = await sha256(codeVerifier);
  return base64UrlEncode(hashed);
}