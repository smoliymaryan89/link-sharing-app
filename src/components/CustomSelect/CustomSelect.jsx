import PropTypes from "prop-types";

import Select, { components } from "react-select";

const Option = (props) => (
  <components.Option {...props}>
    <svg className="fill-grey " width="16" height="16">
      <use href={props.data.icon}></use>
    </svg>

    <span className="text-[16px] text-dark-grey">{props.data.label}</span>
  </components.Option>
);

const CustomSelect = ({
  platformId,
  className,
  handleChange,
  selectedLink,
  setSelectedLink,
  options,
}) => {
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
      name="platform"
      id={platformId}
      value={selectedLink}
      options={options}
      onChange={handleChange}
      classNamePrefix="custom-select"
      isSearchable={false}
      components={{
        Option,
        SingleValue,
      }}
      className={className}
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

export default CustomSelect;
