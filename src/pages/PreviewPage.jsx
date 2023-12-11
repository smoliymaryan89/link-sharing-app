import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../redux/user/userSelectors";
import { getProfile, getUserAvatar } from "../redux/user/userOperations";
import { selectLinks } from "../redux/link/linkSelectors";
import { getAllLinks } from "../redux/link/linkOperations";

import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import PreviewContent from "../components/PreviewContent/PreviewContent";
import CustomToast from "../components/CustomToast/CustomToast";

const PreviewPage = () => {
  const dispatch = useDispatch();

  const links = useSelector(selectLinks);

  const { image, imagePreview, lastName, firstName, emailPreview, id } =
    useSelector(selectUser);

  useEffect(() => {
    if (links.length === 0) {
      dispatch(getAllLinks());
    }
  }, [dispatch, links.length]);

  useEffect(() => {
    if (!image && !imagePreview) {
      dispatch(getUserAvatar());
    }
  }, [dispatch, image, imagePreview]);

  useEffect(() => {
    if (!firstName && !lastName && !emailPreview) {
      dispatch(getProfile());
    }
  }, [dispatch, emailPreview, firstName, lastName]);

  const location = useLocation();

  const { VITE_FRONTEND_URL } = import.meta.env;

  const backLinkLocationRef = useRef(location.state?.from ?? "/");

  return (
    <Container>
      <div className="sm:hidden bg-blue absolute top-0 left-0 h-[357px] rounded-b-[32px] w-full -z-10"></div>
      <header className="py-[16px] mb-[60px] md:mb-[126px] lg:mb-[106px]  md:mt-[16px] md:px-[16px] md:rounded-[12px] md:bg-white">
        <nav>
          <ul className="flex items-center justify-between ">
            <li>
              <Link
                to={backLinkLocationRef.current}
                className="block py-[11px] px-[27px] border-blue border-[1px] rounded-[8px] text-blue xs:text-[13px] text-[16px] font-semibold max-w-[160px] transition-colors duration-350 hover:bg-light-purple"
              >
                Back to Editor
              </Link>
            </li>
            <li>
              <Button
                className="pl-[40px] pr-[40px] max-w-[160px] xs:h-[43px]  h-[47.6px]  text-white xs:text-[13px] text-[16px] transition-colors duration-350 hover:bg-active"
                type="button"
                title="Share Link"
                onClick={() => {
                  toast.custom((t) => (
                    <CustomToast
                      t={t}
                      text={"The link has been copied to your clipboard!"}
                      icon={"link"}
                    />
                  ));
                  navigator.clipboard.writeText(
                    `${VITE_FRONTEND_URL}/shared/${id}`
                  );
                }}
              />
            </li>
          </ul>
        </nav>
      </header>

      <PreviewContent
        image={image}
        lastName={lastName}
        firstName={firstName}
        emailPreview={emailPreview}
        links={links}
      />
    </Container>
  );
};

export default PreviewPage;
