"use client";
import Container from "@/components/container/Container";
import { UseAutoContext } from "@/contexts/AuthContext";

import { useState } from "react";

export default function LoginFormUI() {
  const [data, setData] = useState(() => ({
    email: "",
    password: "",
  }));
  const { handleLogin } = UseAutoContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: string[] = [];
    if (!data.email.trim()) validationErrors.push("نام الزامی است.");
    if (!data.email.includes("@"))
      validationErrors.push("ایمیل معتبر وارد کنید.");
    
    handleLogin(data.email, data.password);
    setData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="md:w-96 mb-32 p-6 rounded-md shadow-md bg-gray-100 space-y-4  mx-auto"
        >
          <h2 className="text-2xl font-semibold text-center">ورود</h2>
          <div>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="ایمیل "
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
              onChange={handleChange}
              value={data.email}
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="رمز عبور "
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
              onChange={handleChange}
              value={data.password}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            ورود
          </button>
          <p className="text-center text-sm text-gray-600">
            حساب کاربری ندارید؟
            <a href="/register" className="text-blue-500 hover:underline">
              ثبت‌نام کنید
            </a>
          </p>
        </form>
      </Container>
    </div>
  );
}
