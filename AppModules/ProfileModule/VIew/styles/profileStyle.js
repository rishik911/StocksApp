import {StyleSheet} from 'react-native';

export const ProfileStyle = StyleSheet.create({
  image: {
    height: 250,
    width: 250,
    borderRadius: 250 / 2,
    top: 50,
  },
  profileView: {
    top: 80,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonStyle: {
    top: 30,
    alignItems: 'center',
    width: 150,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e4eff5',
  },
});
