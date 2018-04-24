import React from "react";
import { render } from "react-dom";
import FundClockProgress from "../lib";
import "./styles.css";
const milestonesData= [{
  text: 'ICO Start',
  cap: 0
},{
  text: 'Pilot Version',
  cap: 9000000
},{
  text: 'alpha Version',
  cap: 14000000
},{
  text: 'Beta Version',
  cap: 17000000
},{
  text: 'Complete Version',
  cap: 24000000
},]
class Demo extends React.Component {
  constructor(props){
    super(props)
    this.state={
      currentFund:100000,
      softcap: 9000000,
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
        <h1>ICO Countdown Component</h1>
        <FundClockProgress
          icoProgress
          currentFund={this.state.currentFund}
          softcap={this.state.softcap}
          hardcap={this.state.hardcap}
          milestones={milestonesData}
          milestoneLineColor={'#000'}
          icoClockStyle={{backgroundColor:'#ddd'}}
          icoClockFlipStyle={{backgroundColor:'#ddd'}}
          icoClockFlipTextStyle={{color:'#e91e63'}}
          unitLabelContainerStyle={{backgroundColor:'#e91e63', height: '25px'}}
          unitLabelTextStyle={{color:'#000', fontSize: '1.1em'}}
        />
      </div>
    );
  }
}

render(<Demo />, document.getElementById("app"));
