import React, {Component} from 'react';
import {Animated, Image, TouchableOpacity} from 'react-native';
import Voice from '@react-native-community/voice';
import {isValidElement} from '../../../MyApp/Utils/helpers';
import {getRequiredRange} from '../Utils/helpers';
import {VoiceStyles} from './styles/voice';

class Speech extends Component {
  constructor(props) {
    super(props);
    Voice.onSpeechResults = this.speechResults.bind(this);
    Voice.onSpeechStart = this.speechStarted.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
  }

  state = {
    voiceResult: null,
    isVoiceStarted: false,
    buttonSpring: new Animated.Value(0),
    buttonOpacity: new Animated.Value(0),
    radius: new Animated.Value(0),
  };
  componentDidMount() {
    this.renderAnimation();
  }
  renderAnimation = () => {
    Animated.parallel([
      Animated.spring(this.state.buttonSpring, {
        toValue: 1,
        friction: 4,
        tension: 5,
        velocity: 25,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.buttonOpacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
    ]).start();
  };
  onSpeechEnd() {
    this.setState({isVoiceStarted: false});
  }
  speechStarted() {
    this.setState({isVoiceStarted: true});
  }
  speechResults(e) {
    this.setState({voiceResult: getRequiredRange(e)});
  }

  async startVoice() {
    this.setState({
      voiceResult: null,
      isVoiceStarted: false,
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.log(e);
    }
  }

  removeListeners() {
    this.props.speechResult(this.state.voiceResult);
    Voice.removeAllListeners();
    this.setState({
      voiceResult: null,
      isVoiceStarted: false,
    });
  }
  renderRadiusAnimation() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.radius, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.radius, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: isValidElement(this.state.voiceResult) ? -1 : 1,
      },
    ).start();
  }

  render() {
    const animatedRadius = this.state.radius.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(37, 150, 190)', 'rgb(128,57,30)'],
    });
    const radiusStyle = {
      borderColor: animatedRadius,
      opacity: 0.5,
    };
    const imageAnimated = {
      transform: [{scale: this.state.buttonSpring}],
      opacity: this.state.buttonOpacity,
    };
    return (
      <Animated.View style={[VoiceStyles.viewStyle, radiusStyle]}>
        <TouchableOpacity
          onPress={() => this.startVoice()}
          style={VoiceStyles.container}>
          <Animated.Image
            source={require('../Images/mic.png')}
            style={[VoiceStyles.mainContainer, imageAnimated]}
          />
          {isValidElement(this.state.voiceResult) && this.removeListeners()}
          {isValidElement(this.state.voiceResult) &&
            this.renderRadiusAnimation()}
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default Speech;
