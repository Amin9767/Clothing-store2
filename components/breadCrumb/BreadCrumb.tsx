"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Container from "../container/Container";

export default function BreadCrumb() {
  const path = usePathname();
  const pathSegments = path.split("/").filter(Boolean); // حذف بخش‌های خالی
  if (path === "/store") return null;

  return (
    <Container>
      <nav className="text-sm text-gray-500 py-1">
        <ol className="flex space-x-2">
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1; // بررسی آخرین آیتم
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`; // ساخت مسیر

            return (
              <li key={href}>
                {isLast ? (
                  // آخرین آیتم به صورت متن ساده
                  <span>{decodeURIComponent(segment)}</span>
                ) : (
                  // لینک برای آیتم‌های غیر آخر
                  <Link className="text-blue-500 hover:underline" href={href}>
                    {decodeURIComponent(segment)}
                  </Link>
                )}
                {!isLast && <span className="mx-2">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </Container>
  );
}
