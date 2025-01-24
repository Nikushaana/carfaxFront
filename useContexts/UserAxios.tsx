"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AxiosForSharingStatesAxiosContext } from "./sharedStates";
import { axiosUser } from "./AxiosClient/AxiosClient";
import { useRouter } from "next/navigation";

export const UserContext = createContext<any>(null);

const UserAxiosContext = ({ children }: any) => {
  const { setIsAuthorizedUser, setIsAuthorizedAdmin } = useContext(
    AxiosForSharingStatesAxiosContext
  );
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [admin, setAdmin] = useState<any>({});
  const [isLoaderUser, setIsLoaderUser] = useState<boolean>(true);
  const [isLoaderAdmin, setIsLoaderAdmin] = useState<boolean>(true);
  const [newRenderUser, setNewRenderUser] = useState<any>();
  const [newRenderAdmin, setNewRenderAdmin] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenuser = localStorage.getItem("CarFaxUser");
      const tokenadmin = localStorage.getItem("CarFaxAdmin");

      _setTokenUser(tokenuser);
      _setTokenAdmin(tokenadmin);
    }
  }, []);

  const [tokenuser, _setTokenUser] = useState<string | null>(null);
  const [tokenadmin, _setTokenAdmin] = useState<string | null>(null);

  const setTokenUser = (tokenuser: string | null) => {
    _setTokenUser(tokenuser);
    if (tokenuser) {
      localStorage.setItem("CarFaxUser", tokenuser);
    } else {
      localStorage.removeItem("CarFaxUser");
    }
  };

  const setTokenAdmin = (tokenadmin: string | null) => {
    _setTokenAdmin(tokenadmin);
    if (tokenadmin) {
      localStorage.setItem("CarFaxAdmin", tokenadmin);
    } else {
      localStorage.removeItem("CarFaxAdmin");
    }
  };

  useEffect(() => {
    if (user?.phone || user?.email) {
      setIsAuthorizedUser(true);
    } else {
      setIsAuthorizedUser(false);
    }
  }, [user]);

  useEffect(() => {
    if (admin?.email || admin?.password) {
      setIsAuthorizedAdmin(true);
    } else {
      setIsAuthorizedAdmin(false);
    }
  }, [admin]);

  // get current logged in user
  useEffect(() => {
    if (tokenuser) {
      setIsLoaderUser(true);
      axiosUser
        .get("/user")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {})
        .finally(() => {
          setIsLoaderUser(false);
        });
    }
  }, [tokenuser, newRenderUser]);

  // get current logged in admin
  useEffect(() => {
    if (tokenadmin) {
      setIsLoaderAdmin(true);
      axiosUser
        .get("/admin")
        .then((res) => {
          setAdmin(res.data);
          setIsLoaderAdmin(false);
        })
        .catch((err) => {});
    }
  }, [tokenadmin, newRenderAdmin]);

  // logout user
  const HandleLogOut = () => {
    //   axiosUser
    //     .get("/admin")
    //     .then((res) => {
    //       setAdmin(res.data);
    //       setIsLoaderAdmin(false);
    //     })
    //     .catch((err) => {});
    setIsAuthorizedUser(false);
    setUser({});
    setTokenUser(null);
    router.push("/");
  };
  // logout user
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        tokenuser,
        setTokenUser,
        isLoaderUser,
        setIsLoaderUser,
        newRenderUser,
        setNewRenderUser,
        HandleLogOut,

        admin,
        setAdmin,
        tokenadmin,
        setTokenAdmin,
        isLoaderAdmin,
        setIsLoaderAdmin,
        newRenderAdmin,
        setNewRenderAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserAxiosContext;
