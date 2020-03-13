react-native-customizable-countdown
## Installation

from npm:\
``` npm install react-native-customizable-countdown --save ```

or from yarn:\
``` yarn add react-native-customizable-countdown ```

## Props
| Name  | Description | Required | Type | default |
| ------------- | ------------- | ------------- | ------------- | ------------- |
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
| textColor | change all texts' color | no | string | 'black' |
| textFontSize | change all texts' font sizes | no | number or string | 10 |
| textFontWeight | change all texts' font weight | no | string | none |
| hoursTextFontStyle | styling hours text  | no | object | none |
| minutesTextFontStyle | styling minutes text | no | object | none |
| secondsTextFontStyle | styling seconds text | no | object | none |
| enableText | hide or show text with digits | no | bool | none |
| textPostion | position of the texts in each container. **'top' or 'bottom'** | no | string | 'bottom' |
| hoursText | text which should display in hours container | no | string | 'Hours' |
| minutesText | text which should display in minutes container | no | string | 'Minutes' |
| secondsText | text which should display in seconds container | no | string | 'Seconds' |
| showHours | show or hide hours container if necessory | no | bool | true |
| reset | show or hide hours container if necessory | no | bool | true |


