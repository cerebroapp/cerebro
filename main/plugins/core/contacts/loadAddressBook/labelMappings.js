/*
 * There is a list of mappings for mac constants to js object keys.
 * List of needed constants took here:
 * https://developer.apple.com/library/mac/documentation/UserExperience/Reference/AddressBook/Miscellaneous/AddressBook_Constants/#//apple_ref/doc/constant_group/Instant_Messaging_Keys
 */

/**
 * Mapping of mac generic multivalue list labels to js keys
 * @type {Object}
 */
const defaultLabels = {
  other: 'kABOtherLabel',
  mobileme: 'kABMobileMeLabel',
}

/**
 * Mapping of mac url labels to js object keys
 * @type {Object}
 */
export const urlLabels = {
  ...defaultLabels,
  homepage: 'kABHomePageLabel',
}

/**
 * Mapping of mac messaging services constants to js keys
 * @type {Object}
 */
export const socialProfileKeys = {
  twitter: 'kABSocialProfileServiceTwitter',
  facebook: 'kABSocialProfileServiceFacebook',
  myspace: 'kABSocialProfileServiceMySpace',
  linkedin: 'kABSocialProfileServiceLinkedIn',
  flickr: 'kABSocialProfileServiceFlickr',
  sinaWeibo: 'kABSocialProfileServiceSinaWeibo',
  tencentWeibo: 'kABSocialProfileServiceTencentWeibo'
}

/**
 * Mapping of mac messaging services constants to js keys
 * @type {Object}
 */
export const serviceKeys = {
  aim: 'kABInstantMessageServiceAIM',
  facebook: 'kABInstantMessageServiceFacebook',
  gaduGadu: 'kABInstantMessageServiceGaduGadu',
  googleTalk: 'kABInstantMessageServiceGoogleTalk',
  icq: 'kABInstantMessageServiceICQ',
  jabber: 'kABInstantMessageServiceJabber',
  msn: 'kABInstantMessageServiceMSN',
  qq: 'kABInstantMessageServiceQQ',
  skype: 'kABInstantMessageServiceSkype',
  yahoo: 'kABInstantMessageServiceYahoo'
}

/**
 * Mapping of mac messaging services labels to js keys
 * @type {Object}
 */
export const serviceLabels = {
  ...defaultLabels,
  work: 'kABAIMWorkLabel',
  home: 'kABAIMHomeLabel'
}

/**
 * Mapping of mac address keys to js object keys
 * @type {Object}
 */
export const addressFields = {
  street: 'kABAddressStreetKey',
  city: 'kABAddressCityKey',
  state: 'kABAddressStateKey',
  zip: 'kABAddressZIPKey',
  country: 'kABAddressCountryKey',
  countryCode: 'kABAddressCountryCodeKey'
}

/**
 * Mapping of mac address labels to js object keys
 * @type {Object}
 */
export const addressLabels = {
  ...defaultLabels,
  home: 'kABAddressHomeLabel',
  work: 'kABAddressWorkLabel'
}

/**
 * Mapping of mac email labels to js object keys
 * @type {Object}
 */
export const emailLabels = {
  ...defaultLabels,
  work: 'kABEmailWorkLabel',
  home: 'kABEmailHomeLabel'
}

/**
 * Mapping of mac phone labels to js object keys
 * @type {Object}
 */
export const phoneLabels = {
  ...defaultLabels,
  work: 'kABPhoneWorkLabel',
  home: 'kABPhoneHomeLabel',
  iphone: 'kABPhoneiPhoneLabel',
  mobile: 'kABPhoneMobileLabel',
  main: 'kABPhoneMainLabel',
  home_fax: 'kABPhoneHomeFAXLabel',
  work_fax: 'kABPhoneWorkFAXLabel',
  pager: 'kABPhonePagerLabel'
}
