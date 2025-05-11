import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RN9pcQSPfEW4nUdZVSgj18RDpRbJHe4KlCD2KeS4hZTDDRM9YnmVXTxb4CVPTClA1CXpOFCXOea4uM0eUCz15qd00qsgN2SVv');

export default function Subscribe_Basic_Plan() {
    const user = localStorage.getItem('user')
const handleClick = async (event) => {
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:8000/api/v1/media/create-checkout-session/basic_plan/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user }),
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
    <button role="link" onClick={handleClick} className="w-full py-3 rounded-lg bg-white text-[#FF0080] font-bold hover:bg-gray-200 transition">
      Buy The Basic Plan Now
    </button>
  );
}