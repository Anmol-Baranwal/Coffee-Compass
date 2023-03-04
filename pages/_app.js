import "@/styles/globals.css";
import { createContext } from "react";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };
  return (
    <StoreContext.Provider value={{ state: initialState }}>
      {children}
    </StoreContext.Provider>
  );
};

export default function App({ Component, pageProps }) {
  return;
  <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>;
}
