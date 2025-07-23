// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import useApi from "../hooks/useApi";
// import { apis } from "../utils/apis";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaTimes,
//   FaLock,
//   FaPhoneAlt,
//   FaChevronDown,
//   FaCog,
// } from "react-icons/fa";

// const Register = ({
//   isOpen, onClose
// }) => {
// if (!isOpen) return null;

//   const { post } = useApi();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: Yup.object({
//       // email: Yup.string()
//       //   .email("Invalid email address")
//       //   .required("Email is required"),
//       phone: Yup.string()
//         .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
//         .required("Phone number is required"),
//       password: Yup.string()
//         .min(4, "Password must be at least 4 characters")
//         .required("Password is required"),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), null], "Passwords must match")
//         .required("Confirm Password is required"),
//     }),
//     onSubmit: async (values, { setSubmitting, setErrors }) => {
//       try {
//         const payload = {
//           email: values.email,
//           phone: values.phone,
//           password: values.password,
//         };

//         const res = await post(`${apis?.register}`, JSON.stringify(payload));
//         const data = res?.data;
//         if (data?.success === true) {
//           toast.success("Registration successful!");
//           navigate("/login");
//         } else {
//           toast.error(data?.message || "Registration failed");
//         }
//       } catch (err) {
//         console.error(err);
//         setErrors({ email: "Server error" });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="fixed inset-0 w-full z-50 flex items-center justify-center bg-blur bg-opacity-10 backdrop-blur-sm px-2">
//     <div className="min-h-screen flex items-center justify-center bg-mainBetBg p-3">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-xl"
//       >
//         <h2 className="text-xl font-semibold text-center mb-4">Register</h2>
//             <button
//                     className="absolute top-2 right-2 text-white z-[9999]"
//                     onClick={() => {
//                       // console.log("Close button clicked");
//                       onClose();
//                     }}
//                   >
//                     <FaTimes />
//                   </button>
//         {["email", "phone", "password", "confirmPassword"].map((field) => (
//           <div className="mb-4" key={field}>
//             <label htmlFor={field} className="block text-gray-700 capitalize">
//               {field === "confirmPassword" ? "Confirm Password" : field}
//             </label>
//             <input
//               type={
//                 field === "password" || field === "confirmPassword"
//                   ? "password"
//                   : "text"
//               }
//               name={field}
//               id={field}
//               placeholder={`Enter your ${
//                 field === "confirmPassword" ? "confirm password" : field
//               }`}
//               value={formik.values[field]}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="w-full px-3 py-2 border border-black rounded text-black placeholder-black"
//             />
//             {formik.touched[field] && formik.errors[field] && (
//               <p className="text-red-500 text-[10px]">{formik.errors[field]}</p>
//             )}
//           </div>
//         ))}

//         <button
//           type="submit"
//           disabled={formik.isSubmitting}
//           className="w-full bg-[#4F5163] text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {formik.isSubmitting ? "Registering..." : "Register"}
//         </button>
//          <div className="w-full flex items-center text-[13px] mt-5 justify-between">
//           <p className="text-nowrap ">Already registered ? </p>
//           <Link
//             to="/login"
//             type="button"
//             // disabled={formik.isSubmitting}
//             className="w-full text-blue-300 rounded hover:text-blue-700 transition"
//           >
//             &nbsp; Login
//           </Link>
//         </div>
//       </form>
     
//     </div>
//     </div>
//   );
// };

// export default Register;


import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useApi from "../hooks/useApi";
import { apis } from "../utils/apis";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Register = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { post } = useApi();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const payload = {
          email: values.email,
          phone: values.phone,
          password: values.password,
        };

        const res = await post(`${apis?.register}`, JSON.stringify(payload));
        console.log("res of sign up:",res)
        const data = res?.data;
        if (data?.success === true) {
          localStorage.setItem("userid", res?.data?.user_id);
          toast.success("Registration successful!");
          onClose();
          navigate("/");
        } else {
          toast.error(data?.message || "Registration failed");
        }
      } catch (err) {
        console.error(err);
        setErrors({ email: "Server error" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-[#25283D] w-full max-w-80 rounded-2xl shadow-2xl p-6 text-white">
        {/* Close button */}
        <button
          className="absolute top-2 right-4 text-gray-300 hover:text-red-400 transition cursor-pointer"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Create an Account
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {["email", "phone", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block mb-1 capitalize text-sm text-gray-300"
              >
                {field === "confirmPassword" ? "Confirm Password" : field}
              </label>
              <input
                type={field.includes("password") ? "password" : "text"}
                id={field}
                name={field}
                placeholder={`Enter your ${
                  field === "confirmPassword" ? "confirm password" : field
                }`}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2 rounded-lg bg-[#1f2235] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
              {formik.touched[field] && formik.errors[field] && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors[field]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 text-white font-semibold py-2 rounded-lg"
          >
            {formik.isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
