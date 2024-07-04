import {useOrdersQuery} from "@redux/services/order/api";
import OrderList from "@containers/account/orders/order-list";

const InTransit = () => {
    const orders = useOrdersQuery({status: "inTransit"}, {refetchOnMountOrArgChange: true});
    return <OrderList orders={orders.data} />;
}

export default InTransit;
