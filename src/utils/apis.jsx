// export const baseUrlUsaWin = "https://root.chicken-road.cash";
export const baseUrlUsaWin = "http://localhost:3001";
// export const referral_url = "https://root.chicken-road.cash";
export const referral_url = "https://chiekenroads2.club";
export const configModalUsaWin = `${baseUrlUsaWin}/api/`;
export const configModalApk = `${baseUrlUsaWin}/apk/`;
export const configModalBanner = `${baseUrlUsaWin}/public/api/`;

export const apis = {
  chickenMultplier: `${configModalUsaWin}multiplier`,
  chickenCashout: `${configModalUsaWin}cashout`,
  chickenbet: `${configModalUsaWin}bet`,
  login: `${configModalUsaWin}login`,
  register: `${configModalUsaWin}register`,
  profile: `${configModalUsaWin}profile/`,
  updateProfile: `${configModalUsaWin}update_profile`,
  betHisotry: `${configModalUsaWin}bet_history?user_id=`,
  getPaymentMethod: `${configModalUsaWin}adminMethodPayment?type=`,
  add_amount: `${configModalUsaWin}add_amount`,
  withdrawal_request: `${configModalUsaWin}withdrawal_request`,
  avatar_request: `${configModalUsaWin}avatar_list`,
  avatarUpdate_request: `${configModalUsaWin}update_avatar?user_id=`,
  gameRule_request: `${configModalUsaWin}getGameRules`,
  deposit_history: `${configModalUsaWin}payinHistory?user_id=`,
  withdraw_history: `${configModalUsaWin}withdrawHistory?user_id=`,
  download_apk: `${configModalApk}chickenroad.apk`,
  banner_image: `${configModalBanner}getBanners`,
  bet_value: `${configModalBanner}bet_values`,
};