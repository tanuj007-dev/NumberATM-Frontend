import  { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const status = searchParams.get("status");
    const txnid = searchParams.get("txnid");

    if (status === "success") {
      alert(`Payment Successful! Transaction ID: ${txnid}`);
    } else {
      alert("Payment Failed!");
    }
  }, [searchParams]);

  return (
    <div className="text-center mt-10">
      <h2>Processing Payment Status...</h2>
    </div>
  );
};

export default PaymentStatus;
