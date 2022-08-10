import { useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from 'next/router';

const OrderShow = ({order, currentUser}) => {
  const [timeLeft, setTimeLeft] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: (payment) => Router.push('/orders')  
  });
  useEffect(() => {
  
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft) / 1000);
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, [order]);

  if(timeLeft < 0){
    return <div>Order Expired</div>
  }
  
  return <div> 
    Time left t pay: {timeLeft} seconds 
    <StripeCheckout 
      token={({id}) => doRequest({token: id })}
      stripeKey ="pk_test_51LTFTcG2lkpdGHzMtvAFKY42vYMB2BWW3tGCc8OuJZBdsCS1Ewxixwv7EysMRPZFduHFCcBlXj4wG82bUi5Ip7SW00A7nYehmt"
      amount={order.ticket.price * 100 }
      email={currentUser.email}
    />
    {errors}
  </div>;
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
