import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
const stripePromise = loadStripe('pk_test_51RN9pcQSPfEW4nUdZVSgj18RDpRbJHe4KlCD2KeS4hZTDDRM9YnmVXTxb4CVPTClA1CXpOFCXOea4uM0eUCz15qd00qsgN2SVv');

export default function Subscribe({Price_plan}) {
    const user = localStorage.getItem('user')
const handleClick = async (event) => {
    const stripe = await stripePromise;
    const response = await fetch('https://claudcanvas-backend.onrender.com/api/v1/media/create-checkout-session/basic_plan/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user,Pricetype : Price_plan }),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
    });
    if (result.error) {
        console.error(result.error.message);
    }
};

  return (
    <div role="link" onClick={handleClick}>
     <h1 >Buy Now</h1>
    </div>
  );
}