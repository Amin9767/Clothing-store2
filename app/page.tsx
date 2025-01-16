'use client'
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/store"); // به صفحه store هدایت می‌کند

  return null;
}
