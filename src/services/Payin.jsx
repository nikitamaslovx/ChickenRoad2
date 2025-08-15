// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { apis } from "../utils/apis";
// import { toast } from "react-toastify";
// import useApi from "../hooks/useApi";
// import upi from "../assets/Payment/upi.png";

// const Payin = () => {
//   const userid = localStorage.getItem("userid");
//   const { get, post, put, del, loading, error } = useApi();
//   const tabs = [2];
//   const [type, setType] = useState(2);
//   const [typeData, setTypeData] = useState(null);
//   const [preview, setPreview] = useState("");
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       phone: "",
//       transaction_id: "",
//       amount: "",
//       screenshot: "",
//     },
//     validationSchema: Yup.object({
//       //   username: Yup.string().required("Username is required"),
//       phone: Yup.string()
//         .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
//         .required("Phone number is required"),
//       transaction_id: Yup.string().required("Transaction ID is required"),
//       // amount: Yup.number()
//       //   .typeError("Amount must be a number")
//       //   .positive("Amount must be positive")
//       //   .required("Amount is required"),
//       amount: Yup.string()
//         .matches(/^\d+$/, "Amount must contain only digits (0-9)")
//         .required("Amount is required"),

//       screenshot: Yup.string().required("Screenshot is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       // console.log("values", values);
//       const payload = {
//         ...values,
//         user_id: userid,
//         type: type,
//       };

//       try {
//         const res = await axios.post(`${apis?.add_amount}`, payload);
//         // console.log("respone", res);
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
//       formik.setFieldValue("screenshot", reader.result);
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
//   // return (
//   //   <div className="h-screen w-full overflow-scroll hide-scrollbar p-3 md:p-5">
//   //     <div className="flex justify-between items-center space-x-2 mb-4 h-14 p-2 rounded-lg">
//   //       {tabs.map((tab) => (
//   //         <button
//   //           key={tab}
//   //           onClick={() => setType(tab)}
//   //           className={`w-32 flex items-center justify-center h-12 border-accent/20 border-2 p-2 rounded ${
//   //             type === tab ? "bg-[#5F6171] text-white" : " text-white"
//   //           }`}
//   //         >
//   //           <img
//   //             className="object-fill w-20 h-10"
//   //             src={tab === 2 ? `${upi}` : "df"}
//   //             alt=""
//   //           />
//   //         </button>
//   //       ))}
//   //     </div>
//   //     <div className="grid md:grid-cols-2 p-4 mt-5 md:mt-0 md:gap-5">
//   //       {/* <div className="flex justify-between items-center space-x-2 mb-4 h-16 bg-[#4F5163] p-2 rounded-lg"> */}
//   //       {type === 2 && (
//   //         <>
//   //           <div>
//   //             {typeData ? (
//   //               <div className="flex flex-col items-center justify-center h-full">
//   //                 <img className="w-56 h-48" src={typeData?.qr_code} alt="sd" />
//   //                 <p className="text-center w-56 bg-[#5F6171] rounded-md p-2 text-white capitalize mt-5">
//   //                   {typeData?.name}
//   //                 </p>
//   //               </div>
//   //             ) : (
//   //               <p className="text-white w-full text-center">No QR found</p>
//   //             )}
//   //           </div>
//   //         </>
//   //       )}
//   //       <div className="w-full h-full mt-5 md:mt-0 p-6 col-span-1 overflow-auto bg-[#3E4464] shadow-lg rounded-lg">
//   //         {/* <h2 className="text-xl font-bold mb-4">Submit Transaction</h2> */}
//   //         <form onSubmit={formik.handleSubmit} className="space-y-4 text-white">
//   //           {/* {["username", "phone", "transaction_id", "amount"].map((field) => (
//   //             <div key={field}>
//   //               <label className="block text-[13px] font-medium capitalize">
//   //                 {field.replace("_", " ")}
//   //               </label>
//   //               <input
//   //                 type={field === "amount" ? "number" : "text"}
//   //                 name={field}
//   //                 onChange={formik.handleChange}
//   //                 onBlur={formik.handleBlur}
//   //                 value={formik.values[field]}
//   //                 className="w-full border border-white rounded px-3 py-1 mt-1"
//   //               />
//   //               {formik.touched[field] && formik.errors[field] && (
//   //                 <p className="text-red-500 text-[10px]">
//   //                   {formik.errors[field]}
//   //                 </p>
//   //               )}
//   //             </div>
//   //           ))} */}
//   //           {["username", "phone", "transaction_id", "amount"].map((field) => (
//   //             <div key={field}>
//   //               <label className="block text-[13px] font-medium capitalize">
//   //                 {field.replace("_", " ")}
//   //               </label>
//   //               <input
//   //                 type="text"
//   //                 name={field}
//   //                 onChange={(e) => {
//   //                   if (field === "amount") {
//   //                     const onlyDigits = e.target.value.replace(/\D/g, "");
//   //                     formik.setFieldValue(field, onlyDigits);
//   //                   } else {
//   //                     formik.handleChange(e);
//   //                   }
//   //                 }}
//   //                 onBlur={formik.handleBlur}
//   //                 value={formik.values[field]}
//   //                 className="w-full border border-white rounded px-3 py-1 mt-1"
//   //               />
//   //               {formik.touched[field] && formik.errors[field] && (
//   //                 <p className="text-red-500 text-[10px]">
//   //                   {formik.errors[field]}
//   //                 </p>
//   //               )}
//   //             </div>
//   //           ))}

