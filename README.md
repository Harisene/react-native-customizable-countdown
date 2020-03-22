![npm](https://img.shields.io/npm/v/react-native-customizable-countdown)
![NPM](https://img.shields.io/npm/l/react-native-customizable-countdown)
![npm](https://img.shields.io/npm/dw/react-native-customizable-countdown)
![GitHub issues](https://img.shields.io/github/issues/Harisene/react-native-customizable-countdown)

## Preview
![1](https://user-images.githubusercontent.com/33250282/76606296-02eecd80-6538-11ea-9a7c-2db54be6810d.PNG)

![2](https://user-images.githubusercontent.com/33250282/76607007-4138bc80-6539-11ea-8f2a-b8ca393bb9fa.PNG)

![3](https://user-images.githubusercontent.com/33250282/76624571-8bcb3080-655b-11ea-9f09-90c31277f93f.PNG)

## Installation

from npm:\
``` npm install react-native-customizable-countdown --save ```

or from yarn:\
``` yarn add react-native-customizable-countdown ```

## What's new in 1.1.0
###### new Prop

![animate1](https://user-images.githubusercontent.com/33250282/77244070-467fc080-6c37-11ea-9a2e-c0ad46cc53e7.gif)
![animate2](https://user-images.githubusercontent.com/33250282/77244126-c3129f00-6c37-11ea-88a6-eadc49e7386d.gif)


``` endingAlert: {
        initiateAt: number (seconds),
        animate:bool, 
        backgroundColor: string,
        digitColor: string,
        labelColor: string
        }
```

###### changed Prop names
| Previous Prop Name  | New Prop Name | 
| ------------- | ------------- |
| textColor | labelColor |
| textFontWeight | labelFontSize |
| textFontWeight | labelFontWeight |
| hoursTextFontStyle | hoursLabelFontStyle |
| minutesTextFontStyle | minutesLabelFontStyle |
| secondsTextFontStyle | secondsLabelFontStyle |
| textPosition | labelPosition |
| enableText | enableLabel |
| hoursText | hoursLabel |
| minutesText | minutesLabel |
| secondsText | secondsLabel |

## Props  
| Name  | Description | Required | Type | default |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| initialSeconds | seconds to start the countdown | no | number | 0 |
| ref | use to handle **reset, addSeconds and deductSeconds** methods. (usage shown below) | no | func | none |
| onTimeOut | triggers after finishing the countdown | **yes** | func | none |
| onChange | get **seconds, minutes and hours** | no | func | none |
| gap | gaps between each digit containers | no | string or number | 5 |
| width | width of the countdown component | no | string or number | 200 |
| height | height of the countdown component | no | string or number | 80 |
| borderRadius | borderRadius of all digit containers | no | string or number | 5 |
| backgroundColor | background color of each digit container | no | string | 'white' |
| hoursBackgroundStyle | styling hours digit container | no | object | none |
| minutesBackgroundStyle | styling minutes digit container | no | object | none |
| secondsBackgroundStyle | styling seconds digit container | no | object | none |
| digitColor | change all digits' color | no | string | 'black' |
| digitFontSize | change all digits' font sizes | no | number or string | 18 |
| digitFontWeight | change all digits' color | no | string | none |
| hoursDigitFontStyle | styling hours digits  | no | object | none |
| minutesDigitFontStyle | styling minutes digits | no | object | none |
| secondsDigitFontStyle | styling seconds digits | no | object | none |
| labelColor | change all texts' color | no | string | 'black' |
| labelFontSize | change all texts' font sizes | no | number or string | 10 |
| labelFontWeight | change all texts' font weight | no | string | none |
| hoursLabelFontStyle | styling hours text  | no | object | none |
| minutesLabelFontStyle | styling minutes text | no | object | none |
| secondsLabelFontStyle | styling seconds text | no | object | none |
| enableLabel | hide or show text with digits | no | bool | none |
| labelPostion | position of the texts in each container. **'top' or 'bottom'** | no | string | 'bottom' |
| hoursLabel | text which should display in hours container | no | string | 'Hours' |
| minutesLabel | text which should display in minutes container | no | string | 'Minutes' |
| secondsLabel | text which should display in seconds container | no | string | 'Seconds' |
| showHours | show or hide hours container if necessory (**can hide only if hours digit is zero**) | no | bool | true |
| showMinutes | show or hide minutes container if necessory (**can hide only if minutes digit is zero**) | no | bool | true |
| showSeparator | show or hide separator between containers | no | bool | false |
| animateSeparator | **only works when showSeparator is true** | no | bool | false |
| separatorStyle | style the separator | no | object | none |
| pause | pause the countdown | no | bool | false |
| activeInBackground | countdown works even if the app is in background | no | bool | true |
| endingAlert | change UI colors when countdown hits a certian seconds (**initiateAt is required**). Allows animation aswell. | no | obj | none |
## Usage

``` 
import {CountDown} from 'react-native-customizable-countdown'

<CountDown
    ref = {(ref) => this.myRef=ref}
    initialSeconds = {4500}
    onTimeOut = {()=>{}}
    digitFontSize={30}
    textFontSize = {15}
    width={300}
    height={100}
    hoursText={'hrs'}
    minutesText={'min'}
    enableText = {true}
    backgroundColor={'yellow'}
    hoursBackgroundStyle={{borderWidth:2, backgroundColor:null, borderColor: 'blue'}}
    secondsBackgroundStyle={{borderWidth:0, backgroundColor:null, borderColor: 'blue'}}
    secondsDigitFontStyle={{color:'pink'}}
    secondsTextFontStyle={{color:'green'}}
    textColor='red'
    textFontWeight='bold'
    textPosition = 'top'/> 
```

```
<CountDown
        initialSeconds = {50}
        onTimeOut = {()=>{}}        
        showSeparator = {true}
        animateSeparator = {true}   
        separatorStyle={{color:'red', fontSize: 50}}
        pause = {this.state.pause}
        activeInBackground = {false}
        endingAlert={{
          backgroundColor:'red',
          initiateAt:120, 
          animate:true, 
          digitColor:'blue',
          labelColor:'yellow'
        }}     
        />
```

## onChange

```
onChange = (hours, minutes, seconds) => {
  console.log('hours: '+hours+' minutes: '+minutes+' seconds: '+seconds);
}

  render() {   
    return ( 
    <CountDown
        ref = {(ref) => this.myRef=ref}
        initialSeconds = {4500}
        onTimeOut = {()=>{alert('time out!')}}
        onChange = {this.onChange}
        digitFontSize={30}
        textFontSize = {15}
        width={300}
        height={100}/>
```
## Methods
using **ref** property you can access below mentioned all methods.

###### resetCountDown 
``` this.myRef.resetCountDown() ```

###### addSeconds 
``` this.myRef.addSeconds(number) ```

###### deductSeconds 
``` this.myRef.deductSeconds(number) ```
