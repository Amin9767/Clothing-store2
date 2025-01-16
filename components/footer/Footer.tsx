"use client";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import React from "react";
import Container from "../container/Container";

export default function Footer() {
  return (
    <footer className="py-10 shadow-lg bg-slate-100 mt-10">
      <Container>
        <div>
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
            {/* بخش لوگو و توضیحات */}
            <div>
              <h2 className=" text-2xl font-bold mb-4"> مدکده</h2>
              <p className="text-sm">
                ما به شما محصولات شیک و مد روز ارائه میدهیم تا همیشه و همه جا
                بدرخشید
              </p>
            </div>

            {/* لینک‌های مفید */}
            <div>
              <h3 className=" text-xl font-bold mb-4">لینک‌های سریع</h3>
              <ul>
                <li className="mb-2">
                  <Link href="/about">درباره ما</Link>
                </li>
                <li className="mb-2">
                  <Link href="/services">خدمات</Link>
                </li>
                <li className="mb-2">
                  <Link href="/contact">تماس با ما</Link>
                </li>
                <li className="mb-2">
                  <Link href="/faq">سوالات متداول</Link>
                </li>
              </ul>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div>
              <h3 className=" text-xl font-bold mb-4">دنبال کنید</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>

            {/* اطلاعات تماس */}
            <div>
              <h3 className=" text-xl font-bold mb-4">اطلاعات تماس</h3>
              <p className="text-sm">
                ایمیل:{" "}
                <a
                  href="mailto:info@mycompany.com"
                  className="hover:text-black"
                >
                  info@modkade.com
                </a>
              </p>
              <p className="text-sm">
                تلفن:{" "}
                <a href="tel:+123456789" className="hover:text-white">
                  0545484552
                </a>
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-700 pt-4 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} شرکت من. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
