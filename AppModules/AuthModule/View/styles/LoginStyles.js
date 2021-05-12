import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

export const LoginStyles = StyleSheet.create({
  googleButtonStyle: {
    width: width / 1.2,
    height: 50,
    borderRadius: 6,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  errorImage: {
    width: width / 1.5,
    //position: 'absolute',
    alignSelf: 'center',
    height: 200,
    borderRadius: 50,
  },
  imageView: {
    flex : 1,
    position: 'absolute',
    justifyContent: 'center',
  },
  noBiometricsText :{
    color : 'white',
    fontSize : 20 ,
    fontWeight :'bold'
  }
});
