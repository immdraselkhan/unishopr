import {useLeadsQuery, useOrdersQuery} from "@redux/services/order/api";
import OrderList from "@containers/account/orders/order-list";

const Cancelled = () => {
    const orders = useOrdersQuery({status: "cancelled"}, {refetchOnMountOrArgChange: true});
    const leads = useLeadsQuery({status: "cancelled"}, {refetchOnMountOrArgChange: true});
    return <OrderList
        orders={orders.data}
        leads={leads.data}
    />;
}

export default Cancelled;
