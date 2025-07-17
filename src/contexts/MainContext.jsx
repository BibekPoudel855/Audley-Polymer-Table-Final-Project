import { createContext, useContext, useState, useEffect } from "react";
import productDataJson from "../store/Product_Data.json";

const MainContext = createContext();

// custom hook to use MainContext
const useMainContext = () => {
  return useContext(MainContext);
};

function MainContextProvider({ children }) {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  // function to load data from server
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // const response = await fetch(
        //   "https://audley.free.beeceptor.com/"
        // );
        // const data = await response.json();
        // setProductData(data);

        setProductData(productDataJson);
      } catch (err) {
        console.error("error", err);
        setProductData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <MainContext.Provider value={{ productData, loading }}>
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
export { useMainContext };
