import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import PreviewContent from "../components/PreviewContent/PreviewContent";

const PreviewPage = () => {
  const location = useLocation();

  const backLinkLocationRef = useRef(location.state?.from ?? "/");

  return (
    <Container>
      <div className="sm:hidden bg-blue absolute top-0 left-0 h-[357px] rounded-b-[32px] w-full -z-10"></div>
      <ul className="flex items-center justify-between py-[16px] mb-[60px] md:mb-[126px] lg:mb-[106px] mt-[16px] md:px-[16px] md:rounded-[12px] md:bg-white">
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
          />
        </li>
      </ul>

      <PreviewContent />
    </Container>
  );
};

export default PreviewPage;
