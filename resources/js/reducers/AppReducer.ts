/* eslint-disable no-case-declarations */
import { AppState } from "@/context/AppContext";
import { User } from "@/types/user";

export type AppAction =
  | {
      type: "SET_THEME";
      payload: "dark" | "light" | "system" | string;
    }
  | {
      type: "SET_AUTH";
      payload: User;
    };

export const AppReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case "SET_THEME":
      const theme = action.payload;
      const html = document.documentElement;
      if (html) {
        html.classList.remove("dark");
        html.classList.remove("light");
      }

      switch (theme) {
        case "system":
          const themeClass = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
          html.classList.add(themeClass);
          break;
        case "dark":
          html.classList.add("dark");
          break;
        case "light":
          html.classList.add("light");
          break;
      }

      localStorage.setItem("theme", theme);

      return { ...state, theme };

    case "SET_AUTH":
      return { ...state, auth: action.payload };
  }
};
