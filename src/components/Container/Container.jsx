const Container = ({ children }) => {
  return (
    <div className="max-w-[375px] px-4 mx-auto md:max-w-[768px] md:px-6 lg:max-w-[1440px]">
      {children}
    </div>
  );
};

export default Container;
