"use client";

import BestSelling from "@/components/bestSellingBrands/BestSelling";
import Brand from "@/components/brand/Brand";
import CategoryComponent from "@/components/category/CategoryComponent";
import Container from "@/components/container/Container";
import Discount from "@/components/discount/Discount";
import MainSlide from "@/components/mainSlide/MainSlide";
import {
  getBestSellingBrand,
  getBrands,
  getCategoryList,
  getDiscount,
  getProducts,
  getSlider,
} from "@/services/api";
import {
  IProductsLogo,
  TSlides,
  TCategories,
  TDiscounts,
  TProductsBrand,
  TProducts,
  IProduct,
} from "@/serverTypes/serverTypes";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import ProductsPageComponent from "@/components/productsPageComponent/ProductsPageComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSliderData } from "@/redux/sliderSlice";
import { fetchCategoryData } from "@/redux/categorySlice";
import { fetchBrandsData } from "@/redux/brandsSlice";
import { fetchBestSellingBrandsData } from "@/redux/bestSellingBrandsSlice";
import { fetchDiscountData } from "@/redux/discountSlice";

export default function CategoryPage() {
  const [isExpanded, setIsExpanded] = useState(true);
  type CategoryParams = {
    category: string;
  };
  const params = useParams() as CategoryParams;
  const categoryKey = decodeURIComponent(params.category);

  const categoryMapping: Record<string, string> = {
    مردانه: "men",
    زنانه: "women",
    "بچه گانه": "kids",
    پسرانه: "boys",
    دخترانه: "girls",
  };

  const updatedCategoryKey = categoryMapping[categoryKey] || categoryKey;

  const dispatch = useDispatch<AppDispatch>();

  const slider = useSelector(
    (state: RootState) => state.slider[updatedCategoryKey]
  );
  const category = useSelector(
    (state: RootState) => state.category[updatedCategoryKey]
  );
  const reduxBrands = useSelector(
    (state: RootState) => state.brands[updatedCategoryKey]
  );

  const reduxBestSellingBrands = useSelector(
    (state: RootState) => state.bestSellingBrands.bestBrands
  );

  const reduxDiscount = useSelector(
    (state: RootState) => state.discount[updatedCategoryKey]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchSliderData());

        dispatch(fetchCategoryData());

        dispatch(fetchBrandsData());

        dispatch(fetchBestSellingBrandsData());

        dispatch(fetchDiscountData());
      } catch (error) {
        console.error("خطا در دیسپچ کردن اکشن‌ها:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const expandedHandler = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      {/* slide */}
      <MainSlide mainDataSlider={slider} />\ {/* دسته بندی */}
      <CategoryComponent
        category={category || []}
        categoryParams={categoryKey || ""}
      />
      {/*    برند  */}
      <Brand
        targetBrand={
          categoryKey === "مردانه"
            ? "Hplus"
            : categoryKey === "زنانه"
            ? "تولیکا"
            : categoryKey === "بچه گانه"
            ? "ادمک"
            : ""
        }
        productsBrand={reduxBrands || []}
        category={categoryKey}
        py="14"
      />
      {/* تخفبف */}
      <Discount productsDiscount={reduxDiscount || []} />
      {/* برند */}
      <Brand
        category={categoryKey}
        targetBrand={
          categoryKey === "مردانه"
            ? "NAFIR WEAR"
            : categoryKey === "بچه گانه"
            ? "زیپی"
            : categoryKey === "زنانه"
            ? "بلوز و تونیک"
            : ""
        }
        productsBrand={reduxBrands || []}
        py="14"
      />
      {/* پرفروش ترین برندها */}
      <BestSelling py="14" BestSellingBrands={reduxBestSellingBrands || []} />
      {/*مقاله */}
      {categoryKey === "مردانه" ? (
        <div className="my-16">
          <Container>
            <div
              className={`${
                isExpanded ? "line-clamp-3 overflow-hidden" : "line-clamp-none"
              }`}
            >
              <h2 className="text-lg md:text-xl font-semibold my-4">
                خرید پوشاک مردانه{" "}
              </h2>
              <p>
                همیشه داشتن چندین دست لباس خوب و مناسب همچون شلوار و پیراهن
                مردانه اسپرت یا رسمی شیک می ‌تواند در جلسات کاری، دورهمی های
                دوستانه، سفر یا گردش به ظاهر آقایان جذابیت بسیاری ببخشد. به طور
                کلی پوشاک مردانه شامل لباس مردانه، کیف و کفش مردانه، اکسسوری و
                آرایشی و بهداشتی مردانه می شوند. پوشاک مردانه تنوع زیادی دارد
                ولی ممکن است در فروشگاه های معمولی آنقدر زمان برای بررسی همه
                لباس ها و اکسسوری های مردانه نداشته باشید. به همین دلیل با
                مراجعه به فروشگاه اینترنتی یا آنلاین به راحتی می توانید انواع
                لباس مورد نظر خود را ببینید و کالاهای مختلف را با یکدیگر مقایسه
                کنید.
              </p>
              <h3 className="text-xl font-semibold opacity-50 my-4">
                انواع پوشاک مردانه در مدکده
              </h3>
              <p>
                انواع محصولات مردانه از لباس گرفته تا کیف و کفش و اکسسوری های
                مختلف در فروشگاه مدکده به فروش می رسد و هر یک از آقایان با هر
                سلیقه ای که داشته باشند می توانند برای بهبود استایل خود از این
                محصولات خرید کنند. از مهم ترین محصولات مردانه می توان به موارد
                زیر اشاره کرد: لباس مردانه کیف و کفش مردانه اکسسوری مردانه{" "}
              </p>
              <h3 className="text-xl font-semibold opacity-50 my-4">
                انواع لباس مردانه
              </h3>{" "}
              <p>
                لباس مردانه ضروری ترین بخش خرید آقایان است و کاربرد بیشتری نسبت
                به سایر محصولات دارد. لباس مردانه دنیای بسیار گسترده و پر از
                تنوعی دارد که شامل کت و جلیقه مردانه، پلیور و هودی و سویشرت
                مردانه، کاپشن و پالتو و بارانی مردانه، شلوار مردانه، پیراهن
                مردانه، تیشرت و پولوشرت مردانه، شلوارک مردانه، لباس زیر مردانه،
                لباس راحتی مردانه، لباس مشکی مردانه و شلوار جین مردانه می شود.{" "}
              </p>
              <h3 className="text-xl font-semibold opacity-50 my-4">
                انواع کیف و کفش مردانه
              </h3>{" "}
              <p>
                کیف و کفش مردانه از آن دسته اکسسوری هایی است که همیشه در کمد
                آقایان به تعداد زیاد وجود دارد. کیف و کفش مردانه همچون سایر
                اکسسوری ها انواع متنوع و گسترده ای دارند که کیف ها شامل کیف
                مردانه جیبی، کیف مردانه یک طرفه، کیف رودوشی، کیف کمری، کیف
                اداری، کیف لپ تاپ مردانه، کوله پشتی و کیف دستی می شوند. انواع
                متنوع کفش ها شامل بوت و نیم بوت مردانه، صندل و دمپایی، کفش ورزشی
                و کفش مردانه مثل کالج، دربی، آکسفورد و ... می شوند.{" "}
              </p>
              <h3 className="text-xl font-semibold opacity-50 my-4">
                انواع اکسسوری مردانه
              </h3>{" "}
              <p>
                همان قدر که لباس های مردانه تاثیر زیادی در استایل دارند، اکسسوری
                ها نیز در پوشش آقایان بسیار حائز اهمیت هستند. انواع محصولات
                اکسسوری مردانه شامل کمربند و ساسپندر، عینک آفتابی و لوازم جانبی
                آن، ساعت مچی مردانه، جوراب، سرپوش، کلاه، شال و دستکش، زیورآلات،
                کراوات و پاپیون، جاکلیدی وغیره می شوند. اکسسوری ها طیف وسیعی از
                محصولات را شامل می شوند که می توان مجموعه عظیمی از آنها را در
                وبسایت مدکده دید
              </p>
              .{" "}
              <h3 className="text-xl font-semibold opacity-50 my-4">
                خرید محصولات مردانه در فروشگاه اینترنتی مدکده
              </h3>{" "}
              <p>
                در فروشگاه اینترنتی مدکده انواع متنوع و گوناگون محصولات مردانه
                از جمله کیف و کفش مردانه، اکسسوری، لباس زیر و راحتی مردانه،
                پیراهن، شلوار، کاپشن مردانه و غیره ... را می توان با قیمت های
                کاملا مناسب در کنار کیفیت بالا پیدا کرد. همچنین در مدکده ویترین
                کامل و جذابی از محصولات مردانه موجود است که با استفاده از
                فیلترهایی همچون نوع، سایز، قیمت، برند و رنگ می توان به راحتی
                محصول دلخواه خود را انتخاب و تهیه کرد. همچنین فروشگاه اینترنتی
                مدکده اصالت و کیفیت تمامی کالاهای خود را تضمین می کند.
              </p>
            </div>
            <div className="text-center w-full">
              <button
                onClick={expandedHandler}
                className="text-red-500 font-semibold"
              >
                {isExpanded ? " نمایش بیشتر ..." : " کمتر "}
              </button>
            </div>
          </Container>
        </div>
      ) : categoryKey === "زنانه" ? (
        <div>
          <Container>
            <div
              className={`${
                isExpanded ? "line-clamp-3 overflow-hidden" : "line-clamp-none"
              }`}
            >
              <h2 className="text-lg md:text-xl font-semibold my-4">
                خرید پوشاک زنانه
              </h2>
              همواره خرید لباس و کیف و کفش و اکسسوری زنانه مورد توجه بوده است و
              زنان در خرید اینترنتی کالاها نیز پیشقدم بوده اند. در دسته بندی
              زنانه فروشگاه آنلاین مدیسه بخش های مختلفی قرار دارند که در این بخش
              آنها را بررسی می کنیم. <h3 className="text-xl">لباس زنانه</h3>{" "}
              اولین دسته بندی در بخش زنانه، لباس زنانه است. در این بخش انواع و
              اقسام پوشاک زنانه به تفکیک قرار داده شده است که خانم های علاقه مند
              به مد و استایل می توانند به راحتی بین برندها و جنس های مختلف، لباس
              زنانه انتخاب کنند
              <ul className="mt-2">
                <li className="text-lg">
                  ایتم‌های موجود در این بخش شامل موارد زیر است:
                </li>
                <li>مانتو</li>
                <li>شومیز</li>
                <li>پیراهن</li>
                <li>شلوار</li>
                <li>پالتو</li>
                <li>کاپشن</li>
                <li>سویشرت</li>
                <li>هودی</li>
                <li>لباس زمستانی و تابستانی و پاییزه </li>
                <li>لباس خانگی و راحتی</li>
                <li>لباس مجلسی</li>
                <li> لباس بارداری</li>
              </ul>
              یکی از ترین انواع پوشاک زنانه که همیشه مورد توجه بوده است، لباس
              زیر زنانه است که اهمیت زیادی دارد. جنس و برند و کیفیت این لباس ها
              در هنگام خرید لباس زیر زنانه باید مورد توجه قرار گیرد. انواع لباس
              زیر و راحتی که شامل شورت زنانه، سوتین، ست شورت و سوتین،‌ لباس خواب
              زنانه، لباس شنا زنانه، بادی زنانه و گن زنانه در این دسته قرار می
              گیرند. در این بخش اطلاعات محصولات به صورت دقیق قرار داده شده است
              که در هنگام خرید دچار مشکل نشوید و خرید مناسبی داشته باشید. کیف و
              کفش زنانه کیف زنانه اهمیت ویژه ای هم در استایل و هم از لحاظ کاربرد
              برای خانم ها دارد و به همین دلیل خانم ها در انتخاب کیف تنها به
              ظاهر اهمیت نمی دهند و بخش های دیگر آن نیز مهم است. بر خلاف آقایان،
              کفش های زنانه در دسته بندی ها و طرح های مختلف برای مجالس و مراسمات
              مختلف ارائه می شوند. در بخش کیف و کفش زنانه مدیسه دسته بندی های
              مختلفی مانند کفش تخت و کژوال زنانه، کفش ورزشی زنانه، کفش مجلسی و
              پاشنه بلند زنانه، صندل و دمپایی زنانه، بوت و نیم بوت زنانه، کیف
              زنانه، کیف مجلسی زنانه، کیف پول زنانه، کوله پشتی زنانه، کیف اداری
              و لپ تاپ زنانه و ساک دستی و ساک ورزشی زنانه قرار گرفته است.
              اکسسوری زنانه اکسسوری زنانه بخش مهمی از استایل زنان است که باعث
              بهبود ظاهر خانم ها می شود و می تواند تفاوت جدی در انواع استایل ها
              ایجاد کند. اکسسوری ها شامل موارد مختلفی هستند که هر یک به تنهایی
              دنیای خاص خود را دارند. از این موارد می توان به زیورآلات زنانه،
              ساعت مچی زنانه، عینک آفتابی زنانه، کمربند زنانه،‌ کلاه، دستکش و
              شال گردن زنانه،‌ اکسسوری مو زنانه،‌ چتر زنانه،‌ جوراب و جوراب
              شلواری زنانه و جاکلیدی زنانه اشاره کرد. برای خرید این اکسسوری ها
              به راحتی می توانید در سایت فروشگاه اینترنتی مدیسه خرید خود را
              انجام دهید. سایت لباس زنانه امروزه انواع مختلفی از فروشگاه های
              آنلاین برای ارائه خدمات مختلف وجود دارد. در این بین سایت پوشاک
              زنانه و فروشگاه اینترنتی لباس زنانه اهمیت ویژه ای برای کاربران
              دارند. دیگر نیاز نیست به مغازه های مختلف سرک بکشید و سایزهای مختلف
              را تست کنید تا به نتیجه برسید. به راحتی با ورود به سایت فروشگاه
              اینترنتی مدیسه می توانید انواع سایز، رنگ و طرح لباس ها را ببینید و
              بین هزاران مدل لباس، برند و مدل مورد نظر خود را انتخاب کنید. خرید
              پوشاک زنانه از فروشگاه اینترنتی مدیسه فروشگاه آنلاین مدیسه با
              ارائه انواع مختلفی از لباس،‌ لباس زیر، کیف و کفش و اکسسوری زنانه
              توانسته است همه نیازهای زنان را در یک بخش جمع کند. به این ترتیب
              برای استایل کردن و خرید مدل های مختلف لباس و ست کردن آنها به مشکل
              نمی خورید.
            </div>
            <div className="text-center w-full">
              <button
                onClick={expandedHandler}
                className="text-red-500 font-semibold"
              >
                {isExpanded ? " نمایش بیشتر ..." : " کمتر "}
              </button>
            </div>
          </Container>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
