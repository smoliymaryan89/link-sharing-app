import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import PhonePreview from "../components/PhonePreview/PhonePreview";

const Layout = () => {
  return (
    <>
      <Header />

      <main className="flex">
        <PhonePreview />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
