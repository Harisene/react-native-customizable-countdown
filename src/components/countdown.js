//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import propTypes from 'prop-types';
// create a component
class CountDown extends Component {

    constructor(props){
        super(props);      

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
            textPosition                        
                             
          } = this.props;    
          
          this.propStyleForHoursBackground = {
            backgroundColor,
            borderRadius,
            ...hoursBackgroundStyle
          };
    
          this.propStyleForMinutesBackground = {
            backgroundColor,
            marginLeft: gap,
            borderRadius,
            ...minutesBackgroundStyle
          };
    
          this.propStyleForSecondsBackground = {
            backgroundColor,
            marginLeft: gap,
            borderRadius,
            ...secondsBackgroundStyle
          };
    
          this.propStyleForHoursDigit = {
            color: digitColor,
            fontSize: digitFontSize,
            fontWeight: digitFontWeight,
            ...hoursDigitFontStyle
          };
    
          this.propStyleForMinutesDigit = {
            color: digitColor,
            fontSize: digitFontSize,
            fontWeight: digitFontWeight,
            ...minutesDigitFontStyle
          };
    
          this.propStyleForSecondsDigit = {
            color: digitColor,
            fontSize: digitFontSize,
            fontWeight: digitFontWeight,
            ...secondsDigitFontStyle
          };

          this.propStyleForHoursText = {
            color: textColor,
            fontWeight: textFontWeight,
            fontSize: textFontSize,
            ...hoursTextFontStyle
          }

          this.propStyleForMinutesText = {
            color: textColor,
            fontWeight: textFontWeight,
            fontSize: textFontSize,
            ...minutesTextFontStyle
        }

        this.propStyleForSecondsText = {
            color: textColor,
            fontWeight: textFontWeight,
            fontSize: textFontSize,
            ...secondsTextFontStyle
        }

        if(textPosition === 'top')
            this.flexDirection = 'column-reverse'
            
        else
            this.flexDirection = 'column'
           

            this.state = {
                initialSeconds,
                seconds: this.calculateSeconds(initialSeconds),
                minutes: this.calculateMinutes(initialSeconds),
                hours: this.calculateHours(initialSeconds)
              };

            
           
            this.reset = false;
    }
    
    
    calculateSeconds = (initialSeconds) => {
      return initialSeconds%60;
    }

    calculateMinutes = (initialSeconds) => {
      return  Math.floor(initialSeconds/60)%60;
    }

    calculateHours = (initialSeconds) => {
      return Math.floor(Math.floor(initialSeconds/60)/60);
    }



    resetCountDown = () => {
      console.log('reseting...');
      const {initialSeconds} = this.state;
      let minutes = Math.floor(initialSeconds/60);
      const seconds = initialSeconds%60;
      const hours = Math.floor(minutes/60);
      minutes = minutes%60;

      this.setState({seconds, minutes, hours})
        
    }

    addSeconds = (userSeconds) => {
      console.log('Adding '+userSeconds+' to the countdown!')
      let {seconds, minutes, hours} = this.state;

      seconds +=userSeconds;

      if(seconds>59){
        minutes += Math.floor(seconds/60);
        seconds = seconds%60;
      }
      

      if(minutes>59){
        hours += Math.floor(minutes/60);
        minutes = minutes%60;
      }

      this.setState({seconds, minutes, hours })
      
    }

    deductSeconds = (userSeconds) => {
      console.log('Deducting '+userSeconds+' from the countdown!')

      let {seconds, minutes, hours} = this.state;

      seconds -=userSeconds;

      if(hours === 0 && minutes===0 && seconds <= 0)
        seconds = 0;
      
      else{

      if(seconds<0){
        minutes -= (Math.floor(Math.abs(seconds)/60)+1);
        seconds = 60 + seconds%60;
      }
      

      if(minutes<0){
        hours -= (Math.floor(Math.abs(minutes)/60)+1);
        minutes = 60 + minutes%60;
      }

    }
      


      this.setState({seconds, minutes, hours })
    }


      setTimer = () => {
        this.timer = setInterval(()=> {
            let {seconds, minutes, hours} = this.state;

            if(seconds === 0 && minutes !== 0){
                minutes--;
                seconds = 59;
            }            

            else if(seconds === 0 && minutes === 0 && hours === 0){
                if(this.props.onTimeOut)
                   this.props.onTimeOut();
                clearInterval(this.timer);
            }              
            
            else if(seconds === 0 && minutes === 0){
                hours--;
                minutes = 59;
                seconds = 59
            }
            
            else{
                seconds--;
            }
            //console.log(hours, minutes, seconds)
            this.setState({ seconds, minutes, hours})
            
        }, 1000)
      }

      componentDidUpdate(prevProps, prevState) {        
        if (this.state.seconds !== prevState.seconds) { 
          if(this.props.onChange)        
            this.props.onChange(this.state.hours, this.state.minutes, this.state.seconds)
        }
      }


    componentDidMount(){
      this.setTimer();  
    }

   

    componentWillUnmount(){
      clearInterval(this.timer);
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
      flexDirection
      
    } = this;
    const {enableText, width, height, hoursText, minutesText, secondsText, showHours} = this.props;
    return (
      <View style={[styles.container, {width, height}]}>
        {(hours>0 || showHours) && <View style={[styles.hoursBackground, propStyleForHoursBackground, {flexDirection}]}>
          <Text style={[propStyleForHoursDigit]}>
            {hours < 10 ? '0' + hours : hours}
          </Text>
          {enableText && <Text style={propStyleForHoursText}>{hoursText}</Text>}
        </View>}

        <View style={[styles.minutesBackground, propStyleForMinutesBackground, {flexDirection}]}>
          <Text style={propStyleForMinutesDigit}>
            {minutes < 10 ? '0' + minutes : minutes}
          </Text>
    {enableText &&  <Text style={propStyleForMinutesText}>{minutesText}</Text>}
        </View>

        <View style={[styles.secondsBackground, propStyleForSecondsBackground, {flexDirection}]}>
          <Text style={propStyleForSecondsDigit}>
            {seconds < 10 ? '0' + seconds : seconds}
          </Text>
    {enableText &&  <Text style={propStyleForSecondsText}>{secondsText}</Text>}
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'    
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
  onChange: propTypes.func
  
};

CountDown.defaultProps = {
  initialSeconds: 120,
  backgroundColor: 'white',
  digitColor: 'black',
  gap: 5,
  width: 200,
  height: 80,
  borderRadius: 5,
  digitFontSize: 18,
  textColor: 'black',
  textFontSize:10,
  textPosition: 'bottom',
  hoursText: 'Hours',
  minutesText: 'Minutes',
  secondsText: 'Seconds',
  showHours: true
};
//make this component available to the app
export default CountDown;
