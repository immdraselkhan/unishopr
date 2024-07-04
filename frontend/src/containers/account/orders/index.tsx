import {useLeadsQuery, useOrdersQuery} from "@redux/services/order/api";
import OrderList from "@containers/account/orders/order-list";

const Orders = () => {
	const orders = useOrdersQuery({status: "completed"}, {refetchOnMountOrArgChange: true});
	return <OrderList orders={orders.data} />;
}

export default Orders;
