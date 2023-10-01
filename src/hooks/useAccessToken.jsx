import { createContext, useContext, useState } from "react";

export const AccessTokenContext = createContext();

export function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const updateAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const deleteAccessToken = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  const value = {
    accessToken,
    updateAccessToken,
    deleteAccessToken,
  };

  return <AccessTokenContext.Provider value={value}>{children}</AccessTokenContext.Provider>;
}
export default AccessTokenProvider;

// Export the hook separately
export function useAccessToken() {
  return useContext(AccessTokenContext);
}
