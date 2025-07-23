import React from "react";

// Import logo images (replace with actual paths or URLs)
import mastercard from "../assets/Payment/masterCard.png";
import indianpay from "../assets/Payment/indianpaylogo.png";
import kuberpay from "../assets/Payment/kuberlogo.png";
import skillpay from "../assets/Payment/skillpaylogo.png";

const FooterPayment = () => {
  const logos = [
    { src: mastercard, alt: "MasterCard" },
    { src: indianpay, alt: "IndianPay" },
    { src: kuberpay, alt: "KuberPay" },
    { src: skillpay, alt: "SkillPay" },
  ];

  return (
    <div className="w-full bg-[#002c5f] py-2">
      <div className="max-w-screen-90 mx-auto px-4">
        <div className="bg-[#00356f] rounded-xl flex flex-wrap justify-between items-center gap-6 py-4 px-4">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex justify-center items-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 sm:h-8 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterPayment;
