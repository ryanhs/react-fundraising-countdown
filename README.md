# React component (react-fundraising-countdown)

This is a simple package for fundraising campaign countdown, milestones, and progress bar to display the fund achieved progress compare to the soft cap and hard cap target.

inspired by [React Flip Clock](https://codepen.io/Libor_G/pen/JyJzjb) , A Pen by Libor Gabrhel

## Getting Started

You can install via npm or yarn:
* `npm install react-fundraising-countdown -S`
* `yarn add  react-fundraising-countdown`

[Live Demo](https://codesandbox.io/s/vn0j13v87l)

## Motivation

The idea started when building a small website for an ICO campaign. So I thought of separating this fundraising countdown, fund progress, and milestones of a series of steps within the campaign from the main package so it can be reusable and serves as a starting point for further enhancement by developers to make it great and more useful.

## Usage
```javascript
const milestonesData = [
  {
    text: "ICO Start",
    cap: 0
  },
  {
    text: "Pilot Version",
    cap: 9000000
  },
  {
    text: "alpha Version",
    cap: 14000000
  },
  {
    text: "Beta Version",
    cap: 17000000
  },
  {
    text: "Complete Version",
    cap: 24000000
  }
];

<FundClockProgress
    icoProgress
    campaignEndDate={'2018-04-30'}
    currentFund={this.state.currentFund}
    softcap={9000000}
    hardcap={24000000}
    milestones={milestonesData}
  />
```

[Live Demo](https://codesandbox.io/s/vn0j13v87l)

## Props

| Name        | Type           | Default  | Desc |
| ----------- |:--------------:| :-------:|------|
| icoProgress      | bool | false | show progress when the time is up |
| campaignEndDate  | string (date format)     |  10 seconds from current date-time |
| currentFund  | number  |    0 | the current fund your raised do far |
| softcap      | number | 0 | the soft cap you need to achieve to start your project |
| hardcap      | number |   the maximum cap needed  |
| milestones   | array of object |    [] | takes an object of two attributes (text, cap) see the example above |
| currency     | string | $  | currency used for fundraising  |
| milestoneLineColor     | string |   grey  | color to represent the line and milestone text |
| icoClockStyle     | object |   {backgroundColor:'#000', width:'80px',height:'80px' | Clock Unit container Style |
| icoClockFlipStyle | object | {backgroundColor:'#000', width:'80px',height:'80px'}  | the folding Clock container style |
| icoClockFlipTextStyle | string (color) |  {color:'#fff'}  | the clock digit text style of each unit |
| unitLabelContainerStyle | string (color) | {backgroundColor:'#000', width:'80px',height:'20px'} | the Unit label Container Style |
| unitLabelTextStyle | string (color) | {color:'#fff'} | the Unit label Text Style |
