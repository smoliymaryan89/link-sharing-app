import sprite from "../assets/icons/sprite.svg";

import Container from "../components/Container/Container";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import Button from "../components/Button/Button";

const LinksPage = () => {
  return (
    <section className="section flex-1">
      <Container>
        <div className="px-[24px] pt-[24px] pb-[16px] bg-white md:px-[40px] md:pt-[40px] md:pb-[24px] rounded-[12px]">
          <InfoPanel
            title="Customize your links"
            text="Add/edit/remove links below and then share all your profiles with the world!"
          />
          <Button
            title="+ Add new link"
            className="bg-transparent border-[1px] border-blue rounded-[12px] text-blue mb-[24px] hover:bg-blue hover:opacity-50 hover:text-white transition-all duration-350"
            type={"button"}
          />

          <div className="py-[47px] px-[20px] bg-light-grey mb-[24px] rounded-[12px] md:py-[83px] md:px-[57px]">
            <svg className="block w-[125px] h-[80px] mx-auto mb-[24px] md:w-[250px] md:h-[160px] md:mb-[40px]">
              <use href={`#${sprite}_book`}></use>
            </svg>
            <InfoPanel
              wrapper={"mb-0"}
              title="Let's get you started"
              text="Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!"
            />
          </div>

          <Button
            type={"button"}
            title={"Save"}
            className={
              "block text-white hover:bg-blue hover:opacity-50 hover:text-white transition-all duration-350 md:py-[11px] md:px-[27px] md:w-[91px] md:ml-auto  "
            }
          />
        </div>
      </Container>
    </section>
  );
};

export default LinksPage;
