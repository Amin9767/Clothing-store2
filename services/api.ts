import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const getSlider = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/swiper.json`,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getCategoryList = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/category.json`,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getBrands = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/brands.json`,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getDiscount = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/discount.json`,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getProducts = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/products.json`,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getBestSellingBrand = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/BestSellingBrands.json`,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const checkEmailExist = async (email: string) => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/users.json`,
    });

    if (!data || !Array.isArray(data)) {
      console.error("API returned invalid data:", data);
      return [];
    }

    const filteredUsers = data.filter(
      (user: { email: string }) => user.email === email
    );
    return filteredUsers.length > 0 ? filteredUsers : [];
  } catch (error) {
    console.error("خطا در برسی کاربر", error);
    return false;
  }
};

export const register = async (
  userName: string,

  email: string,
  password: string
) => {
  try {
    const { data, status } = await client({
      method: "POST",
      url: "/users.json",
      data: {
        userName,
        email,
        password,
      },
    });
    if (status !== 200) {
      console.error("خطا در دریافت اطلاعات کاربران", status);
      throw new Error("اطلاعات کاربر معتبر نیست.");
    }
    const userId = data.name;
    if (!userId) {
      throw new Error("اطاعات کاربر در دسترس نیست");
    }

    return { userId, userName, email, password }; // برگشت داده‌های کاربر
  } catch (error) {
    console.error("خطا در ارسال اطلاعات به سرور:");
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data, status } = await client.get("/users.json");

    if (status !== 200) {
      console.error("خطا در دریافت اطلاعات کاربران:", status);
      throw new Error("مشکل در دریافت داده‌ها از سرور.");
    }
    const users = Object.values(data) as Array<{
      email: string;
      password: string;
      userName?: string;
    }>;
    const findUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (findUser) {
      return {
        email: findUser.email,
        password: findUser.password,
        userName: findUser.userName,
      }; // بازگرداندن کاربر یافت شده
    } else {
      return null; // اگر کاربر پیدا نشد، null برگردانید
    }
  } catch (error) {
    console.error("خطا در عملیات ورود:", error);
    throw error; // در صورت بروز خطا، آن را بازگردانید
  }
};

export const getBlogCategoryImages = async () => {
  try {
    const { data } = await client({
      method: "Get",
      url: "/blog.json",
    });
    return data;
  } catch (error) {
    console.error("خطا در دریافت اطلاعات", error);
  }
};

export const getBlogImages = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: "/blog.json",
    });
    return data;
  } catch (error) {
    console.error("خطا در دریافت اطلاعات", error);
    throw error;
  }
};
export const getBlogArticles = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: "/blog.json",
    });
    return data;
  } catch (error) {
    console.error("خطا در دریافت اطلاعات", error);
    throw error;
  }
};
