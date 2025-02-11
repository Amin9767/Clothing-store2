import React from 'react'

export default function Admin() {
  return (
    <div className="flex h-screen">

        {/* <!-- سایدبار --> */}

        <aside className="w-64 bg-white shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">مدیریت فروشگاه</h2>
            <ul>
                <li className="mb-2"><a href="#" className="block p-2 bg-blue-500 text-white rounded">داشبورد</a></li>
                <li className="mb-2"><a href="#" className="block p-2 text-gray-700 hover:bg-gray-200 rounded">محصولات</a></li>
                <li className="mb-2"><a href="#" className="block p-2 text-gray-700 hover:bg-gray-200 rounded">سفارشات</a></li>
                <li className="mb-2"><a href="#" className="block p-2 text-gray-700 hover:bg-gray-200 rounded">کاربران</a></li>
                <li className="mb-2"><a href="#" className="block p-2 text-gray-700 hover:bg-gray-200 rounded">تنظیمات</a></li>
            </ul>
        </aside>

        {/* /* <!-- محتوای اصلی --> */ }

        <main className="flex-1 p-6">
            <header className="flex justify-between items-center bg-white p-4 shadow rounded-md">
                <h1 className="text-2xl font-bold text-gray-700">داشبورد</h1>
                <button className="px-4 py-2 bg-red-500 text-white rounded">خروج</button>
            </header>

            {/* <!-- کارت‌های داشبورد --> */}
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-6 shadow rounded-md">
                    <h2 className="text-lg font-bold text-gray-700">تعداد محصولات</h2>
                    <p className="text-2xl font-semibold text-blue-500">150</p>
                </div>
                <div className="bg-white p-6 shadow rounded-md">
                    <h2 className="text-lg font-bold text-gray-700">تعداد سفارشات</h2>
                    <p className="text-2xl font-semibold text-green-500">320</p>
                </div>
                <div className="bg-white p-6 shadow rounded-md">
                    <h2 className="text-lg font-bold text-gray-700">تعداد کاربران</h2>
                    <p className="text-2xl font-semibold text-purple-500">85</p>
                </div>
            </section>
        </main>
    </div>
  )
}
