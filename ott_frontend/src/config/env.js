/**
 * Environment configuration loader.
 * CRA exposes variables prefixed with REACT_APP_.
 */
export const env = {
  apiBase:
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    "http://localhost:8000",
  backendUrl: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
  wsUrl: process.env.REACT_APP_WS_URL || "ws://localhost:8000/ws",
  frontendUrl: process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000",
  nodeEnv: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "development",
  enableSourceMaps: process.env.REACT_APP_ENABLE_SOURCE_MAPS === "true",
  port: process.env.REACT_APP_PORT || process.env.PORT || "3000"
};
