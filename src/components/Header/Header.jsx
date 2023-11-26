import { Link, useLocation } from "react-router-dom";

import sprite from "../../assets/icons/sprite.svg";

import Container from "../Container/Container";
import Navigation from "./Navigation";

const Header = () => {
  const location = useLocation();

  return (
    <header className="py-[16px] bg-white rounded-[8px] md:my-[24px]">
      <Container className={"flex items-center justify-between"}>
        <Link to="/" className="flex items-center gap-[8px]">
          <svg className="block" width="32" height="32">
            <use href={`#${sprite}_logo`}></use>
          </svg>
          <p className="hidden md:block text-[24px] text-dark-grey font-bold placeholder:opacity-[0.5]">
            devlinks
          </p>
        </Link>
        <Navigation />
        <Link
          state={{ from: location }}
          to="/preview"
          className="block py-[11px] px-[16px] border-[1px]  border-blue rounded-[8px] hover:bg-light-purple header-link transition-all duration-350 ease-in-out"
        >
          <svg
            className="block fill-blue transition-colors duration-350 ease-in-out md:hidden"
            width="20"
            height="20"
          >
            <use href={`#${sprite}_eye`}></use>
          </svg>
          <p className="hidden md:block text-blue font-semibold header-link">
            Preview
          </p>
        </Link>
      </Container>
    </header>
  );
};

export default Header;
