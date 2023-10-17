import { useCookies } from "react-cookie";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { CookieConfig } from "../config/cookie";
type Prop = {
  className: string;
};
function ThemeButton({ className }: Prop) {
  const [cookies, setCookie]: any = useCookies(["theme"]);
  const toggle = () => {
    if (cookies.theme === "dark") {
      setCookie("theme", "light", CookieConfig);
    } else {
      setCookie("theme", "dark", CookieConfig);
    }
  };
  return (
    <button className="pr-1" onClick={toggle}>
      {cookies.theme === "dark" ? (
        <MoonIcon className={className + " hover:fill-yellow-400"} />
      ) : (
        <SunIcon className={className + " hover:fill-yellow-500"} />
      )}
    </button>
  );
}

export default ThemeButton;
