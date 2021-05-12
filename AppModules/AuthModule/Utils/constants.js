export const AUTH_CONSTANTS = {
  NO_FINGERPRINT:
    'Authentication could not start because Fingerprint Scanner has no enrolled fingers',
  NO_SENSOR_AVAILABLE:
    'Authentication could not start because Fingerprint Scanner is not available on the device',
  BIOMETRICS: 'Biometrics',
  USER_CANCEL: 'UserCancel: Authentication was canceled by the user - e.g. the user tapped Cancel in the dialog',
};

export const GOOGLE_SIGN_IN_SCOPES = {
  EMAIL: 'https://www.googleapis.com/auth/userinfo.email',
  PROFILE: 'https://www.googleapis.com/auth/userinfo.profile'
};
