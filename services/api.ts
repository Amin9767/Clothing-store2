import axios from "axios";

interface interfaceUser {
  email: string;
  id: string;
  password: string;
  userName: string;
}
const client = axios.create({
  baseURL:
    "https://clothing-strore-db-default-rtdb.asia-southeast1.firebasedatabase.app",
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
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getCategoryList = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/category.json`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getBrands = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/brands.json`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getDiscount = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/discount.json`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getProducts = async () => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/products.json`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export const checkEmailExist = async (email: string) => {
  try {
    const { data } = await client({
      method: "GET",
      url: `/users.json`,
    });
    console.log("Fetched users:", data);
    // const users: interfaceUser[] = Object.values(data);

    if (!data || !Array.isArray(data)) {
      console.error("API returned invalid data:", data);
      return [];
    }

    const filteredUsers = data.filter(
      (user: { email: string }) => user.email === email
    );
    return filteredUsers.length > 0 ? filteredUsers : [];
  } catch (error) {
    console.log("خطا در برسی کاربر", error);
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
    console.log("ثبت‌نام با موفقیت:", data); // اضافه کردن پیام در کنسول
    if (status !== 200) {
      console.error("خطا در دریافت اطلاعات کاربران", status);
      throw new Error("اطلاعات کاربر معتبر نیست.");
    }
    console.log(status);
    const userId = data.name;
    if (!userId) {
      throw new Error("اطاعات کاربر در دسترس نیست");
    }
    console.log(userId);

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
    console.log("داده های کاربران", data);
    const users = Object.values(data) as Array<{
      email: string;
      password: string;
      userName?: string;
    }>;
    const findUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (findUser) {
      console.log("کاربر یافت شد:", findUser);
      return {
        email: findUser.email,
        password: findUser.password,
        userName: findUser.userName,
      }; // بازگرداندن کاربر یافت شده
    } else {
      console.log("کاربر یافت نشد.");
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
    console.log(data);
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
    console.log(data);
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
    console.log(data);
    return data;
  } catch (error) {
    console.error("خطا در دریافت اطلاعات", error);
    throw error;
  }
};
