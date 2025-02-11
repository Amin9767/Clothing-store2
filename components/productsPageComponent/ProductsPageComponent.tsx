import Container from "../container/Container";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TProducts } from "@/serverTypes/serverTypes";
import ProductsComponent from "./ProductsComponent";
import SortedComponent from "./desktop/SortedComponent";
import MobileFilteredComponent from "./mobile/MobileFilteredComponent";
import MobileSortedComponent from "./mobile/MobileSortedComponent";
import FilteredComponent from "./desktop/FilteredComponent";

interface IProductsProps {
  products: TProducts;
  category?: string;
  error?: string;
}

export default function ProductsPageComponent({ products }: IProductsProps) {
  const [sortedProducts, setSortedProducts] = useState(products);
  const params = useParams();
  const catParams = params.category;
  const subParams = Array.isArray(params.subCategory1)
    ? params.subCategory1[0]
    : params.subCategory1;
  const getSub = decodeURIComponent(subParams);

  const [isOpenMenu, setIsOpenMenu] = useState<"filter" | "sort" | null>(null);
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [isPriceMenuOpen, setIsPriceMenuOpen] = useState(false);

  useEffect(() => {
    try {
      let filtered = [...products];

      if (minPrice !== "") {
        filtered = filtered.filter((item) => item.price >= Number(minPrice));
      }

      if (maxPrice !== "") {
        filtered = filtered.filter((item) => item.price <= Number(maxPrice));
      }

      setSortedProducts(filtered);
    } catch (error) {
      console.log(error)
    }
  }, [minPrice, maxPrice, products]);

  const handleToggleMenu = (menu: "filter" | "sort") => {
    setIsOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const handleSort = useCallback(
    (sortType: string) => {
      const sorted = [...sortedProducts];
      switch (sortType) {
        case "price":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "cheapest":
          sorted.sort((a, b) => a.price - b.price);
          break;

        default:
          break;
      }
      setSortedProducts(sorted);
    },
    [sortedProducts]
  );

  useEffect(() => {
    setSortedProducts(products);
  }, [products, getSub]);

  return (
    <div>
      <Container>
        <div className="m-5">
          {/* فیلتر های موبایل*/}

          <div className="grid grid-cols-12 border md:hidden">
            <MobileFilteredComponent
              handleToggleMenu={handleToggleMenu}
              isOpenMenu={isOpenMenu}
              isPriceMenuOpen={isPriceMenuOpen}
              setIsPriceMenuOpen={setIsPriceMenuOpen}
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
            />
            <MobileSortedComponent
              handleSort={handleSort}
              handleToggleMenu={handleToggleMenu}
              isOpenMenu={isOpenMenu}
              setIsOpenMenu={setIsOpenMenu}
            />
          </div>

          <div className="grid grid-cols-12 mt-6 gap-2">
            <FilteredComponent
              handleToggleMenu={handleToggleMenu}
              isOpenMenu={isOpenMenu}
              isPriceMenuOpen={isPriceMenuOpen}
              setIsPriceMenuOpen={setIsPriceMenuOpen}
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
            />
            <div className="col-span-12 md:col-span-10 my-6">
              <SortedComponent handleSort={handleSort} />
              {/* لیست محصولات */}
              <ProductsComponent
                sortedProducts={sortedProducts}
                catParams={catParams}
                getSub={getSub}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
