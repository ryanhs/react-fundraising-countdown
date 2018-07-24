import React from "react";
import { render } from "react-dom";
import FundClockProgress from "../lib";
import "./styles.css";
const milestonesData= [{
  text: 'Campaign Start',
  cap: 0
},{
  text: 'Minimum Goal $15M',
  cap: 15000000
},{
  text: 'Maximum Goal $24M',
  cap: 24000000
},]
class Demo extends React.Component {
  constructor(props){
    super(props)
    this.state={
      currentFund:100000,
      softcap: 15000000,
      hardcap: 24000000,
    }
  }
  componentWillMount() {
      this.icoFundRaising = setInterval(
  			() => this.updateFundRaising(),
  		 500
  		);
	}
  updateFundRaising() {
    const {hardcap, currentFund} =this.state;
    if (currentFund <= hardcap) {
      this.setState({currentFund: currentFund + 100000})
    }
    else {
        clearInterval(this.icoFundRaising);
    }
  }
	componentWillUnmount() {
		clearInterval(this.icoFundRaising);
	}
  render(){
    return (
      <div>
        <h1>With Milestones & Progress bar for Crowdsale</h1>
        <FundClockProgress
          icoProgress
          currentFund={this.state.currentFund}
          softcap={this.state.softcap}
          hardcap={this.state.hardcap}
          milestones={milestonesData}
          milestoneLineColor={'#a44fd2'}
          progressColor={'warning'} //bootstrap default colors: 'warning', 'info', 'success', ..etc
          icoClockStyle={{backgroundColor:'#ddd'}}
          icoClockFlipStyle={{backgroundColor:'#ddd'}}
          icoClockFlipTextStyle={{color:'#e91e63'}}
          unitLabelContainerStyle={{backgroundColor:'#e91e63'}}
          // unitLabelTextStyle={{color:'#000', fontSize: '1.1em'}}
        />

        <h1>Just Countdown without progress bar or Milstones</h1>
        <FundClockProgress />
      </div>
    );
  }
}

render(<Demo />, document.getElementById("app"));
