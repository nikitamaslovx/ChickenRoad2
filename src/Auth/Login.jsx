// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import useApi from "../hooks/useApi";
// import { apis } from "../utils/apis";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";

// const Login = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   const { post } = useApi();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       mobile: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       mobile: Yup.string()
//         .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
//         .required("Phone number is required"),
//       password: Yup.string()
//         .min(4, "Password must be at least 4 characters")
//         .required("Password is required"),
//     }),
//     onSubmit: async (values, { setSubmitting, setErrors }) => {
//       try {
//         const res = await post(`${apis?.login}`, values);
//         console.log("res", res);
//         if (res?.data?.success === true) {
//           localStorage.setItem("userid", res?.data?.user_id);
//           toast.success("Login successful!");
//           navigate("/");
//         } else {
//           setErrors({ password: res?.data?.message || "Login failed" });
//         }
//       } catch (err) {
//         console.error(err);
//         setErrors({ password: "Server error" });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
//     <div className="min-h-screen flex items-center justify-center bg-mainBg p-3">
//       <form
//         onSubmit={formik.handleSubmit}
//         className="bg-white p-6 rounded shadow-md w-full max-w-xl"
//       >
//         <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
//         {/* Mobile Field */}
//         <div className="mb-4">
//           <label htmlFor="mobile" className="block text-gray-700">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             name="mobile"
//             id="mobile"
//             placeholder="Enter your phone number"
//             value={formik.values.mobile}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-3 py-2 border border-black rounded text-black placeholder-black"
//           />
//           {formik.touched.mobile && formik.errors.mobile && (
//             <p className="text-red-500 text-[10px]">{formik.errors.mobile}</p>
//           )}
//         </div>

//         {/* Password Field */}
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Enter your password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-3 py-2 border border-black rounded text-black placeholder-black"
//           />
//           {formik.touched.password && formik.errors.password && (
//             <p className="text-red-500 text-[10px]">{formik.errors.password}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={formik.isSubmitting}
//           className="w-full bg-[#4F5163] text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {formik.isSubmitting ? "Logging in..." : "Login"}
//         </button>
//         <div className="w-full flex items-center text-[13px] mt-5 justify-between">
//           <p className="text-nowrap ">Not registered ? </p>
//           <Link
//             to="/register"
//             type="button"
//             // disabled={formik.isSubmitting}
//             className="w-full text-blue-300 rounded hover:text-blue-700 transition"
//           >
//             &nbsp; Register
//           </Link>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default Login;

// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import useApi from "../hooks/useApi";
// import { apis } from "../utils/apis";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import { FaTimes } from "react-icons/fa";

// const Login = ({ isOpen, onClose, setProfileRefresher }) => {
//   if (!isOpen) return null;

//   const { post } = useApi();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       mobile: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       mobile: Yup.string()
//         .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
//         .required("Phone number is required"),
//       password: Yup.string()
//         .min(4, "Password must be at least 4 characters")
//         .required("Password is required"),
//     }),
//     onSubmit: async (values, { setSubmitting, setErrors }) => {
//       try {
//         const res = await post(`${apis?.login}`, values);
//         if (res?.data?.success === true) {
//           localStorage.setItem("userid", res?.data?.user_id);
//           setProfileRefresher(true); 
//           toast.success("Login successful!");
//           onClose();
//           navigate("/");
//         } else {
//           setErrors({ password: res?.data?.message || "Login failed" });
//           console.log(res);
//         }
//       } catch (err) {
//         console.error(err);
//         setErrors({ password: "Server error" });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
//       <div className="relative bg-[#25283D] w-full max-w-80 rounded-2xl shadow-2xl p-6 text-white">
//         {/* Close button */}
//         <button
//           className="absolute top-2 right-4 text-gray-300 hover:text-red-400 transition cursor-pointer"
//           onClick={onClose}
//         >
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-2xl font-bold text-center mb-6 text-white">
//           Login
//         </h2>

//         <form onSubmit={formik.handleSubmit} className="space-y-4">
//           {/* Mobile Field */}
//           <div>
//             <label
//               htmlFor="mobile"
//               className="block mb-1 text-sm text-gray-300"
//             >
//               Phone Number
//             </label>
//             {/* <input
//               type="text"
//               name="mobile"
//               id="mobile"
//               placeholder="Enter your phone number"
//               value={formik.values.mobile}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="w-full px-3 py-2 rounded-lg bg-[#1f2235] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
//             /> */}
//             <input
//               type="text"
//               name="mobile"
//               id="mobile"
//               placeholder="Enter your phone number"
//               value={formik.values.mobile}
//               onChange={(e) => {
//                 const onlyDigits = e.target.value.replace(/\D/g, "");
//                 if (onlyDigits.length <= 10) {
//                   e.target.value = onlyDigits;
//                   formik.handleChange(e);
//                 }
//               }}
//               onBlur={formik.handleBlur}
//               maxLength={10}
//               inputMode="numeric"
//               className="w-full px-3 py-2 rounded-lg bg-[#1f2235] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
//             />
//             {formik.touched.mobile && formik.errors.mobile && (
//               <p className="text-red-400 text-xs mt-1">
//                 {formik.errors.mobile}
//               </p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block mb-1 text-sm text-gray-300"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               placeholder="Enter your password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="w-full px-3 py-2 rounded-lg bg-[#1f2235] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
//             />
//             {formik.touched.password && formik.errors.password && (
//               <p className="text-red-400 text-xs mt-1">
//                 {formik.errors.password}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={formik.isSubmitting}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 text-white font-semibold py-2 rounded-lg"
//           >
//             {formik.isSubmitting ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* Link to Register */}
//       </div>
//     </div>
//   );
// };

// export default Login;



import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useApi from "../hooks/useApi";
import { apis } from "../utils/apis";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const Login = ({ isOpen, onClose, setProfileRefresher, profileHandler }) => {
  if (!isOpen) return null;

  const { post } = useApi();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await post(`${apis?.login}`, values);
        console.log("res of login:", res);
        if (res?.data?.success === true) {
          localStorage.setItem("userid", res?.data?.user_id);
          // const userid = localStorage.getItem("userid");
          // setProfileRefresher(true);
          // toast.success("Login successful!");
          // profileHandler(userid);

          const userid = res?.data?.user_id;

          toast.success("Login successful!");

          // ✅ THIS fetches the fresh profile data immediately
          if (typeof profileHandler === "function") {
            profileHandler(userid);
          }
          onClose();
          navigate("/");
        } else {
          setErrors({ password: res?.data?.message || "Login failed" });
          console.log(res);
        }
      } catch (err) {
        console.error(err);
        setErrors({ password: "Server error" });
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
          Login
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Mobile Field */}
          <div>
            <label
              htmlFor="mobile"
              className="block mb-1 text-sm text-gray-300"
            >
              Phone Number
            </label>
            {/* <input
              type="text"
              name="mobile"
              id="mobile"
              placeholder="Enter your phone number"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 rounded-lg bg-[#1f2235] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            /> */}
            <input
              type="text"
              name="mobile"
              id="mobile"
              placeholder="Enter your phone number"
              value={formik.values.mobile}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                if (onlyDigits.length <= 10) {
                  e.target.value = onlyDigits;
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              maxLength={10}
              inputMode="numeric"
              className="w-full px-3 py-2 rounded-lg bg-[#1f2235] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.mobile}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 rounded-lg bg-[#1f2235] border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition duration-300 text-white font-semibold py-2 rounded-lg"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to Register */}
      </div>
    </div>
  );
};

export default Login;
