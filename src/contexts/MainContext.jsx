import { createContext, useContext } from "react";
import productData from "../store/Product_Data.json";
const MainContext = createContext();

// custom hook to use MainContext
const useMainContext = () => {
  return useContext(MainContext);
};
function MainContextProvider({ children }) {
  return (
    <MainContext.Provider value={{ productData }}>
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
export { useMainContext };
