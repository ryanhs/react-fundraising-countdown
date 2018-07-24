# React component (react-fundraising-countdown)

This is a simple package that can be used for two purposes:

* `1- Used for Countdown only (FlipCard countdown) day: hours: minutes: seconds`
* `2- fundraising campaign countdown, milestones, and progress bar to display the fund achieved progress compare to the minimum and maximum Fund target.`

[Click here to check it out](https://codesandbox.io/s/qq4yjwppk6)

inspired by [React Flip Clock](https://codepen.io/Libor_G/pen/JyJzjb) , A Pen by Libor Gabrhel

## Getting Started

You can install via npm or yarn:

* `npm install react-fundraising-countdown -S`
* `yarn add react-fundraising-countdown`

[Live Demo](https://codesandbox.io/s/qq4yjwppk6)

## Motivation

The idea started when building a small website for an ICO campaign. So I thought of separating this fundraising countdown, fund progress, and milestones of a series of steps within the campaign from the main package so it can be reusable and serves as a starting point for further enhancement by developers to make it great and more useful.

## Usage

```javascript
const milestonesData= [{
  text: 'Campaign Start',
  cap: 0
},{
  text: 'Minimum Goal $15M',
  cap: 15000000
},{
  text: 'Maximum Goal $24M',
  cap: 24000000
},];

  <h1>Just Countdown without progress bar or Milstones</h1>
  <FundClockProgress campaignEndDate={'2020-10-14'} />

  <h1>With Milestones & Progress bar for Crowdsale</h1>
  <FundClockProgress
    icoProgress
    currentFund={this.state.currentFund}
    softcap={15000000}
    hardcap={30000000}
    milestones={milestonesData}
    milestoneLineColor={'#a44fd2'}
    progressColor={'warning'} //bootstrap default colors: 'warning', 'info', 'success', ...etc .. please refer to bootstrap colors names
    icoClockStyle={{backgroundColor:'#ddd'}}
    icoClockFlipStyle={{backgroundColor:'#ddd'}}
    icoClockFlipTextStyle={{color:'#e91e63'}}
    unitLabelContainerStyle={{backgroundColor:'#e91e63'}}
    // unitLabelTextStyle={{color:'#000', fontSize: '1.1em'}}
  />
```

[Live Demo](https://codesandbox.io/s/qq4yjwppk6)

## Props

| Name                    |         Type         |              Default              | Desc                                                                |
| ----------------------- | :------------------: | :-------------------------------: | ------------------------------------------------------------------- |
| icoProgress             |         bool         |               false               | show progress when the time is up                                   |
| campaignEndDate         | string (date format) | 10 seconds from current date-time |
| currentFund             |        number        |                 0                 | the current fund your raised do far                                 |
| softcap                 |        number        |                 0                 | the soft cap you need to achieve to start your project              |
| hardcap                 |        number        |      the maximum cap needed       |
| milestones              |   array of object    |                []                 | takes an object of two attributes (text, cap) see the example above |
| progressColor           |        string        |              primary              | color of the progress bar                                           |
| milestoneLineColor      |        string        |               grey                | color to represent the line and milestone text                      |
| icoClockStyle           |        object        |      {backgroundColor:'#000'      | Clock Unit container Style                                          |
| icoClockFlipStyle       |        object        |     {backgroundColor:'#000'}      | the folding Clock container style                                   |
| icoClockFlipTextStyle   |    string (color)    |          {color:'#fff'}           | the clock digit text style of each unit                             |
| unitLabelContainerStyle |    string (color)    |     {backgroundColor:'#000'}      | the Unit label Container Style                                      |
| unitLabelTextStyle      |    string (color)    |          {color:'#fff'}           | the Unit label Text Style                                           |
