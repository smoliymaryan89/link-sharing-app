import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import PhonePreview from "../components/PhonePreview/PhonePreview";

import useWindowSize from "../hooks/useWindowSize";

const Layout = () => {
  const { width } = useWindowSize();

  return (
    <>
      <Header />

      <main className="flex">
        {width >= 1200 && <PhonePreview />}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
