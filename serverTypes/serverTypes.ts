export type TSlides = {
  mainSlide: ISlide[];
  "بچه گانه": ISlide[];
  زنانه: ISlide[];
  مردانه: ISlide[];
};
export interface ISlide {
  id: number;
  imageMobile: string;
  imageDesktop: string;
}

export interface ISlide {
  id: number;
  imageMobile: string;
  imageDesktop: string;
}
export type TDiscounts = IDiscount[];
export interface IDiscount {
  id: number;
  image: string;
}

export type TCategories = ICategory[];
export interface ICategory {
  id: number;
  title: string;
  image: string;
  isComingSoon?: string;
}
export type TProductsBrand = IProductBrand[];

export interface IProductBrand {
  id: number;
  title: string;
  products: IProduct[];
}

export type TProducts = IProduct[];
export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  createdAt?: string;
  daste?: string;
  category?: string;
}
export interface ICartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  createdAt?: string;
  daste?: string;
  category?: string;
  quantity: number;
}
export type IProductsLogo = IProductLogo[];
export interface IProductLogo {
  id: number;
  star: number;
  logo: string;
  starImage: string;
}

export interface IProductDetailProps {
  targetProduct: IProduct | null;
}

export interface ICartContextProviderProps {
  children: React.ReactNode;
}

export interface ICartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export type TCartItems = ICartItem[];

export interface ICartContext {
  cartItems: TCartItems;
  setCartItems: React.Dispatch<React.SetStateAction<TCartItems>>;
  handleCartItemPlus: (id: number) => void;
  handleCartItemMines: (id: number) => void;
  handleCartItemDelete: (id: number) => void;
  handleAddItemToCart: (targetProduct: IProduct) => void;
  calculateTotalPrice: () => number;
}

export interface IUser {
  id?: string;
  userName?: string;
  password: string;
  email: string;
}

export interface IAutoContext {
  user: IUser | null;
  handleRegister: (
    userName: string,
    email: string,
    password: string
  ) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogOut: () => void;
}

export type TProductCategory = {
  [key: string]: IProduct[]; // این می‌تواند شامل هر دسته‌ای از محصولات مانند "پیراهن", "شلوار", و غیره باشد.
};

export type TGenderData = {
  men: TProductCategory; // دسته‌بندی محصولات مردانه
  women: TProductCategory; // دسته‌بندی محصولات زنانه
};

export type TBlogImages = IBlogImage[];
export interface IBlogImage {
  id: number;
  image: string;
}

export type TBlogCategoryKeys =
  | "main"
  | "women"
  | "men"
  | "celebrity"
  | "trend"
  | "care";

export type TArticles = IArticle[];
export interface IArticle {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface IBrandsResponse {
  [key: string]: IBrands[];
}

export interface IBrands {
  id: number;
  title: string;
  products: IProduct[];
}

export interface IRandomProps {
  targetSubCategory: string;
  targetCategory: string;
  count: number;
  py: string;
}

export interface IKidsProducts {
  [key: string]: IProduct[];
}

export interface IMobileFilteredComponent {
  handleToggleMenu: (menu: "filter" | "sort") => void;
  isOpenMenu: string | null;
  setIsPriceMenuOpen: (isOpen: boolean) => void;
  isPriceMenuOpen: boolean;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
}

export type TProductsDiscount = IProductDiscount[];
export interface IProductDiscount {
  id: number;
  image: string;
  createdAt: string;
}

export interface ISliderState {
  mainSlide: ISlide[];
  kids: ISlide[];
  women: ISlide[];
  men: ISlide[];
  [key: string]: any;

  status: "idle" | "loading" | "succeeded" | "failed";
}

export interface ICategoryInRedux {
  main: TCategories;
  kids: TCategories;
  women: TCategories;
  men: TCategories;
  boys: TCategories;
  girls: TCategories;
  [key: string]: any;

  status: "idle" | "loading" | "succeeded" | "failed";
}
