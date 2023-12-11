import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container/Container";
import PreviewContent from "../components/PreviewContent/PreviewContent";
import { useEffect } from "react";
import { getSharedData } from "../redux/shared/sharedOperations";
import { useParams } from "react-router-dom";
import { selectSharedData } from "../redux/shared/sharedSelectors";

const SharedPage = () => {
  const { id: owner } = useParams();

  const { avatarURL, firstName, lastName, emailPreview, links } =
    useSelector(selectSharedData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSharedData(owner));
  }, [dispatch, owner]);

  return (
    <Container className={"py-[60px] md:py-[120px]"}>
      <div className=" bg-blue absolute top-0 left-0 h-[357px] rounded-b-[32px] w-full -z-10 "></div>

      <PreviewContent
        image={avatarURL}
        firstName={firstName}
        lastName={lastName}
        emailPreview={emailPreview}
        sharedLinks={links}
        className="py-[40px] px-[25px]  md:py-[48px] md:px-[56px] rounded-[24px] bg-white shadow-card-shadow"
      />
    </Container>
  );
};

export default SharedPage;
