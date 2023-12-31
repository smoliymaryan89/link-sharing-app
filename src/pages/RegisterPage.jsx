import sprite from "../assets/icons/sprite.svg";

import Container from "../components/Container/Container";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import AuthPrompt from "../components/AuthPrompt/AuthPrompt";

const RegisterPage = () => {
  return (
    <Container className={"py-[30px] max-w-[343px] "}>
      <div className="flex items-center md:justify-center gap-[10px] mb-[64px] md:mb-[50px]">
        <svg className="block" width={40} height={40}>
          <use href={`#${sprite}_logo`}></use>
        </svg>
        <p className="text-[32px] text-dark-grey font-bold placeholder:opacity-[0.5]">
          devlinks
        </p>
      </div>

      <div className="py-[40px] rounded-[10px] mx-auto md:px-[40px] md:bg-white md:max-w-[476px]">
        <InfoPanel
          title={"Create account"}
          text={"Let's get you started sharing your links!"}
        />

        <RegisterForm />
        <AuthPrompt
          text="Already have an account?"
          label="Login"
          path="/login"
        />
      </div>
    </Container>
  );
};

export default RegisterPage;
