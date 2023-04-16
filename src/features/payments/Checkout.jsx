import { API_URL } from "../../Config/Config";

const Checkout = ({ appointment, price }) => {
  return (
    <>
      <div className="container">
        <h2>Price</h2>
        <h3>{price}</h3>
        <form
          action={`${API_URL}/payment/create-checkout-session/`}
          method="POST"
        >
          <input type="hidden" name="product_name" value="test_product" />
          <input type="hidden" name="price" value={25 * 100} />
          <button className="btn-checkout" type="submit">
            Checkout
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
