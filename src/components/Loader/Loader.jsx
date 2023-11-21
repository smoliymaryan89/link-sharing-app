import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw] bg-overlay ">
      <Triangle
        height="80"
        width="80"
        color="#633CFF"
        ariaLabel="triangle-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
