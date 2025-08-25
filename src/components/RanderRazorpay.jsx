import { useState } from "react";
import { R_KEY_ID } from "../services/Secret";
import { useNavigate } from "react-router-dom";
import {
  createBooking,
  createPayment,
  verifyPayment,
} from "../services/services";
import { toast } from "react-toastify";

const RenderRazorpay = ({ orderDetails, bookingDetails }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  console.log(bookingDetails);

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const displayRazorpay = async () => {
    const isScriptLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!isScriptLoaded || !window.Razorpay) {
      alert("Razorpay SDK failed to load. Please try again.");
      return;
    }

    const options = {
      key: R_KEY_ID,
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      order_id: orderDetails.id,
      handler: async (response) => {
        try {
          const res = await verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });

          if (res?.status === 200) {
            if (bookingDetails?.step1.userType === "new") {
              const payLoad = {
                userId: bookingDetails?.step4?.userId,
                doctorId: bookingDetails?.step3?.doctor?.id,
                bookingDate: bookingDetails?.step2?.bookingDate,
              };
              console.log(payLoad);
              createBooking(payLoad)
                .then((res) => {
                  toast("Payment Successfully Completed");
                  navigate("/success");
                })
                .catch((err) => {
                  console.log(err);
                });

              const paymentPayload = {
                userId: bookingDetails?.step4?.userId,
                paidBy: "razorpay",
                ammount: orderDetails.amount / 100,
              };
              createPayment(paymentPayload)
                .then((res) => {
                  console.log("Payment created Successfully");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              const payLoad = {
                userId: bookingDetails.step3.userId,
                doctorId: bookingDetails.step3.doctor.id,
                bookingDate: bookingDetails.step3.bookingDate,
              };
              createBooking(payLoad).then((res) => {
                toast("Payment Successfully Completed");
                navigate("/success");
              });
              const paymentPayload = {
                userId: bookingDetails.step3.userId,
                paidBy: "razorpay",
                ammount: orderDetails.amount / 100,
              };
              createPayment(paymentPayload)
                .then((res) => {
                  console.log("Payment created Successfully");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }

          // alert("✅ Payment Successful");
          // navigate("/booking"); // redirect after success
        } catch (error) {
          toast.error("❌ Payment verification failed.");
        }
      },
      theme: {
        color: "#4F46E5", // Indigo-600
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6">
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Complete Your Payment
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Ensure your payment details are correct before proceeding.
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={displayRazorpay}
                className="px-5 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RenderRazorpay;
