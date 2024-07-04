import React from "react";
import { ImFacebook2 } from "react-icons/im";
import SocialLogin from "react-social-login";
import Button from "./button";

class FacebookButton extends React.Component {
  render() {
    // @ts-ignore
    const { children, triggerLogin, ...props } = this.props;
    return (
      <>
        <Button
          className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
          onClick={triggerLogin}
          {...props}
        >
          <ImFacebook2 className="text-lg me-1.5" />
          Login With Facebook
        </Button>
      </>
    );
  }
}

export default SocialLogin(FacebookButton);