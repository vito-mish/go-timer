// css-to-react-native recently released version 3 which now requires units to be present for all measurements.
// ref: https://stackoverflow.com/questions/58923065/why-does-styled-components-5-x-warn-about-expected-style-to-contain-units

export const theme = {
  colors: {
    gray: ['#111010', '#4a4a4a', '#808080', '#a4a4a4', '#cccccc', '#ffffff'],
    primary: ['#0157CB', '#3C88EE'],
    inactive: ['#CED4DA'],
    divider: ['#9b9b9b'],
    success: ['#10a54a'],
    warning: ['#ffa500'],
    error: ['#FF0000'],
    mask: ['#000000bb', '#00000088', '#ffffffb3'],
    screen: ['#f5f8fa'],
  },
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40],
  fontWeights: [400, 600],
  fontSizes: [10, 12, 14, 16, 18, 20, 24, 28],
  lineHeights: ['12px', '16px', '18px', '22px', '24px', '26px', '28px', '34px'],
  borderRadius: [2, 5, 8, 10, 16],
}
