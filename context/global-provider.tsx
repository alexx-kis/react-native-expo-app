import { getCurrentUser } from '@/lib/appwrite';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type GlobalContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any; // or specify a type for the user object
  setUser: React.Dispatch<React.SetStateAction<any>>; // same here, adjust the type as needed
  isLoading: boolean;
};


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return context;
};


type GlobalProviderProps = {
  children: ReactNode;
};
type UserDocument = {
  id: string;
  accountid: string;
};


export const GlobalProvider = (globalProviderProps: GlobalProviderProps) => {

  const { children } = globalProviderProps;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          const userDoc: UserDocument = {
            id: res.$id,
            accountid: res.accountid,
          };
          setUser(userDoc);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error: Error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};