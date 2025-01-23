export const storeRoutes = [
  {
    name: "مردانه",
    path: "/store/مردانه",
    subRoutes: [
      { name: "پلیور و هودی", path: "/store/مردانه/پلیور و هودی و سویشرت" },
      { name: "کاپشن و پالتو", path: "/store/مردانه/کاپشن و پالتو و بارانی" },
      { name: "شلوار", path: "/store/مردانه/شلوار" },
      { name: "پیراهن", path: "/store/مردانه/پیراهن" },
      { name: "لباس زیر", path: "/store/مردانه/لباس زیر" },
      { name: "اکسسوری", path: "/store/مردانه/اکسسوری" },
      { name: "کیف و کفش", path: "/store/مردانه/کیف و کفش" },
    ],
  },
  {
    name: "زنانه",
    path: "/store/زنانه",
    subRoutes: [
      { name: "پالتو", path: "/store/زنانه/پالتو" },
      { name: "شال و روسری", path: "/store/زنانه/شال و روسری" },
    ],
  },
  {
    name: "بچه گانه",
    path: "/store/بچه گانه",
    subRoutes: [
      {
        name: "پسرانه",
        path: "/store/بچه گانه/پسرانه",
        subroutes: [
          { name: "کاپشن", path: "/store/بچه گانه/کاپشن پسرانه" },
          { name: "پیراهن", path: "/store/بچه گانه/پیراهن پسرانه" },
        ],
      },
      {
        name: "دخترانه",
        path: "/store/بچه گانه/دخترانه",
        subroutes: [
          { name: "بلوز دخترانه", path: "/store/بچه گانه/بلوز دخترانه" },
          {
            name: "شلوار و دامن دخترانه",
            path: "/store/بچه گانه/شلوار و دامن دخترانه دخترانه",
          },
        ],
      },
    ],
  },
  {
    name: "بلاگ",
    path: "/blog",
  },
];

export const blogRouts = [
  {
    name: "مد و استایل",
    path: "/blog",
    subRoutes: [
      {
        name: "مد و استایل آقایان",
        path: "/blog/men",
      },
      {
        name: "مد استایل و خانم ها ",
        path: "/blog/women",
      },
      { name: "مد و استایل کودکانه", path: "/blog/children" },
    ],
  },
];
