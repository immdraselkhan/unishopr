import {useOrdersQuery} from "@redux/services/order/api";
import OrderList from "@containers/account/orders/order-list";

const Received = () => {
    const orders = useOrdersQuery({status: "received"}, {refetchOnMountOrArgChange: true});
    return <OrderList orders={orders.data} />;
}

export default Received;
