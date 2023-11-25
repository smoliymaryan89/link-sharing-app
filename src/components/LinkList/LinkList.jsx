import { useSelector } from "react-redux";
import { selectLinks } from "../../redux/link/linkSelectors";

import LinkItem from "./LinkItem/LinkItem";

const LinkList = ({ handleDelete }) => {
  const links = useSelector(selectLinks);

  console.log("links", links);

  return (
    <ul>
      {links.map((item) => (
        <LinkItem key={item.id} item={item} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default LinkList;
