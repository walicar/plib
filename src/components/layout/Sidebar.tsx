import ThemeButton from "../ThemeButton";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <span className="mx-auto sm:h-[30px] text-4xl sm:text-2xl font-semibold transition-[30px] ease-in-out delay-0 hover:text-5xl sm:hover:text-3xl">
        <NavLink to={"/"}>my lib</NavLink>
      </span>
      <ThemeButton className="h-6 w-6 sm:-mt-1 transition ease-in-out delay-0" />
    </>
  );
}

export default Sidebar;
