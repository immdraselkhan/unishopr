import {Fragment} from "react";
import {usePaymentsQuery} from "@redux/services/account/api";
import PaymentList from "@containers/account/payments/payment-list";
const Payments = () =>{
    const  payments = usePaymentsQuery("")
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                       <PaymentList payments={payments.data} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Payments;