import axios, { AxiosInstance } from "axios";

interface User {
  email: string;
  id: string;
  password: string;
  userName: string;
}

const DB_URL = "/db.json";

// تنظیمات عمومی کلاینت axios
const client: AxiosInstance = axios.create({
  baseURL: "/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// هندلر عمومی برای مدیریت خطا
const handleError = (error: any): never => {
  console.error("Error:", error?.message || error);
  throw error;
};

// تابع عمومی برای گرفتن داده از API
const fetchData = async <T>(key: string): Promise<T> => {
  try {
    const { data } = await client.get(DB_URL);
    if (data[key]) {
      console.log(`${key} data:`, data[key]);
      return data[key];
    } else {
      console.warn(`Key "${key}" not found in response.`);
      throw new Error(`Key "${key}" not found.`);
    }
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// توابع مختلف برای دریافت داده‌ها
export const getSlider = () => fetchData<any>("swiper");
export const getCategoryList = () => fetchData<any>("category");
export const getBrands = () => fetchData<any>("brands");
export const getDiscount = () => fetchData<any>("discount");
export const getProducts = () => fetchData<any>("products");
export const getBestSellingBrand = () => fetchData<any>("BestSellingBrands");
export const getBlogCategoryImages = () => fetchData<any>("blog");
export const getBlogImages = () => fetchData<any>("blog");
export const getBlogArticles = () => fetchData<any>("blog");

// بررسی وجود ایمیل در لیست کاربران
export const checkEmailExist = async (email: string): Promise<User[]> => {
  try {
    const users = await fetchData<User[]>("users");
    const filteredUsers = users.filter((user) => user.email === email);
    return filteredUsers;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// ثبت‌نام کاربر
export const register = async (
  userName: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    const { data } = await client.post(DB_URL, {
      userName,
      email,
      password,
    });

    if (!data || !data.id) {
      throw new Error("Failed to register user.");
    }

    console.log("User registered successfully:", data);
    return { id: data.id, userName, email, password };
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// ورود کاربر
export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const users = await fetchData<User[]>("users");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      console.log("User logged in:", user);
      return user;
    } else {
      console.warn("User not found or invalid credentials.");
      return null;
    }
  } catch (error) {
    handleError(error);
    throw error;
  }
};
