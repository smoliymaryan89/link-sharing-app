import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Suspense } from "react";
import useWindowSize from "../hooks/useWindowSize";
import PhonePreview from "../components/PhonePreview/PhonePreview";

const Layout = () => {
  const { width } = useWindowSize();

  return (
    <>
      <Header></Header>

      <main className="flex ">
        {width >= 1200 && <PhonePreview />}
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
