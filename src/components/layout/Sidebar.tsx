import ThemeButton from "../ThemeButton";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <span className="mx-auto sm:h-[30px] text-4xl sm:text-2xl font-semibold">
        <NavLink to={"/"}>plib</NavLink>
      </span>
      <ThemeButton className="h-6 w-6 sm:-mt-1 transition ease-in-out delay-0" />
    </>
  );
}

export default Sidebar;
