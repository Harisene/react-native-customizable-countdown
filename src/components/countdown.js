//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Easing, AppState} from 'react-native';
import propTypes from 'prop-types';
// create a component
class CountDown extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);

    const {
      initialSeconds,
      backgroundColor,
      hoursBackgroundStyle,
      minutesBackgroundStyle,
      secondsBackgroundStyle,
      digitColor,
      gap,
      borderRadius,
      digitFontSize,
      digitFontWeight,
      hoursDigitFontStyle,
      minutesDigitFontStyle,
      secondsDigitFontStyle,
      textColor,
      textFontSize,
      textFontWeight,
      hoursTextFontStyle,
      minutesTextFontStyle,
      secondsTextFontStyle,
      textPosition,
    } = this.props;

    this.propStyleForHoursBackground = {
      backgroundColor,
      borderRadius,
      ...hoursBackgroundStyle,
    };

    this.propStyleForMinutesBackground = {
      backgroundColor,
      marginLeft: gap,
      borderRadius,
      ...minutesBackgroundStyle,
    };

    this.propStyleForSecondsBackground = {
      backgroundColor,
      marginLeft: gap,
      borderRadius,
      ...secondsBackgroundStyle,
    };

    this.propStyleForHoursDigit = {
      color: digitColor,
      fontSize: digitFontSize,
      fontWeight: digitFontWeight,
      ...hoursDigitFontStyle,
    };

    this.propStyleForMinutesDigit = {
      color: digitColor,
      fontSize: digitFontSize,
      fontWeight: digitFontWeight,
      ...minutesDigitFontStyle,
    };

    this.propStyleForSecondsDigit = {
      color: digitColor,
      fontSize: digitFontSize,
      fontWeight: digitFontWeight,
      ...secondsDigitFontStyle,
    };

    this.propStyleForHoursText = {
      color: textColor,
      fontWeight: textFontWeight,
      fontSize: textFontSize,
      ...hoursTextFontStyle,
    };

    this.propStyleForMinutesText = {
      color: textColor,
      fontWeight: textFontWeight,
      fontSize: textFontSize,
      ...minutesTextFontStyle,
    };

    this.propStyleForSecondsText = {
      color: textColor,
      fontWeight: textFontWeight,
      fontSize: textFontSize,
      ...secondsTextFontStyle,
    };

    if (textPosition === 'top') {
      this.flexDirection = 'column-reverse';
    } else {
      this.flexDirection = 'column';
    }

    this.state = {
      initialSeconds,
      seconds: this.calculateSeconds(initialSeconds),
      minutes: this.calculateMinutes(initialSeconds),
      hours: this.calculateHours(initialSeconds),
    };

    this.appState = AppState.currentState;
    this.reset = false;
  }

  calculateSeconds = initialSeconds => {
    return initialSeconds % 60;
  };

  calculateMinutes = initialSeconds => {
    return Math.floor(initialSeconds / 60) % 60;
  };

  calculateHours = initialSeconds => {
    return Math.floor(Math.floor(initialSeconds / 60) / 60);
  };

  resetCountDown = () => {
    clearInterval(this.timer);

    if (this.props.animateSeparator && this.props.showSeparator) {
      this.startAnimate();
    }

    const {initialSeconds} = this.state;

    this.setState(
      {
        seconds: this.calculateSeconds(initialSeconds),
        minutes: this.calculateMinutes(initialSeconds),
        hours: this.calculateHours(initialSeconds),
      },
      () => this.setTimer(),
    );
  };

  addSeconds = userSeconds => {
    let {seconds, minutes, hours} = this.state;
    const initialSeconds = userSeconds + seconds + minutes * 60 + hours * 3600;

    this.setState({
      seconds: this.calculateSeconds(initialSeconds),
      minutes: this.calculateMinutes(initialSeconds),
      hours: this.calculateHours(initialSeconds),
    });
  };

  deductSeconds = userSeconds => {
    let {seconds, minutes, hours} = this.state;
    const initialSeconds = seconds + minutes * 60 + hours * 3600 - userSeconds;
    this.setState({
      seconds: this.calculateSeconds(initialSeconds),
      minutes: this.calculateMinutes(initialSeconds),
      hours: this.calculateHours(initialSeconds),
    });
  };

  setTimer = () => {
    this.timer = setInterval(() => {
      let {seconds, minutes, hours} = this.state;

      if (seconds === 0 && minutes !== 0) {
        minutes--;
        seconds = 59;
      } else if (seconds === 0 && minutes === 0 && hours === 0) {
        if (this.props.onTimeOut) {
          this.props.onTimeOut();
        }
        clearInterval(this.timer);
      } else if (seconds === 0 && minutes === 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      } else {
        seconds--;
      }
      this.setState({seconds, minutes, hours});
    }, 1000);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.seconds !== prevState.seconds) {
      if (this.props.onChange)
        this.props.onChange(
          this.state.hours,
          this.state.minutes,
          this.state.seconds,
        );
    }

    if (this.props.pause !== prevProps.pause) {
      if (this.props.pause === true) {
        clearInterval(this.timer);
      } else if (this.props.pause === false) this.setTimer();
      this.startAnimate();
    }
  }

  startAnimate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start(() => {
      const {seconds, minutes, hours} = this.state;
      if ((seconds || minutes || hours) && !this.props.pause)
        this.startAnimate();
    });
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');

      if (!this.props.pause && this.props.activeInBackground) {
        const difference = Date.now() - this.wentBackAt;

        const {seconds, minutes, hours} = this.state;

        const initialSeconds = Math.max(
          seconds + minutes * 60 + hours * 60 - Math.round(difference / 1000),
          0,
        );

        this.setState({
          seconds: this.calculateSeconds(initialSeconds),
          minutes: this.calculateMinutes(initialSeconds),
          hours: this.calculateHours(initialSeconds),
        });
      }
    } else {
      if (!this.props.pause && this.props.activeInBackground)
        this.wentBackAt = Date.now();
      console.log('App goes to background!');
    }
    this.appState = nextAppState;
  };

  componentDidMount() {
    this.setTimer();
    if (this.props.animateSeparator && this.props.showSeparator)
      this.startAnimate();

    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  render() {
    const {seconds, minutes, hours} = this.state;
    const {
      propStyleForHoursBackground,
      propStyleForMinutesBackground,
      propStyleForSecondsBackground,
      propStyleForHoursDigit,
      propStyleForMinutesDigit,
      propStyleForSecondsDigit,
      propStyleForHoursText,
      propStyleForMinutesText,
      propStyleForSecondsText,
      flexDirection,
    } = this;
    const {
      enableText,
      width,
      height,
      hoursText,
      minutesText,
      secondsText,
      showHours,
      showMinutes,
      showSeparator,
      animateSeparator,
      separatorStyle,
    } = this.props;

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    });

    return (
      <View style={[styles.container, {width, height}]}>
        {(hours > 0 || showHours) && (
          <View
            style={[
              styles.hoursBackground,
              propStyleForHoursBackground,
              {flexDirection},
            ]}>
            <Text style={[propStyleForHoursDigit]}>
              {hours < 10 ? '0' + hours : hours}
            </Text>
            {enableText && (
              <Text style={propStyleForHoursText}>{hoursText}</Text>
            )}
          </View>
        )}

        {showSeparator && (
          <Animated.Text
            style={[
              {
                textAlignVertical: 'center',
                fontSize: 30,
                opacity: animateSeparator ? opacity : 1,
              },
              separatorStyle,
            ]}>
            {' '}
            :{' '}
          </Animated.Text>
        )}

        {(minutes > 0 || showMinutes) && (
          <View
            style={[
              styles.minutesBackground,
              propStyleForMinutesBackground,
              {flexDirection},
            ]}>
            <Text style={propStyleForMinutesDigit}>
              {minutes < 10 ? '0' + minutes : minutes}
            </Text>
            {enableText && (
              <Text style={propStyleForMinutesText}>{minutesText}</Text>
            )}
          </View>
        )}

        {showSeparator && (
          <Animated.Text
            style={[
              {
                textAlignVertical: 'center',
                fontSize: 30,
                opacity: animateSeparator ? opacity : 1,
              },
              separatorStyle,
            ]}>
            {' '}
            :{' '}
          </Animated.Text>
        )}

        <View
          style={[
            styles.secondsBackground,
            propStyleForSecondsBackground,
            {flexDirection},
          ]}>
          <Text style={propStyleForSecondsDigit}>
            {seconds < 10 ? '0' + seconds : seconds}
          </Text>
          {enableText && (
            <Text style={propStyleForSecondsText}>{secondsText}</Text>
          )}
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  hoursBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  minutesBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondsBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

CountDown.propTypes = {
  initialSeconds: propTypes.number,
  onTimeOut: propTypes.func.isRequired,
  backgroundColor: propTypes.string,
  hoursBackgroundStyle: propTypes.object,
  minutesBackgroundStyle: propTypes.object,
  secondsBackgroundStyle: propTypes.object,
  digitColor: propTypes.string,
  gap: propTypes.oneOfType([propTypes.string, propTypes.number]),
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  borderRadius: propTypes.oneOfType([propTypes.string, propTypes.number]),
  digitFontSize: propTypes.oneOfType([propTypes.string, propTypes.number]),
  hoursDigitFontStyle: propTypes.object,
  minutesDigitFontStyle: propTypes.object,
  secondsDigitFontStyle: propTypes.object,
  digitFontWeight: propTypes.string,
  textColor: propTypes.string,
  textFontSize: propTypes.oneOfType([propTypes.string, propTypes.number]),
  textFontWeight: propTypes.string,
  hoursTextFontStyle: propTypes.object,
  minutesTextFontStyle: propTypes.object,
  secondsTextFontStyle: propTypes.object,
  textPosition: propTypes.oneOf(['top', 'bottom']),
  enableText: propTypes.bool,
  hoursText: propTypes.string,
  minutesText: propTypes.string,
  secondsText: propTypes.string,
  showHours: propTypes.bool,
  showMinutes: propTypes.bool,
  onChange: propTypes.func,
  showSeparator: propTypes.bool,
  separatorStyle: propTypes.object,
  animateSeparator: propTypes.bool,
  pause: propTypes.bool,
  activeInBackground: propTypes.bool,
};

CountDown.defaultProps = {
  initialSeconds: 0,
  backgroundColor: 'white',
  digitColor: 'black',
  gap: 5,
  width: 200,
  height: 80,
  borderRadius: 5,
  digitFontSize: 18,
  textColor: 'black',
  textFontSize: 10,
  textPosition: 'bottom',
  hoursText: 'Hours',
  minutesText: 'Minutes',
  secondsText: 'Seconds',
  showHours: true,
  showMinutes: true,
  showSeparator: false,
  animateSeparator: false,
  pause: false,
  activeInBackground: true,
};
//make this component available to the app
export default CountDown;
