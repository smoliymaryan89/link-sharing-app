import { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";

import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  selectLinks,
  selectPreviewLinks,
} from "../redux/link/linkSelectors";
import {
  addLink,
  getAllLinks,
  reorderLinkData,
  updateLink,
} from "../redux/link/linkOperations";

import sprite from "../assets/icons/sprite.svg";
import findMatchingLink from "../utils/findMatchingLink";

import Container from "../components/Container/Container";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import Button from "../components/Button/Button";
import LinkList from "../components/LinkList/LinkList";
import Loader from "../components/Loader/Loader";
import BtnLoader from "../components/Loader/BtnLoader";
import PhonePreview from "../components/PhonePreview/PhonePreview";

const LinksPage = () => {
  const [linkList, setLinkList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLinks());
  }, [dispatch]);

  const previewLinks = useSelector(selectPreviewLinks);
  const links = useSelector(selectLinks);
  const isLoading = useSelector(selectIsLoading);

  const itemsArray = useMemo(() => [...links, ...linkList], [linkList, links]);

  const matchingLink = findMatchingLink(previewLinks, links);

  const handleAddLink = () => {
    setLinkList([...linkList, { id: nanoid() }]);
  };

  const handleSave = () => {
    if (matchingLink) {
      dispatch(updateLink({ id: matchingLink.id, links: previewLinks }));
      return;
    }

    dispatch(reorderLinkData(links));

    if (previewLinks.length === 0) {
      return;
    }

    dispatch(addLink(previewLinks));
    setLinkList([]);
  };

  const handleDelete = (id) => {
    setLinkList((prevLinkList) =>
      prevLinkList.filter((item) => item.id !== id)
    );
  };

  return (
    <Container className={"flex lg:gap-[24px]"}>
      <PhonePreview />
      <section className="section flex-1">
        <>
          <div className="px-[24px] pt-[24px] pb-[28px] bg-white md:px-[40px] md:pt-[40px] h-[835.6px]  rounded-[12px]">
            <InfoPanel
              title="Customize your links"
              text="Add/edit/remove links below and then share all your profiles with the world!"
            />
            <Button
              title="+ Add new link"
              className="w-full bg-transparent border-[1px] border-blue rounded-[12px] text-blue mb-[24px] hover:bg-light-purple transition-all duration-350"
              type={"button"}
              onClick={handleAddLink}
            />
            {!isLoading && itemsArray.length === 0 && (
              <div className="bg-light-grey rounded-[12px] py-[46.5px] px-[20px] md:py-[82.5px] md:px-[76.5px] lg:py-[62.5px] lg:px-[120px] lg:mb-[61px]">
                <svg className="block w-[125px] h-[80px] mx-auto mb-[24px] md:w-[250px] md:h-[160px] md:mb-[40px]">
                  <use href={`#${sprite}_book`}></use>
                </svg>
                <InfoPanel
                  className={"!mb-[24px]"}
                  wrapper={"!mb-0 mx-auto text-center"}
                  title="Let's get you started"
                  text="Use the 'Add new link' button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!"
                />
              </div>
            )}
            {isLoading ? (
              <Loader
                className={"bg-light-grey w-full h-[510px] rounded-[12px]"}
              />
            ) : (
              itemsArray.length > 0 && (
                <div
                  className={`link-list ${
                    itemsArray.length > 2
                      ? "overflow-y-auto"
                      : "overflow-y-hidden"
                  } h-[510px]`}
                >
                  <LinkList
                    itemsArray={itemsArray}
                    linkList={linkList}
                    handleDelete={handleDelete}
                  />
                </div>
              )
            )}

            <Button
              type={"button"}
              title={isLoading ? <BtnLoader /> : "Save"}
              onClick={handleSave}
              disabled={isLoading}
              className={`block  text-white  
             mt-[20px] w-full hover:bg-active hover:shadow-active-shadow hover:text-white transition-all duration-350 md:py-[11px] md:px-[27px] md:w-[91px] md:ml-auto sm:mt-[61px] disabled:bg-blue disabled:opacity-[0.25] `}
            />
          </div>
        </>
      </section>
    </Container>
  );
};

export default LinksPage;
