import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import PhonePreview from "../components/PhonePreview/PhonePreview";

const Layout = () => {
  return (
    <>
      <Header />

      <main className="flex">
        <PhonePreview />

        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
