// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { apis } from "../utils/apis";
// import { toast } from "react-toastify";
// import useApi from "../hooks/useApi";
// import upi from "../assets/Payment/upi.png";

// const Payout = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   const userid = localStorage.getItem("userid");
//   const { get, post, put, del, loading, error } = useApi();
//   const tabs = [2];
//   const [type, setType] = useState(2);
//   const [typeData, setTypeData] = useState(null);
//   const [preview, setPreview] = useState("");
//   const formik = useFormik({
//     initialValues: {
//       beneficiary_name: "",
//       amount: "",
//       qrcode: "",
//     },
//     validationSchema: Yup.object({
     
//       beneficiary_name: Yup.string().required("beneficiary name is required"),
//       amount: Yup.number()
//         .typeError("Amount must be a number")
//         .positive("Amount must be positive")
//         .required("Amount is required"),
//       qrcode: Yup.string().required("QR code is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       // console.log("values", values);
//       const payload = {
//         ...values,
//         user_id: userid,
//         type: type,
//       };
// console.log("paylo",payload)
//       try {
//         const res = await axios.post(`${apis?.withdrawal_request}`, payload);
//         console.log("respone", res);
//         toast.success("Form submitted successfully");
//         resetForm();
//         setPreview("");
//       } catch (err) {
//         console.error(err);
//         alert("Failed to submit form");
//       }
//     },
//   });

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       formik.setFieldValue("qrcode", reader.result);
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const profileHandler = () => {
//     get(`${apis?.getPaymentMethod}${type}`)
//       .then((res) => {
//         // console.log("response profile", res);
//         if (res?.data?.success === true) {
//           setTypeData(res?.data);
//         }
//       })
//       .catch(console.error);
//   };
//   // console.log("data",typeData)
//   useEffect(() => {
//     profileHandler();
//   }, []);
//   return (
//     <div className="h-screen w-full overflow-scroll hide-scrollbar p-3 md:p-5">
//       <div className="flex justify-between items-center space-x-2 mb-4 h-14 p-2 rounded-lg">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setType(tab)}
//             className={`w-32 flex items-center justify-center h-12 border-accent/20 border-2 p-2 rounded ${
//               type === tab ? "bg-[#5F6171] text-white" : " text-white"
//             }`}
//           >
//             <img
//               className="object-fill w-20 h-10"
//               src={tab === 2 ? `${upi}` : "df"}
//               alt=""
//             />
//           </button>
//         ))}
//       </div>
//       <div className="w-full  p-4 mt-5 flex items-center justify-center">
       
//         <div className="max-w-3xl h-full mt-5 md:mt-0 p-6 col-span-1 overflow-auto bg-[#3E4464] shadow-lg rounded-lg">
//           {/* <h2 className="text-xl font-bold mb-4">Submit Transaction</h2> */}
//           <form onSubmit={formik.handleSubmit} className="space-y-4 text-white">
//             {["beneficiary_name", "amount"].map((field) => (
//               <div key={field}>
//                 <label className="block text-[13px] font-medium capitalize">
//                   {field.replace("_", " ")}
//                 </label>
//                 <input
//                   type={field === "amount" ? "number" : "text"}
//                   name={field}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values[field]}
//                   className="w-full border border-white rounded px-3 py-1 mt-1"
//                 />
//                 {formik.touched[field] && formik.errors[field] && (
//                   <p className="text-red-500 text-[10px]">
//                     {formik.errors[field]}
//                   </p>
//                 )}
//               </div>
//             ))}

//             <div>
//               <label className="block text-[13px] font-medium">
//                 Upload QR code
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="mt-1"
//               />
//               {formik.touched.qrcode && formik.errors.qrcode && (
//                 <p className="text-red-500 text-[10px]">
//                   {formik.errors.qrcode}
//                 </p>
//               )}
//               {preview && (
//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="mt-2 h-32 object-contain border"
//                 />
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payout;

import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { apis } from "../utils/apis";
import { toast } from "react-toastify";
import useApi from "../hooks/useApi";
import { FaTimes } from "react-icons/fa";
import upi from "../assets/Payment/upi.png";
import FirstWithdrawPopup from "../Modal/FirstWithdrawPopup";

const Payout = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const userid = localStorage.getItem("userid");
  const { get } = useApi();
  const tabs = [2];
  const [type, setType] = useState(2);
  const [typeData, setTypeData] = useState(null);
  const [preview, setPreview] = useState("");
  const [availableAmount, setAvailableAmount] = useState(0);

  const fileInputRef = useRef(null);

    const profileHandler = () => {
      get(`${apis?.profile}${userid}`)
        .then((res) => {
          console.log(
            "response profile for withdraw",
            res.data.profile
          );
          if (res?.data?.status === true) {
            const balance = res.data.profile.amount;
            setAvailableAmount(balance);
          }
          
          if (res?.data?.status === true) {
            console.log("profile api close");
            // if (typeof setProfileRefresher === "function") {
            //   setProfileRefresher(true);
            // }
            // onClose();
          }
        })
        .catch(console.error);
    };

 useEffect(()=>{
      profileHandler()
    },[])


  const formik = useFormik({
    // initialValues: {
    //   // beneficiary_name: "",
    //   amount: "",
    //   qrcode: "",
    // },

    initialValues: {
      amount: "",
      qrcode: "",
      account_number: "",
      account_holder_name: "",
      bank_name: "",
      ifsc_code: "",
      upi_id: "",
      mobile_number: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required"),

      // qrcode: Yup.string().required("QR code is required"),

      account_number: Yup.string()
        .matches(/^\d+$/, "Account Number must contain only digits")
        .required("Account Number is required"),

      account_holder_name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed")
        .required("Account Holder Name is required"),

      bank_name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed")
        .required("Bank Name is required"),

      ifsc_code: Yup.string().required("IFSC Code is required"),

      upi_id: Yup.string().required("UPI ID is required"),

      mobile_number: Yup.string()
        .matches(/^\d+$/, "Mobile Number must contain only digits")
        .min(10, "Mobile Number must be at least 10 digits")
        .required("Mobile Number is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      // console.log("✅ onSubmit fired");
      // alert("sdfdf")
      // const payload = {
      //   ...values,
      //   user_id: userid,
      //   type: type,
      // };
      const payload = {
        ...values,
        user_id: userid,
        type: type,
      };

      console.log("withdraw payload:", payload);
      if (Number(values.amount) > Number(availableAmount)) {
        toast.error("Insufficient balance to withdraw this amount.");
        return;
      }
      try {
        const res = await axios.post(`${apis?.withdrawal_request}`, payload);
        toast.success("Form submitted successfully");
        resetForm();
        setPreview("");
        if (fileInputRef.current) fileInputRef.current.value = null;
        onClose(); // close modal if needed
      } catch (err) {
        console.error(err);
        alert("Failed to submit form");
      }
    },
  });
  // console.log("Formik errors:", formik.errors);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue("qrcode", reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    get(`${apis?.getPaymentMethod}${type}`)
      .then((res) => {
        if (res?.data?.success) {
          setTypeData(res.data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#2c2f4a] w-full max-w-80 max-h-[90vh] rounded-2xl shadow-2xl text-white flex flex-col">
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-300 hover:text-red-400"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold text-center mt-6 mb-2">Withdrawal</h2>

        <div className="overflow-y-auto px-6 pb-6 flex-1 hide-scrollbar">
          {/* Tab Section */}
          {/* <div className="flex justify-center mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setType(tab)}
                className={`w-32 flex items-center justify-center h-12 border-accent/20 border-2 p-2 rounded ${
                  type === tab ? "bg-[#5F6171] text-white" : " text-white"
                }`}
              >
                <img className="object-fill w-20 h-10" src={upi} alt="UPI" />
              </button>
            ))}
          </div> */}

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4 text-white">
            {/* <div>
               <label className="text-sm mb-1 block">Beneficiary Name</label>
              <input
                type="text"
                name="beneficiary_name"
                value={formik.values.beneficiary_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
              /> 
              {formik.touched.beneficiary_name &&
                formik.errors.beneficiary_name && (
                  <p className="text-red-400 text-xs mt-1">
                    {formik.errors.beneficiary_name}
                  </p>
                )}
            </div> */}

            <div>
              <label className="text-sm mb-1 block">Amount</label>
              <input
                type="number"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
              />
              {formik.touched.amount && formik.errors.amount && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.amount}
                </p>
              )}
            </div>

            {/* <div>
              <label className="text-sm block mb-1">Upload QR Code</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm file:py-2 file:px-4 file:rounded file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-indigo-600 file:text-white"
              />
              {formik.touched.qrcode && formik.errors.qrcode && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.qrcode}
                </p>
              )}
              {preview && (
                <div className="relative mt-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-40 object-contain rounded border border-white/20 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview("");
                      formik.setFieldValue("qrcode", "");
                      formik.setTouched({ qrcode: false });
                      if (fileInputRef.current)
                        fileInputRef.current.value = null;
                    }}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-80"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              )}
            </div> */}

            <div>
              <label className="text-sm block mb-1">Account Number</label>
              <input
                type="text"
                name="account_number"
                value={formik.values.account_number}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  formik.setFieldValue("account_number", onlyDigits);
                }}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
              />
              {formik.touched.account_number &&
                formik.errors.account_number && (
                  <p className="text-red-400 text-xs mt-1">
                    {formik.errors.account_number}
                  </p>
                )}
            </div>

            <div>
              <label className="text-sm block mb-1">Account Holder Name</label>
              <input
                type="text"
                name="account_holder_name"
                value={formik.values.account_holder_name}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  const onlyAlphabets = e.target.value.replace(
                    /[^a-zA-Z\s]/g,
                    ""
                  );
                  formik.setFieldValue("account_holder_name", onlyAlphabets);
                }}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
              />
              {formik.touched.account_holder_name &&
                formik.errors.account_holder_name && (
                  <p className="text-red-400 text-xs mt-1">
                    {formik.errors.account_holder_name}
                  </p>
                )}
            </div>

            <div>
              <label className="text-sm block mb-1">Bank Name</label>
              <input
                type="text"
                name="bank_name"
                value={formik.values.bank_name}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  const onlyAlphabets = e.target.value.replace(
                    /[^a-zA-Z\s]/g,
                    ""
                  );
                  formik.setFieldValue("bank_name", onlyAlphabets);
                }}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
              />
              {formik.touched.bank_name && formik.errors.bank_name && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.bank_name}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm block mb-1">IFSC Code</label>
              <input
                type="text"
                name="ifsc_code"
                value={formik.values.ifsc_code}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  const alphanumeric = e.target.value
                    .replace(/[^a-zA-Z0-9]/g, "")
                    .toUpperCase()
                    .slice(0, 16);
                  formik.setFieldValue("ifsc_code", alphanumeric);
                }}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
              />
              {formik.touched.ifsc_code && formik.errors.ifsc_code && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.ifsc_code}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm block mb-1">UPI ID</label>
              <input
                type="text"
                name="upi_id"
                value={formik.values.upi_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
              />
              {formik.touched.upi_id && formik.errors.upi_id && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.upi_id}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm block mb-1">Mobile Number</label>
              <input
                type="text"
                name="mobile_number"
                value={formik.values.mobile_number}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  const onlyDigits = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  formik.setFieldValue("mobile_number", onlyDigits);
                }}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
              />
              {formik.touched.mobile_number && formik.errors.mobile_number && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.mobile_number}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-2 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payout;
