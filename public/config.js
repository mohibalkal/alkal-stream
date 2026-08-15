window.__CONFIG__ = {
  // The URL for the CORS proxy, the URL must NOT end with a slash!
  // If not specified, the onboarding will not allow a "default setup". The user will have to use the extension or set up a proxy themselves
  VITE_CORS_PROXY_URL: "https://simple-proxy.yazankal.workers.dev",

  // The URL for the M3U8 proxy (HLS playlist/segment rewriting). Must NOT end with a slash.
  VITE_M3U8_PROXY_URL: "https://simple-proxy.yazankal.workers.dev",

  // The READ API key to access TMDB
  VITE_TMDB_READ_API_KEY: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGY1YjE5NjI2MmMzMzFlMmUyOWJjYmU2NTJmZmRiYSIsIm5iZiI6MTcyMzc1OTU0Mi45NzgsInN1YiI6IjY2YmU3YmI2MmJlNTQ2ZDE4ZmMzOGMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mynmNrgUkgSbhSG-v2wGgn2IEOE6vNQx58qEv9kP4V8",

  // The DMCA email displayed in the footer, null to hide the DMCA link
  VITE_DMCA_EMAIL: null,

  // Whether to disable hash-based routing, leave this as false if you don't know what this is
  VITE_NORMAL_ROUTER: true,

  // The backend URL(s) to communicate with - can be a single URL or comma-separated list. Optional: only for accounts/auth.
  VITE_BACKEND_URL: null,

  // A comma separated list of disallowed IDs in the case of a DMCA claim - in the format "series-<id>" and "movie-<id>"
  VITE_DISALLOWED_IDS: "movie-831988",
  // Allowing FEBBOX API TO BE AENBALED.
  VITE_ALLOW_FEBBOX_KEY: "true",
};
