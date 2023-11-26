import { useSelector } from "react-redux";
import { selectLinks } from "../../redux/link/linkSelectors";

import LinkItem from "./LinkItem/LinkItem";

const LinkList = () => {
  const links = useSelector(selectLinks);

  return (
    <ul>
      {links.map((item) => (
        <LinkItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default LinkList;
