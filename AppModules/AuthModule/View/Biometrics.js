import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform,
} from 'react-native';

import FingerprintScanner from 'react-native-fingerprint-scanner';

class BiometricPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessageLegacy: undefined,
      biometricLegacy: undefined,
    };
  }

  componentDidMount() {
    if (this.requiresLegacyAuthentication()) {
      this.authLegacy();
    } else {
      this.authCurrent();
    }
  }

  componentWillUnmount = () => {
    FingerprintScanner.release();
  };

  requiresLegacyAuthentication() {
    return Platform.Version < 23;
  }

  authCurrent() {
    FingerprintScanner.authenticate({title: 'Log in with Biometrics'})
      .then(() => {
        this.props.onAuthenticate();
      })
      .catch(() => {
        this.props.onFailure();
      });
  }

  authLegacy() {
    FingerprintScanner.authenticate({
      onAttempt: this.handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        this.props.handlePopupDismissedLegacy();
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch(error => {
        this.setState({
          errorMessageLegacy: error.message,
          biometricLegacy: error.biometric,
        });
      });
  }

  handleAuthenticationAttemptedLegacy = error => {
    this.setState({errorMessageLegacy: error.message});
  };

  renderLegacy() {
    const {errorMessageLegacy, biometricLegacy} = this.state;
    const { handlePopupDismissedLegacy} = this.props;

    return (
      <View>
        <View>
          <Text>Biometric{'\n'}Authentication</Text>
          <Text>
            {errorMessageLegacy ||
              `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
          </Text>

          <TouchableOpacity onPress={handlePopupDismissedLegacy}>
            <Text>BACK TO MAIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render = () => {
    if (this.requiresLegacyAuthentication()) {
      return this.renderLegacy();
    }
    return null;
  };
}

BiometricPopup.propTypes = {
  onAuthenticate: PropTypes.func.isRequired,
  handlePopupDismissedLegacy: PropTypes.func,
  style: ViewPropTypes.style,
  onFailure: PropTypes.func.isRequired,
};

export default BiometricPopup;
