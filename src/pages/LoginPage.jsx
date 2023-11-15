import sprite from "../assets/icons/sprite.svg";

import Container from "../components/Container/Container";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <Container className={"py-[32px]  max-w-[343px] "}>
      <div className="flex items-center md:justify-center gap-[10px] mb-[64px] md:mb-[98px]">
        <svg className="block" width={40} height={40}>
          <use href={`#${sprite}_logo`}></use>
        </svg>
        <p className="text-[32px] text-dark-grey font-bold placeholder:opacity-[0.5]">
          devlinks
        </p>
      </div>

      <div className="md:max-w-[476px] py-[40px] px-[40px] bg-white rounded-[10px] mx-auto">
        <InfoPanel
          title={"Login"}
          text={"Add your details below to get back into the app"}
        />

        <LoginForm />
      </div>
    </Container>
  );
};

export default LoginPage;
