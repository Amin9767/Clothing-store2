"use client";

import { UseAutoContext } from "@/contexts/AuthContext";
import React, { useState } from "react";

type FormData = {
  userName: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const { handleRegister } = UseAutoContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data being sent:", formData);

    const validationErrors: string[] = [];

    if (!formData.userName.trim()) validationErrors.push("نام الزامی است.");
    if (!formData.email.includes("@"))
      validationErrors.push("ایمیل معتبر وارد کنید.");

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await handleRegister(
        formData.userName,

        formData.email,
        formData.password
      );
      alert("ثبت‌نام با موفقیت انجام شد!");
      console.log(formData);
      setFormData({
        userName: "",
        email: "",
        password: "",
      });
      setErrors([]);
    } catch (error) {
      console.log("خطا در ثبت نام", error);
      setErrors(["خطایی در ثبت نام رخ داد.لطفا دوبازه تلاش کنید"]);
    }
    // اگر فرم معتبر است
  };
  // useEffect(() => {
  //   fetch("https://api.iransweb.com/user")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">فرم ثبت‌نام</h1>
      {errors.length > 0 && (
        <ul className="bg-red-100 text-red-700 p-4 mb-4 rounded">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="نام کاربری"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="ایمیل"
          />
        </div>
        <div className="mb-4">
          <input
            value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="رمز عبور"
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="تکرار رمز عبور"
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          ثبت‌نام
        </button>
      </form>
    </div>
  );
}
