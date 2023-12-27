import { NavLink } from "react-router-dom";

import sprite from "../../assets/icons/sprite.svg";

const Navigation = () => {
  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "active"
                : "group py-[11px] px-[27px] bg-transparent flex items-center gap-[8px] rounded-[8px] font-semibold"
            }
          >
            <svg
              className="block fill-grey group-hover:fill-blue transition-colors duration-350 ease-in-out"
              width="20"
              height="20"
            >
              <use href={`#${sprite}_link`}></use>
            </svg>
            <p className="hidden md:block group-hover:text-blue transition-colors duration-350 ease-in-out">
              Links
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "active"
                : "group py-[11px] px-[27px] bg-transparent flex items-center gap-[8px] rounded-[8px] font-semibold"
            }
          >
            <svg
              className="block fill-grey group-hover:fill-blue transition-colors duration-350 ease-in-out"
              width="20"
              height="20"
            >
              <use href={`#${sprite}_profile`}></use>
            </svg>
            <p className="hidden md:block group-hover:text-blue transition-colors duration-350 ease-in-out">
              Profile Details
            </p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
