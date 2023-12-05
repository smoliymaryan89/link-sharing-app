import Container from "../components/Container/Container";
import PreviewContent from "../components/PreviewContent/PreviewContent";

const SharedPage = () => {
  return (
    <Container className={"py-[60px] md:py-[120px]"}>
      <div className=" bg-blue absolute top-0 left-0 h-[357px] rounded-b-[32px] w-full -z-10 "></div>

      <PreviewContent className="py-[40px] px-[25px]  md:py-[48px] md:px-[56px] rounded-[24px] bg-white shadow-card-shadow" />
    </Container>
  );
};

export default SharedPage;
