import {useLeadsQuery} from "@redux/services/order/api";
import OrderList from "@containers/account/orders/order-list";

const Pending = () => {
	const leads = useLeadsQuery("", {refetchOnMountOrArgChange: true});
	return <OrderList leads={leads.data} refetch={leads.refetch} />;
}

export default Pending;
