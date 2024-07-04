import {FC, Fragment, ReactNode} from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";

const MyDrawer: FC<{
    children: ReactNode,
    open: boolean,
    onClose: () => void
}> = (props) => {
    return (
        <Fragment>
            <Drawer
                open={props.open}
                placement={"right"}
                onClose={props.onClose}
            >
                {props.children}
            </Drawer>
        </Fragment>
    )
}

export default MyDrawer;
