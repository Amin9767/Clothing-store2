"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkEmailExist, login, register } from "../services/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { IAutoContext, IUser } from "../serverTypes/serverTypes";
import { json } from "stream/consumers";

interface IAuthContextProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAutoContext | undefined>(undefined);

export const UseAutoContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No context");
  }
  return context;
};

export const AuthContextProvider = ({ children }: IAuthContextProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const getItemWithExpiration = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  };
  useEffect(() => {
    const localUser = getItemWithExpiration("user");
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const existingUser = await checkEmailExist(email);
      console.log("Response from API:", existingUser);

      if (!Array.isArray(existingUser)) {
        console.error("Unexpected response:", existingUser);
        alert("خطایی در بررسی کاربر رخ داده است.");
        return;
      }

      const isEmailTaken = existingUser.some(
        (user: { email: string }) => user.email === email
      );

      if (isEmailTaken) {
        alert("ایمیل تکراری است");
        return;
      }
      await register(username, email, password);
      alert("ثبت نام با موفقیت انجام شد حالا وارد شوید");
      router.push("/login");
    } catch (error) {
      console.error("خطا در دریافت اطلاعات کاربران:", error);

      if (error instanceof AxiosError) {
        // اگر خطا مربوط به درخواست API باشد
        if (error.response?.status === 400) {
          alert("لطفا اطلاعات را به درستی وارد کنید.   ");
        } else if (error.response?.status === 500) {
          alert(
            "سرور در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید."
          );
        } else {
          alert("خطای نامشخصی رخ داده است.");
        }
      } else {
        alert("خطایی رخ داده است.");
      }
    }
  };
  const setItemWithWExpiration = (
    key: string,
    value: any,
    expireTime: number
  ) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + expireTime,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };
  const handleLogin = async (email: string, password: string) => {
    try {
      const userExist = await login(email, password);
      if (userExist) {
        alert("ورود موفق");
        setUser(userExist);
        setItemWithWExpiration("user", userExist, 24 * 60 * 60 * 1000);
        // localStorage.setItem("user", JSON.stringify(userExist));
        router.push("/");
      } else {
        alert("ایمیل یا رمز عبور اشتباه است.");
      }
    } catch (error) {
      console.log(error);
      alert("خطای ورود.لطفا دوباره تلاش کنید");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };
  return (
    <AuthContext.Provider
      value={{ user, handleRegister, handleLogin, handleLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
