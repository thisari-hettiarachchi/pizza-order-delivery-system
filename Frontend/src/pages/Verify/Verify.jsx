import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Verify.css";
import { FaCheckCircle } from "react-icons/fa";
import { StoreContext } from "../../Context/StoreContext";

const Verify = () => {
  const { url } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId);
    }
  }, [sessionId]);

  const verifyPayment = async (sessionId) => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        sessionId,
      });

      if (response.data.success) {
        toast.success("Payment Verified! Your order is confirmed.");
      } else {
        toast.error("Payment verification failed!");
      }
    } catch (error) {
      toast.error("Error verifying payment.");
    }
  };

  return (
    <div className="success-container">
      <div className="success-box">
        <FaCheckCircle className="success-icon" />
        <h1>Payment Successful!</h1>
        <p>Your order has been placed successfully.</p>
      </div>
    </div>
  );
};

export default Verify;
