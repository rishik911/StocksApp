import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Animated, TouchableOpacity} from 'react-native';
import {logoutUserAction} from '../../AuthModule/Redux/AuthActions';
import {connect, useDispatch} from 'react-redux';
import {isValidElement} from '../../../MyApp/Utils/helpers';
import {ProfileStyle} from './styles/profileStyle';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Profile = props => {
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [spring, setSpring] = useState(new Animated.Value(0));
  const [springOpacity, setSpringOpacity] = useState(new Animated.Value(0));
  useEffect(() => {
    renderAnimations();
    if (isValidElement(props.userData)) {
      setUserName(props.userData.name);
      setImage(props.userData.photo);
      setEmail(props.userData.email);
    }
  }, [props]);
  const dispatch = useDispatch();

  const renderAnimations = () => {
    Animated.parallel([
      Animated.spring(spring, {
        toValue: 1,
        friction: 5,
        tension: 15,
        velocity: 20,
        useNativeDriver: true,
      }),
      Animated.timing(springOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderProfileImage = () => {
    const springValue = {
      transform: [{scale: spring}],
      opacity: springOpacity,
    };
    return (
      <View>
        <Animated.Image
          style={[ProfileStyle.image, springValue]}
          source={
            isValidElement(image) ? {uri: image} : require('../profile.jpg')
          }
        />
      </View>
    );
  };
  const renderProfileDetails = () => {
    return (
      <View style={ProfileStyle.profileView}>
        <TextInput
          style={ProfileStyle.textStyle}
          editable={false}
          value={userName}
        />
        <TextInput
          style={ProfileStyle.textStyle}
          editable={false}
          value={email}
        />
        <TouchableOpacity
          style={ProfileStyle.buttonStyle}
          onPress={handleLogout}>
          <Text style={ProfileStyle.textStyle}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      dispatch(logoutUserAction());
      props.navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={ProfileStyle.mainContainer}>
      {renderProfileImage()}
      {renderProfileDetails()}
    </View>
  );
};

const mapStateToProps = state => ({
  userData: state.authReducer.userData,
});

export default connect(mapStateToProps)(Profile);
