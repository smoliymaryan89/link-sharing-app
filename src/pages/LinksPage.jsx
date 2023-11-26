import { useState } from "react";
import { nanoid } from "nanoid";

import { useDispatch, useSelector } from "react-redux";
import { selectLinks, selectPreviewLinks } from "../redux/link/linkSelectors";
import { addLink, updateLink } from "../redux/link/linkOperations";

import sprite from "../assets/icons/sprite.svg";

import Container from "../components/Container/Container";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import Button from "../components/Button/Button";
import LinkList from "../components/LinkList/LinkList";
import LinkItem from "../components/LinkList/LinkItem/LinkItem";
import findMatchingLink from "../utils/findMatchingLink";

const LinksPage = () => {
  const [linkList, setLinkList] = useState([]);

  const dispatch = useDispatch();
  const previewLinks = useSelector(selectPreviewLinks);
  const links = useSelector(selectLinks);

  const handleAddLink = () => {
    setLinkList([...linkList, { id: nanoid() }]);
  };

  const matchingLink = findMatchingLink(previewLinks, links);

  const handleSave = () => {
    if (previewLinks.length === 0) {
      return;
    }

    if (matchingLink) {
      dispatch(updateLink({ id: matchingLink.id, links: previewLinks }));
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
    <section className="section flex-1 ">
      <Container>
        <div className="px-[24px] pt-[24px] pb-[28px] bg-white md:px-[40px] md:pt-[40px]  rounded-[12px]">
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

          {linkList.length === 0 && links.length === 0 && (
            <div className="py-[47px] px-[20px] bg-light-grey  rounded-[12px] md:py-[83px] md:px-[57px] ">
              <svg className="block w-[125px] h-[80px] mx-auto mb-[24px] md:w-[250px] md:h-[160px] md:mb-[40px]">
                <use href={`#${sprite}_book`}></use>
              </svg>
              <InfoPanel
                wrapper={"mb-0"}
                title="Let's get you started"
                text="Use the 'Add new link' button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!"
              />
            </div>
          )}

          {(linkList.length > 0 || links.length > 0) && (
            <div className="link-list overflow-y-auto h-[510px]">
              {linkList.length > 0 && (
                <ul>
                  {linkList.map((item) => (
                    <LinkItem
                      key={item.id}
                      linkList={linkList}
                      handleDelete={handleDelete}
                      item={item}
                    />
                  ))}
                </ul>
              )}

              <LinkList />
            </div>
          )}

          <Button
            type={"button"}
            title={"Save"}
            onClick={handleSave}
            className={`block  text-white hover:bg-blue 
             mt-[20px] w-full hover:opacity-50 hover:text-white transition-all duration-350 md:py-[11px] md:px-[27px] md:w-[91px] md:ml-auto sm:mt-[61px] disabled:opacity-[0.25] `}
          />
        </div>
      </Container>
    </section>
  );
};

export default LinksPage;
