import React from "react";

const FooterNav = () => {
  const navItems = [
    "ABOUT US",
    "RULES",
    "CONTACT US",
    "CHICKEN ROAD GUIDEBOOK",
  ];

  return (
    <div className="w-full py-2 ">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="text-textblue font-bold text-sm text-center "
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
