import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import HomePage from "./components/pages/HomePage";
import Sidebar from "./components/layout/Sidebar";
import NotFoundPage from "./components/pages/NotFoundPage";
import { Helmet } from "react-helmet-async";
import { CookieConfig } from "./config/cookie";
import LogInPage from "./components/pages/LogInPage";

function AppRouter() {
  const [cookies, setCookie]: any = useCookies(["theme"]);

  useEffect(() => {
    if (document.body.style) document.body.removeAttribute("style");
    if (!cookies.theme) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setCookie("theme", "dark", CookieConfig);
      } else {
        setCookie("theme", "light", CookieConfig);
      }
    }
  }, [cookies, setCookie]);
  return (
    <BrowserRouter>
      <Helmet>
        <body
          className={
            cookies.theme === "dark"
              ? "dark overflow-y-hidden bg-slate-950"
              : "overflow-y-hidden bg-gray-50"
          }
        ></body>
      </Helmet>
      <main className="relative flex flex-col md:flex-row gap-y-2 px-2 sm:py-0 mx-auto lg:px-5 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 gap-x-3 my-4 h-[96vh] dark:text-slate-200">
        <nav className="border items-center bg-opacity-5 bg-gradient-to-t from-70% from-gray-50 to-sky-50/50 dark:border-slate-800 dark:bg-opacity-10 dark:from-slate-950 dark:to-slate-900/50  flex flex-row gap-x-3 md:gap-x-0 md:gap-y-3 md:flex-col rounded-lg shadow-md h-[60px] md:h-[80px] w-full md:w-[110px] p-5 md:p-1">
          <Sidebar />
        </nav>
        <div
          id="content"
          className="border bg-opacity-5 bg-gradient-to-tr from-gray-50 to-sky-50 dark:from-50% dark:border-slate-800 dark:bg-opacity-10 dark:from-slate-950 dark:to-slate-900/50 overflow-scroll p-4 rounded-lg shadow-md w-full overflow-x-clip h-full"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default AppRouter;
