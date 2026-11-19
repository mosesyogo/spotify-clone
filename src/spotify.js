// https://developer.spotify.com/
// documentation/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const redirectUri = "http://127.0.0.1:3000/callback";
const clientId = "f87049b4570c4fcab013e3df9016cb99";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
];

// ---------- PKCE helpers ----------
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const data = new TextEncoder().encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) =>
  btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

// ---------- Step 1: send the user to Spotify to log in ----------
export const redirectToSpotifyLogin = async () => {
  const verifier = generateRandomString(64);
  const challenge = base64encode(await sha256(verifier));

  window.localStorage.setItem("code_verifier", verifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  window.location.href = `${authEndpoint}?${params.toString()}`;
};

// ---------- Step 2: after redirect, swap the code for a token ----------
export const getTokenFromUrl = async () => {
  const code = new URLSearchParams(window.location.search).get("code");

  if (!code) {
    const saved = window.localStorage.getItem("access_token");
    const expiresAt = Number(window.localStorage.getItem("expires_at"));
    return saved && Date.now() < expiresAt ? saved : null;
  }

  window.history.replaceState({}, document.title, "/");

  const verifier = window.localStorage.getItem("code_verifier");

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      window.localStorage.setItem("access_token", data.access_token);
      window.localStorage.setItem(
        "expires_at",
        String(Date.now() + data.expires_in * 1000)
      );
      return data.access_token;
    }
    console.error("Spotify token error:", data);
  } catch (err) {
    console.error("Token request failed:", err);
  }
  return null;
};