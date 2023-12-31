import React, { FC, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { useSession, } from "next-auth/react"
import axios from "axios";
import Cookies from "js-cookie";

import { AuthContext, authReducer } from "./";

import tesloApi from '../../api/tesloApi'
import { IUser } from "@/interfaces";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children?: React.ReactNode | undefined;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data } = useSession()

  const router = useRouter();

  useEffect(() => {
    console.log(data);
  }, [])
  

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {
    if (!Cookies.get("token")) return;

    try {
      const { data } = await tesloApi.get("/user/validate-token");
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Log in", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Log in", payload: user });

      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    email: string,
    name: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        email,
        name,
        password,
      });
      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Log in", payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "Couldn't register user, try again.",
      };
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("cart");
    Cookies.remove("firstName")
    Cookies.remove("secondName")
    Cookies.remove("address1")
    Cookies.remove("address2")
    Cookies.remove("zipCode")
    Cookies.remove("city")
    Cookies.remove("country")
    Cookies.remove("phone")
    router.reload();
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
