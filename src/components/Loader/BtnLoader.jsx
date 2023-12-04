import { RotatingLines } from "react-loader-spinner";

const BtnLoader = () => {
  return (
    <RotatingLines
      strokeColor="#010123"
      strokeWidth="5"
      animationDuration="0.75"
      width="25"
      visible={true}
    />
  );
};

export default BtnLoader;
