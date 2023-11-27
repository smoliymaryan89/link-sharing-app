import PropTypes from "prop-types";

import { Reorder } from "framer-motion";

import LinkItem from "./LinkItem/LinkItem";

const LinkList = ({ linkList, handleDelete, reorderList, setReorderList }) => {
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
  reorderList: PropTypes.array.isRequired,
  setReorderList: PropTypes.func.isRequired,
};

export default LinkList;
