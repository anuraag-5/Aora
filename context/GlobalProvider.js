import { createContext, useContext, useState, useEffect } from "react";
import { getCurrrentUser } from "../lib/appwrite";
import { router } from "expo-router";

const GlobalContext = createContext({});
export const useGlobalContext = () => {
  const result = useContext(GlobalContext);
  if(!result) throw Error;

  return result;
};

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => setLoading(false))

  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider
