import React from "react";
import { blogRouts } from "./routes";
import Link from "next/link";

function NavBlog() {
  return (
    <ul className="flex w-full gap-6 col-span-3 font-medium mt-2 md:mt-0">
      {blogRouts.map((route) => (
        <li key={route.path} className="relative group">
          <Link className="text-sm md:text-base" href={"/blog"}>
            {route.name}
          </Link>
          {route.subRoutes && (
            <div className="absolute right-2 hidden  space-y-2 bg-white shadow-lg group-hover:block z-20 rounded-md ">
              <ul className="flex flex-col gap-2 p-2 w-56">
                {route.subRoutes.map((subRoute) => (
                  <Link key={subRoute.path} href={subRoute.path}>
                    <li className="bg-sky-100  hover:bg-pink-500 px-2 rounded-md font-light">
                      {subRoute.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default NavBlog;
