import PropTypes from "prop-types";

import { useState } from "react";
import Select, { components } from "react-select";

import links from "../../utils/selectData";

const Option = (props) => (
  <components.Option {...props} classNameName="">
    <svg className="fill-grey " width="16" height="16">
      <use href={props.data.icon}></use>
    </svg>

    <span className="text-[16px] text-dark-grey">{props.data.label}</span>
  </components.Option>
);

const CustomeSelect = () => {
  const [selectedLink, setSelectedLink] = useState(links[0]);

  const handleChange = (value) => {
    setSelectedLink(value);
  };

  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      <svg className="fill-grey " width="16" height="16">
        <use href={selectedLink.icon}></use>
      </svg>

      {children}
    </components.SingleValue>
  );

  return (
    <Select
      value={selectedLink}
      options={links}
      onChange={handleChange}
      classNamePrefix="custom-select"
      isSearchable={false}
      components={{
        Option,
        SingleValue,
      }}
      styles={{
        menuList: (base) => ({
          ...base,
          "::-webkit-scrollbar": {
            width: "4px",
            height: "1px",
          },
        }),
      }}
    />
  );
};

export default CustomeSelect;

Option.propTypes = {
  data: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

CustomeSelect.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ),
  children: PropTypes.node,
};
