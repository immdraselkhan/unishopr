export type SignUp = {
    data: {
        firstName: string;
        lastName: string;
        phone: {
            phone: string,
            countryId: string
        };
        gender: string;
        email: string;
        accountType: string;
    },
    action: () => void;
};

export type SignUpRes = {
    data: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: {
            phone: string,
            country: {
                _id: string,
                name: string,
                code: string
            }
        }
        services: {
            traveler: {
                isTraveler: true,
                categories: {
                    _id: string,
                    name: string
                }[],
                overview: string
            }
        }
    },
    message: string
}

export type OtpVerify = {
    data: {
        userId: string;
        otp: string;
        phone: {
            phone: string,
            countryId: string
        };
    },
    action: () => void
};


export type SignIn = {
    data: {
        phone: string,
        countryId: string
        uniAuth: string,
        email: string
    },
    action: () => void
};

export type SocialSignIn = {
    data: {
       accountType: string,
        email: string
    },
    action: () => void
};

export type SignInRes = {
    data: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: {
            phone: string,
            country: {
                _id: string,
                name: string,
                code: string
            }
        }
        services: {
            traveler: {
                isTraveler: true,
                categories: {
                    _id: string,
                    name: string
                }[],
                overview: string
            }
        }
    },
    message: string
}

export type OtpVerifyRes = {
    data: {
        access: {
            token: string,
            expires: string
        },
        refresh: {
            token: string,
            expires: string
        },
        user: {
            _id: string,
            firstName: string,
            lastName: string,
            email: string,
            phone: {
                phone: string,
                country: {
                    _id: string,
                    name: string,
                    code: string
                }
            }
            services: {
                traveler: {
                    isTraveler: true,
                    categories: {
                        _id: string,
                        name: string
                    }[],
                    overview: string
                }
            }
        }
    },
    message: string
}

export type Renew = {
    body: {
        access: string;
        refresh: string;
    },
    render: () => void,
    logout: () => void
};

export type LogOutRes = {
    data: null,
    message: string
}

export type LostPassword = {
    email: string;
};

export type ResetPassword = {
    _id: string;
    password: string;
    newPassword: string;
};