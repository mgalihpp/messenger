import { AppReducer } from "@/reducers/AppReducer";
import { User } from "@/types/user";
import { usePage } from "@inertiajs/react";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export type AppState = {
  theme: "dark" | "light" | "system" | string;
  auth: User;
  setTheme: (value: string) => void;
  setAuth: (value: User) => void;
};

const AppInitialState: AppState = {
  theme: localStorage.getItem("theme") || "system",
  auth: {
    id: "",
    name: "",
    email: "",
    email_verified_at: "",
    avatar: "",
    active_status: false,
    is_online: false,
    last_seen: "",
    created_at: "",
    updated_at: "",
    is_contact_blocked: false,
    is_contact_saved: false,
  },
  setTheme: () => {},
  setAuth: () => {},
};

const AppContext = createContext<AppState>(AppInitialState);

export const useAppContext = () => {
  const context = useContext(AppContext);

  console.log(context);

  if (!context) {
    throw new Error("useAppContext must be used within AppContext");
  }

  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const props = usePage().props;

  const [state, dispacth] = useReducer(AppReducer, AppInitialState);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const setTheme = (theme: string) =>
    dispacth({
      type: "SET_THEME",
      payload: theme,
    });

  const setAuth = (user: User) =>
    dispacth({
      type: "SET_AUTH",
      payload: user,
    });

  useEffect(() => {
    setAuth(props.auth.user);
    setIsFirstLoad(false);
  }, []);

  const values = {
    ...state,
    theme: localStorage.getItem("theme") || "system",
    auth: isFirstLoad ? props.auth.user : state.auth,
    setTheme,
    setAuth,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