//   //           <div>
//   //             <label className="block text-[13px] font-medium">
//   //               Upload Screenshot
//   //             </label>
//   //             <input
//   //               type="file"
//   //               accept="image/*"
//   //               onChange={handleImageUpload}
//   //               className="mt-1"
//   //             />
//   //             {formik.touched.screenshot && formik.errors.screenshot && (
//   //               <p className="text-red-500 text-[10px]">
//   //                 {formik.errors.screenshot}
//   //               </p>
//   //             )}
//   //             {preview && (
//   //               <img
//   //                 src={preview}
//   //                 alt="Preview"
//   //                 className="mt-2 h-32 object-contain border"
//   //               />
//   //             )}
//   //           </div>

//   //           <button
//   //             type="submit"
//   //             className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//   //           >
//   //             Submit
//   //           </button>
//   //         </form>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   return (
//     <div className="h-screen bg-gradient-to-br from-[#1c1e2f] to-[#2c2f4a] text-white p-4 md:p-6 overflow-scroll hide-scrollbar">
//       <div className="max-w-5xl mx-auto space-y-6">


//         {/* QR Code + Form Section */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* QR Display */}

//           {/* Form */}
//           <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-lg">
//             <form onSubmit={formik.handleSubmit} className="space-y-5">
//               {["amount"].map(
//                 (field) => (
//                   <div key={field}>
//                     <label className="block text-sm mb-1 capitalize text-gray-200">
//                       {field.replace("_", " ")}
//                     </label>
//                     <input
//                       type="text"
//                       name={field}
//                       onChange={(e) => {
//                         if (field === "amount") {
//                           const onlyDigits = e.target.value.replace(/\D/g, "");
//                           formik.setFieldValue(field, onlyDigits);
//                         } else {
//                           formik.handleChange(e);
//                         }
//                       }}
//                       onBlur={formik.handleBlur}
//                       value={formik.values[field]}
//                       placeholder={`Enter ${field.replace("_", " ")}`}
//                       className="w-full bg-[#4c5169] border border-gray-500 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {formik.touched[field] && formik.errors[field] && (
//                       <p className="text-red-400 text-xs mt-1">
//                         {formik.errors[field]}
//                       </p>
//                     )}
//                   </div>
//                 )
//               )}

//               {/* Screenshot Upload */}
//               <div>
//                 <label className="block text-sm text-gray-200 mb-1">
//                   Upload Screenshot
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="block w-full text-sm file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-indigo-600 file:text-white hover:file:from-blue-600 hover:file:to-indigo-700 transition-all"
//                 />
//                 {formik.touched.screenshot && formik.errors.screenshot && (
//                   <p className="text-red-400 text-xs mt-1">
//                     {formik.errors.screenshot}
//                   </p>
//                 )}
//                 {preview && (
//                   <img
//                     src={preview}
//                     alt="Screenshot Preview"
//                     className="mt-4 w-full max-h-40 object-contain rounded border border-white/20"
//                   />
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3 rounded-lg text-white font-bold shadow-md hover:shadow-xl transition"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   ); 

// };

// export default Payin;

import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { apis } from "../utils/apis";
import { toast } from "react-toastify";
import useApi from "../hooks/useApi";
import { FaTimes } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";

const PayinModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const userid = localStorage.getItem("userid");
  const { get } = useApi();
  const [type] = useState(2);
  const [typeData, setTypeData] = useState(null);
  const [preview, setPreview] = useState("");

  const formik = useFormik({
    // initialValues: {
    //   amount: "",
    //   screenshot: "",
    // },
    // validationSchema: Yup.object({
    //   amount: Yup.string()
    //     .matches(/^\d+$/, "Amount must contain only digits")
    //     .required("Amount is required"),
    //   screenshot: Yup.string().required("Screenshot is required"),
    // }),

    initialValues: {
      amount: "",
      utr_no: "", // renamed from screenshot
    },
    validationSchema: Yup.object({
      amount: Yup.string()
        .matches(/^\d+$/, "Amount must contain only digits")
        .required("Amount is required"),
      utr_no: Yup.string()
        .matches(/^\d+$/, "UTR number must contain only digits")
        .required("UTR number is required"), // renamed from screenshot
    }),

    onSubmit: async (values, { resetForm }) => {
      const payload = {
        ...values,
        user_id: userid,
        type,
      };

      console.log("recharge  payload:", payload);
      try {
        const res = await axios.post(`${apis?.add_amount}`, payload);
        toast.success("Recharge submitted successfully");
        resetForm();
        setPreview("");
        onClose(); // Close modal after submission
      } catch (err) {
        console.error(err);
        alert("Failed to submit form");
      }
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue("screenshot", reader.result);
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

  const fileInputRef = useRef(null);
  const [copied, setCopied] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* <div className="relative bg-[#2c2f4a] w-full max-w-80 rounded-2xl shadow-2xl p-6 text-white h-[80%]"> */}
      {/* <div className="relative bg-[#2c2f4a] w-full max-w-80 rounded-2xl shadow-2xl text-white  xxs:h-[60%] flex flex-col  "> */}
      <div className="relative bg-[#2c2f4a] w-full max-w-80 max-h-[90vh] rounded-2xl shadow-2xl text-white flex flex-col">
        {/* Close Button */}
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-300 hover:text-red-400"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold text-center mt-6 mb-2">Recharge</h2>

        {/* QR Code */}
        {/* <div className="flex-1 overflow-y-auto px-6 pb-6  flex flex-col justify-between max-h-full"> */}
        <div className="overflow-y-auto px-6 pb-6 flex-1 hide-scrollbar">
          {typeData?.qr_code && (
            <div className="flex flex-col items-center mb-4">
              <img
                src={typeData.qr_code}
                className="h-50 object-contain rounded-2xl"
                alt="QR"
              />
              <div className="flex items-center gap-2 mt-2 bg-[#5F6171] px-3 py-1 rounded">
                {/* <p className="text-sm">{typeData?.name}</p> */}
                <p
                  className="text-sm truncate max-w-[160px]"
                  title={typeData?.name}
                >
                  {typeData?.name?.slice(0, 10)}
                  {typeData?.name?.length > 10 ? "..." : ""}
                </p>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(typeData?.name || "");
                    toast.success("Copied to clipboard!", {
                      position: "top-center",
                      autoClose: 1500,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: false,
                      theme: "dark",
                    });
                  }}
                  title="Copy to clipboard"
                  className="text-white hover:text-green-400 cursor-pointer"
                >
                  <FaRegCopy size={14} />
                </button>
              </div>
            </div>
          )}

          <div className="bg-gray-400 w-full h-1"></div>
          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm mb-1 block">Amount</label>
              <input
                type="text"
                name="amount"
                value={formik.values.amount}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  formik.setFieldValue("amount", onlyDigits);
                }}
                onBlur={formik.handleBlur}
                placeholder="Enter amount"
                className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
              />
              {formik.touched.amount && formik.errors.amount && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.amount}
                </p>
              )}
            </div>

            {/* upload screen shot */}
            {/* <div>
              <label className="text-sm block mb-1">Upload Screenshot</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm file:py-2 file:px-4 file:rounded file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-indigo-600 file:text-white"
              />
              {formik.touched.screenshot && formik.errors.screenshot && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.screenshot}
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
                      formik.setFieldValue("screenshot", "");
                      formik.setTouched({ screenshot: false });
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

            {/* Utr input */}
            <div>
              <label className="text-sm block mb-1">UTR Number</label>
              <input
                type="text"
                name="utr_no"
                value={formik.values.utr_no}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ""); // remove non-digits
                  formik.setFieldValue("utr_no", value);
                }}
                onBlur={formik.handleBlur}
                placeholder="Enter UTR number"
                className="w-full px-4 py-2 rounded-lg bg-[#4c5169] text-white border border-gray-500 focus:outline-none"
              />

              {formik.touched.utr_no && formik.errors.utr_no && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.utr_no}
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

export default PayinModal;
