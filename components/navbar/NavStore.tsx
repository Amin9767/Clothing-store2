import React from "react";
import { storeRoutes } from "./routes";
import Link from "next/link";

function NavStore() {
  return (
    <ul className="flex justify-between gap-2 p-2 w-full font-medium">
      {storeRoutes.map((route) => (
        <li key={route.path} className="relative group">
          <Link href={route.path} className="hover:text-pink-500">
            {route.name}
          </Link>
          {route.subRoutes && (
            <div className="absolute right-2 hidden  space-y-2 bg-white shadow-lg group-hover:block z-20 rounded-md ">
              <ul className="flex flex-col gap-2 p-2 w-56">
                {route.subRoutes.map((subRoute) => (
                  <li
                    className="bg-sky-100  hover:bg-pink-500 px-2 rounded-md font-light"
                    key={subRoute.path}
                  >
                    <Link
                      href={subRoute.path}
                      className="block px-4 py-2 hover:bg-pink-500"
                    >
                      {subRoute.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default NavStore;
