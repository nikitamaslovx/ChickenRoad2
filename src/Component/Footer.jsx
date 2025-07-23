import React from 'react'
import FooterHeader from '../FooterComponent/FooterHeader'
import FooterNav from '../FooterComponent/FooterNav';
import FooterPayment from '../FooterComponent/FooterPayment';
import FooterSocialMedia from '../FooterComponent/FooterSocialMedia';
export default function Footer() {
  return (
    <div>
      <FooterHeader />
      <FooterNav />
      <FooterPayment />
      <FooterSocialMedia />
    </div>
  );
}
