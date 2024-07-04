import Link from "next/link";
import { useRouter } from "next/router";
import {ImProfile} from "react-icons/im";
import {TbPhoneCheck} from "react-icons/tb";
import {MdMarkEmailRead} from "react-icons/md";

const profileMenu = [
    {
        slug: "/account/profile",
        name: "Profile Details",
        icon: <ImProfile className="w-5 h-5" />,
    },
    {
        slug: "/account/profile/change-phone",
        name: "Change Phone Number",
        icon: <TbPhoneCheck className="w-5 h-5"/>,
    },
    // {
    //     slug: "/account/profile/change-email",
    //     name: "Change Email",
    //     icon: <MdMarkEmailRead className="w-5 h-5"/>,
    // },
];

export default function ProfileNav() {
    const { pathname} = useRouter();
    const newPathname = pathname.split("/").slice(2, 4);
    const mainPath = `/${newPathname[1]}`;

    return (
        <nav className="flex flex-col md:w-2/6 2xl:w-4/12 md:pe-8 lg:pe-12 xl:pe-16 2xl:pe-20 pb-2 md:pb-0">
            {profileMenu.map((item) => {
                const menuPathname = item.slug.split("/").slice(2, 4);
                const menuPath = `/${menuPathname[1]}`;

                return (
                    <Link key={item.slug} href={item.slug}>
                        <a
                            className={
                                mainPath === menuPath
                                    ? "bg-gray-100 font-semibold flex items-center cursor-pointer text-sm lg:text-base text-heading py-3.5 px-4 lg:px-5 rounded mb-2 "
                                    : "flex items-center cursor-pointer text-sm lg:text-base text-heading font-normal py-3.5 px-4 lg:px-5 rounded mb-2"
                            }
                        >
                            {item.icon}
                            <span className="ps-2 ">{item.name}</span>
                        </a>
                    </Link>
                );
            })}
        </nav>
    );
}
