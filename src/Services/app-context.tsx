import { createContext, FC, ReactNode, useContext, useState } from "react";

type AppContextValues = {
  jwtToken: string;
  setJwtToken: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

type User = {
  _id: string;
  name: string;
  email: string;
};
export const AppContext = createContext<AppContextValues | null>(null);

export const useAppContext = (): AppContextValues => {
  const ctxValue = useContext(AppContext);
  if (ctxValue === null) {
    throw new Error("Expected context value to be set");
  }
  return ctxValue;
};

export const AppContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jwtToken, setJwtToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  return (
    <AppContext.Provider value={{ jwtToken, setJwtToken, setUser, user }}>
      {children}
    </AppContext.Provider>
  );
};
