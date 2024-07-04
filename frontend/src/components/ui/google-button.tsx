import React from "react";
import { ImGoogle2 } from "react-icons/im";
import SocialLogin from "react-social-login";
import Button from "./button";

class GoogleButton extends React.Component {
  render() {
    // @ts-ignore
    const { children, triggerLogin, ...props } = this.props;
    return (
      <>
        <Button
          className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
          onClick={triggerLogin}
          {...props}
        >
          <ImGoogle2 className="text-lg me-1.5" />
          Login With Google
        </Button>
      </>
    );
  }
}

export default SocialLogin(GoogleButton);