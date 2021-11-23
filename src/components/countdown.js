//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Easing, AppState} from 'react-native';
import propTypes from 'prop-types';
// create a component
class CountDown extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);
    this.alertAnimateValue = new Animated.Value(0);

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
      labelColor,
      labelFontSize,
      labelFontWeight,
      hoursLabelFontStyle,
      minutesLabelFontStyle,
      secondsLabelFontStyle,
      labelPosition,
    } = this.props;

    this.propStyleForHoursBackground = {
      backgroundColor,
      marginRight:gap/2,
      borderRadius,
      ...hoursBackgroundStyle,
    };

    this.propStyleForMinutesBackground = {
      backgroundColor,
      marginHorizontal: gap/2,
      borderRadius,
      ...minutesBackgroundStyle,
    };

    this.propStyleForSecondsBackground = {
      backgroundColor,
      marginHorizontal: gap/2,
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
      color: labelColor,
      fontWeight: labelFontWeight,
      fontSize: labelFontSize,
      ...hoursLabelFontStyle,
    };

    this.propStyleForMinutesText = {
      color: labelColor,
      fontWeight: labelFontWeight,
      fontSize: labelFontSize,
      ...minutesLabelFontStyle,
    };

    this.propStyleForSecondsText = {
      color: labelColor,
      fontWeight: labelFontWeight,
      fontSize: labelFontSize,
      ...secondsLabelFontStyle,
    };

    if (labelPosition === 'top') {
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

  calculateSeconds = initialSeconds => initialSeconds % 60;

  calculateMinutes = initialSeconds => Math.floor(initialSeconds / 60) % 60;

  calculateHours = initialSeconds =>
    Math.floor(Math.floor(initialSeconds / 60) / 60);

  calculateTotalSeconds = () => {
    const {seconds, minutes, hours} = this.state;
    return seconds + minutes * 60 + hours * 3600;
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
      if (this.props.onChange) {
        this.props.onChange(
          this.state.hours,
          this.state.minutes,
          this.state.seconds,
        );
      }
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
      useNativeDriver: true,
    }).start(() => {
      const {seconds, minutes, hours} = this.state;
      if ((seconds || minutes || hours) && !this.props.pause)
        this.startAnimate();
    });
  }

  alertAnimate() {
    this.alertAnimateValue.setValue(0);
    Animated.timing(this.alertAnimateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  animateBackgroundColor = (initialColor, animateColor) => {
    if (this.props.endingAlert.animate && animateColor) {
      return this.alertAnimateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [initialColor, animateColor],
      });
    } else return animateColor? animateColor: initialColor;
  };

  animateDigitColor = (initialColor, animateColor) => {
    if (this.props.endingAlert.animate && animateColor) {
      return this.alertAnimateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [initialColor, animateColor],
      });
    } else return animateColor? animateColor: initialColor;
  };

  animateTextColor = (initialColor, animateColor) => {
    if (this.props.endingAlert.animate && animateColor) {
      return this.alertAnimateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [initialColor, animateColor],
      });
    } else return animateColor? animateColor: initialColor;
  };

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

    // if (this.props.endingAlert?.animate)
    //   this.alertAnimate();

    this.subcription = AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.subcription.remove();
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
      enableLabel,
      width,
      height,
      hoursLabel,
      minutesLabel,
      secondsLabel,
      showHours,
      showMinutes,
      showSeparator,
      animateSeparator,
      separatorStyle,
      endingAlert,
      pause
    } = this.props;

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1],
    });

    if (endingAlert?.initiateAt >= this.calculateTotalSeconds()) {
      if(!pause)
        this.alertAnimate();
      const {
        backgroundColor,
        digitColor,
        labelColor        
      } = endingAlert;               

      //console.log(animateBackgroundColor);

      return (
        <View style={[styles.container, {width, height}]}>
          {(hours > 0 || showHours) && (
            <Animated.View
              style={[
                styles.hoursBackground,
                propStyleForHoursBackground,
                {
                  flexDirection,
                  backgroundColor: this.animateBackgroundColor(
                    this.propStyleForHoursBackground.backgroundColor,
                    backgroundColor,
                  ),
                },
              ]}>
              <Animated.Text style={[propStyleForHoursDigit, {color: this.animateDigitColor(propStyleForHoursDigit.color, digitColor)}]}>
                {hours < 10 ? '0' + hours : hours}
              </Animated.Text>
              {enableLabel && (
                <Animated.Text style={[propStyleForHoursText, {color: this.animateTextColor(propStyleForHoursText.color, labelColor)}]}>
                  {hoursLabel}
                </Animated.Text>
              )}
            </Animated.View>
          )}

          {showSeparator && (hours > 0 || showHours) && (
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
            <Animated.View
              style={[
                styles.minutesBackground,
                propStyleForMinutesBackground,
                {flexDirection, backgroundColor: this.animateBackgroundColor(
                  this.propStyleForMinutesBackground.backgroundColor,
                  backgroundColor,
                ),},
              ]}>
              <Animated.Text style={[propStyleForMinutesDigit, {color: this.animateDigitColor(this.propStyleForMinutesDigit.color, digitColor)}]}>
                {minutes < 10 ? '0' + minutes : minutes}
              </Animated.Text>
              {enableLabel && (
                <Animated.Text style={[propStyleForMinutesText, {color: this.animateTextColor(propStyleForMinutesText.color, labelColor)}]}>
                  {minutesLabel}
                </Animated.Text>
              )}
            </Animated.View>
          )}

          {showSeparator && (minutes > 0 || showMinutes) && (
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

          <Animated.View
            style={[
              styles.secondsBackground,
              propStyleForSecondsBackground,
              {flexDirection, backgroundColor: this.animateBackgroundColor(
                this.propStyleForSecondsBackground.backgroundColor,
                backgroundColor,
              )},
            ]}>
            <Animated.Text style={[propStyleForSecondsDigit, {color: this.animateDigitColor(this.propStyleForSecondsDigit.color, digitColor)}]}>
              {seconds < 10 ? '0' + seconds : seconds}
            </Animated.Text>
            {enableLabel && (
              <Animated.Text style={[propStyleForSecondsText, {color: this.animateTextColor(propStyleForSecondsText.color, labelColor)}]}>
                {secondsLabel}
              </Animated.Text>
            )}
          </Animated.View>
        </View>
      );
    } else
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
              {enableLabel && (
                <Text style={propStyleForHoursText}>{hoursLabel}</Text>
              )}
            </View>
          )}

          {showSeparator && (hours > 0 || showHours) && (
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
              {enableLabel && (
                <Text style={propStyleForMinutesText}>{minutesLabel}</Text>
              )}
            </View>
          )}

          {showSeparator && (minutes > 0 || showMinutes) && (
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
            {enableLabel && (
              <Text style={propStyleForSecondsText}>{secondsLabel}</Text>
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
  labelColor: propTypes.string,
  labelFontSize: propTypes.oneOfType([propTypes.string, propTypes.number]),
  labelFontWeight: propTypes.string,
  hoursLabelFontStyle: propTypes.object,
  minutesLabelFontStyle: propTypes.object,
  secondsLabelFontStyle: propTypes.object,
  labelPosition: propTypes.oneOf(['top', 'bottom']),
  enableLabel: propTypes.bool,
  hoursLabel: propTypes.string,
  minutesLabel: propTypes.string,
  secondsLabel: propTypes.string,
  showHours: propTypes.bool,
  showMinutes: propTypes.bool,
  onChange: propTypes.func,
  showSeparator: propTypes.bool,
  separatorStyle: propTypes.object,
  animateSeparator: propTypes.bool,
  pause: propTypes.bool,
  activeInBackground: propTypes.bool,
  endingAlert: propTypes.shape({
    animate: propTypes.bool,
    digitColor: propTypes.string,
    labelColor: propTypes.string,
    backgroundColor: propTypes.string,
    initiateAt: propTypes.number.isRequired,
  }),
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
  labelColor: 'black',
  labelFontSize: 10,
  labelPosition: 'bottom',
  hoursLabel: 'Hours',
  minutesLabel: 'Minutes',
  secondsLabel: 'Seconds',
  showHours: true,
  showMinutes: true,
  showSeparator: false,
  animateSeparator: false,
  pause: false,
  activeInBackground: true  
};
//make this component available to the app
export default CountDown;
