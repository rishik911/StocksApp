import React, {Component} from 'react';
import {ImageBackground, Image, TouchableOpacity, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {connect} from 'react-redux';
import {getUserDataAction} from '../Redux/AuthActions';
import {isValidElement} from '../../../MyApp/Utils/helpers';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import BiometricPopup from './Biometrics';
import {LoginStyles} from './styles/LoginStyles';

class Login extends Component {
  state = {
    isLoggedIn: false,
    showErrorView: false,
    showBiometrics: false,
    sensorStatus: '',
    showNoBiometrics: false,
  };
  static getDerivedStateFromProps(props, state) {
    if (
      isValidElement(props.isLoggedIn) &&
      props.isLoggedIn !== state.isLoggedIn
    ) {
      return {
        ...state,
        isLoggedIn: props.isLoggedIn,
      };
    }
  }

  componentDidMount() {
    GoogleSignin.configure();
    FingerprintScanner.isSensorAvailable()
      .then(success => {
        this.setState({sensorStatus: success, showBiometrics: true});
      })
      .catch(error =>
        this.setState({sensorStatus: error.message, showNoBiometrics: true}),
      );
  }

  async googleSignIn() {
    const hasPlayServices = await GoogleSignin.hasPlayServices();
    if (hasPlayServices) {
      try {
        const token = await GoogleSignin.signIn();
        if (isValidElement(token)) {
          const userData = await GoogleSignin.getCurrentUser();
          if (isValidElement(userData) && isValidElement(userData.user)) {
            this.props.getUserDataAction(userData.user);
          }
        }
      } catch (e) {
        let code = e.code;
        switch (code) {
          case statusCodes.IN_PROGRESS:
            alert('SIGN IN GOING ON');
            return;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            alert('NO PLAY SERVICES FOUND');
            return;
          case statusCodes.SIGN_IN_CANCELLED:
            alert('SIGN IN CANCELLED BY USER');
            return;
          case statusCodes.SIGN_IN_REQUIRED:
            alert('PLEASE SIGN IN');
            return;
          default:
            console.log(e);
        }
      }
    }
  }
  authenticateBiometric() {
    this.setState({showBiometric: false});
    this.props.navigation.navigate('StocksScreen');
  }

  renderErrorView() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({showErrorView: false, showBiometrics: true});
        }}
        style={LoginStyles.imageView}>
        <Image
          style={LoginStyles.errorImage}
          source={require('../Utils/fingerprints.jpg')}
        />
      </TouchableOpacity>
    );
  }

  renderBiometricView() {
    return (
      <BiometricPopup
        onFailure={() =>
          this.setState({showBiometrics: false, showErrorView: true})
        }
        onAuthenticate={() => this.authenticateBiometric()}
      />
    );
  }

  renderNoBiometrics() {
    return (
      <Text style={LoginStyles.noBiometricsText}>
        Please add a fingerprint and relaunch the app
      </Text>
    );
  }

  render() {
    const {isLoggedIn} = this.state;
    return (
      <ImageBackground
        style={LoginStyles.backgroundImage}
        source={require('../Utils/background.jpg')}>
        {!isLoggedIn && (
          <GoogleSigninButton
            style={LoginStyles.googleButtonStyle}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={() => this.googleSignIn()}
          />
        )}
        {isLoggedIn && this.state.showBiometrics && this.renderBiometricView()}
        {isLoggedIn && this.state.showErrorView && this.renderErrorView()}
        {isLoggedIn && this.state.showNoBiometrics && this.renderNoBiometrics()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.authReducer.userData,
  isLoggedIn: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = {
  getUserDataAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
