import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";

const Layout = () => {
  return (
    <>
      <Header />

      <main>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
