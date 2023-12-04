import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLinks } from "../../redux/link/linkSelectors";
import { reorder } from "../../redux/link/linkSlice";

import { Reorder } from "framer-motion";

import checkLinksIndex from "../../utils/checkLinksIndex";

import LinkItem from "./LinkItem/LinkItem";

const LinkList = ({ linkList, handleDelete, itemsArray }) => {
  const [reorderList, setReorderList] = useState([]);

  const dispatch = useDispatch();

  const links = useSelector(selectLinks);

  const isIndexChange = checkLinksIndex(reorderList, links);

  useEffect(() => {
    setReorderList(itemsArray);
  }, [itemsArray]);

  useEffect(() => {
    if (!isIndexChange) {
      return;
    }
    dispatch(reorder(reorderList));
  }, [dispatch, isIndexChange, links, reorderList]);

  return (
    <Reorder.Group axis="y" onReorder={setReorderList} values={reorderList}>
      {reorderList.map((item, index) => (
        <LinkItem
          key={item.id}
          item={item}
          linkList={linkList}
          handleDelete={handleDelete}
          index={index}
        />
      ))}
    </Reorder.Group>
  );
};

LinkList.propTypes = {
  linkList: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  itemsArray: PropTypes.array.isRequired,
};

export default LinkList;
