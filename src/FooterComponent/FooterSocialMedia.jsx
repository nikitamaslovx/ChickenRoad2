import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
  FaApple,
  FaAndroid,
} from "react-icons/fa";

const socialIcons = [
  { icon: <FaFacebookF />, url: "#" },
  { icon: <FaTelegramPlane />, url: "#" },
  { icon: <FaInstagram />, url: "#" },
  { icon: <FaTwitter />, url: "#" },
];

const FooterSocialMedia = () => {
  return (
    <div className="w-full bg-[#002c5f] py-4">
      <div className="max-w-screen-90 mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
        {/* Download Section */}
        <div className="flex items-center bg-[#00356f] px-4 py-2 rounded-full gap-3 text-white font-semibold text-sm">
          <span className="whitespace-nowrap">Download Our App</span>
          <div className="flex items-center gap-2 text-[#1d9bf0] text-lg">
            <FaAndroid />
            <FaApple />
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-[#1d9bf0] text-xl">
          {socialIcons.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-200"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterSocialMedia;
