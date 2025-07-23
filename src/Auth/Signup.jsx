import { useState } from "react";
import {
  FaTimes,
  FaLock,
  FaPhoneAlt,
  FaChevronDown,
  FaCog,
} from "react-icons/fa";

import CardImage from "../assets/Signup/cardImageSignup.png";
import Coin from "../assets/Signup/coinImageSignup.png";
import Welcome from "../assets/Signup/homeSignupCenter.png";

const SignupModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [phone, setPhone] = useState("");
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const [currency, setCurrency] = useState("INR");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const currencies = [
    { code: "INR" },
    { code: "USD" },
    { code: "EUR" },
    { code: "GBP" },
    { code: "JPY" },
    { code: "RUB" },
  ];

  const getCurrencyIcon = (code) => {
    const icons = {
      INR: "💴",
      USD: "💴",
      EUR: "💴",
      GBP: "💴",
      JPY: "💴",
      RUB: "💴",
    };
    return icons[code] || "💰";
  };
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const countryCodes = [
    { code: "+91", label: "🇮🇳" },
    { code: "+1", label: "🇺🇸" },
    { code: "+44", label: "uk" },
    { code: "+61", label: "🇦🇺" },
    { code: "+81", label: "🇯🇵" },
    { code: "+49", label: "Gr" },
  ];

  return (
    <div className="fixed inset-0 w-full z-50 flex items-center justify-center bg-blur bg-opacity-10 backdrop-blur-sm px-2">
      <div className="relative flex items-center justify-center gap-6 w-full">
        {/* Left Images - Hidden on mobile */}

        <img
          src={Welcome}
          alt="Card"
          className="w-52 h-auto object-contain animate-floatLeft hidden sm:block absolute z-50  top-[-60px]"
        />

        {/* Form Box */}
        {/* <div className="bg-mainBlue text-white w-[90vw] sm:w-[50vw] p-4 sm:p-6 rounded-lg relative shadow-xl items-center"> */}
        <div className="bg-mainBlue text-white w-full max-w-[800px] p-4 sm:p-6 rounded-lg relative shadow-xl items-center">
          <img
            src={CardImage}
            alt="Card"
            className="w-24 h-auto md:w-32 object-contain animate-floatLeft hidden sm:block absolute z-50 left-0 -top-10"
          />
          <img
            src={Coin}
            alt="Coin"
            className="w-16 h-auto md:w-20 object-contain animate-floatRight hidden sm:block absolute z-50  left-0 -bottom-10"
          />
          <button
            className="absolute top-2 right-2 text-white z-[9999]"
            onClick={() => {
              // console.log("Close button clicked");
              onClose();
            }}
          >
            <FaTimes />
          </button>

          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
            Welcome to Chicken Road!
          </h2>

          <div className="grid grid-cols-1 mb-4">
            <button className="bg-hoverColor px-4 py-2 rounded-t-md font-medium flex items-center justify-center gap-2 text-sm sm:text-base">
              <FaPhoneAlt />
              VIA MOBILE PHONE
            </button>
          </div>

          {/* Phone + Currency */}
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <div className="relative">
              <select
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="bg-boxColor text-white text-sm outline-none px-3 py-2 rounded"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.label} ({country.code})
                  </option>
                ))}
              </select>
            </div>

            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="XXXXXX XXXXX"
              className="flex-0 px-4 py-2 rounded bg-boxColor placeholder-selectedColor outline-none"
            />

            <div className="relative w-full sm:w-100">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="w-full flex items-center justify-between bg-boxColor text-white px-3 py-2 rounded"
              >
                <span className="flex items-center gap-2">
                  {getCurrencyIcon(currency)} {currency}
                </span>
                <FaChevronDown className="text-xs ml-1" />
              </button>

              {showCurrencyDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-boxColor rounded shadow-lg">
                  {currencies.map((c) => (
                    <div
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setShowCurrencyDropdown(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-blue-700 cursor-pointer text-white text-sm"
                    >
                      <span>{getCurrencyIcon(c.code)}</span>
                      {c.code}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="flex items-center bg-boxColor px-3 py-2 rounded mb-3">
            <FaLock className="text-gray-300 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-white placeholder-selectedColor font-semibold"
            />
          </div>

          {/* Checkbox */}
          <label className="flex gap-2 px-3 py-3 bg-boxColor rounded text-sm font-semibold text-white w-full justify-start sm:justify-center">
            <input type="checkbox" className="w-4 h-4 accent-blue-500" />
            <span>
              I confirm that I am of legal age and accept the{" "}
              <a href="#" className="text-blue-300 underline">
                website rules
              </a>
            </span>
          </label>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4 sm:gap-0">
            <div className="flex items-center font-sm font-bold text-white cursor-pointer hover:underline">
              <FaCog className="w-8 h-8 p-2 bg-iconBackground rounded-full text-white mr-2 " />
              Add promo code
            </div>

            <button className="w-full sm:w-40 h-[38px] bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-full transition duration-200 text-center">
              START GAME
            </button>
          </div>
          <img
            src={Coin}
            alt="Coin"
            className="w-16 h-auto md:w-20 object-contain animate-floatRight hidden sm:block absolute right-4 -top-10"
          />
          <img
            src={CardImage}
            alt="Card"
            className="w-24 h-auto md:w-32 object-contain animate-floatRight hidden sm:block absolute -right-10 -bottom-25"
          />
        </div>

        {/* Right Images - Hidden on mobile */}
      </div>
    </div>
  );
};

export default SignupModal;
