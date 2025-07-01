import React, { createContext, useContext,  useState } from "react";

const Crypto = createContext();

export const CryptoState = () => {
  return useContext(Crypto);
};

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");

  return (
    <Crypto.Provider value={{ currency, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;


