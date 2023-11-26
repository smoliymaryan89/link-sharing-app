import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authOperations";

import Button from "../components/Button/Button";
import Container from "../components/Container/Container";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import ProfileForm from "../components/ProfileForm/ProfileForm";

const ProfilePage = () => {
  const dispatch = useDispatch();

  return (
    <section className="section flex-1">
      <Container>
        <div className="px-[24px] pt-[24px] pb-[16px] bg-white md:px-[40px] md:pt-[40px] md:pb-[24px] rounded-[12px]">
          <div className="flex items-baseline justify-between">
            <InfoPanel
              title="Profile Details"
              text="Add your details to create a personal touch to your profile."
            />
            <Button
              type="button"
              title="Logout"
              className="pl-[0px] pr-[0px] max-w-[91px] text-white hover:bg-red transition-colors duration-350 w-full"
              onClick={() => dispatch(logOut())}
            />
          </div>

          <ProfileForm />
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;
