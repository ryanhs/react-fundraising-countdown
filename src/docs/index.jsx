import React from "react";
import { render } from "react-dom";
import FlipClock from "../lib";
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
      currentFund:1000000,
    }
  }
  componentDidMount() {
		this.icoFundRaising = setInterval(
			() => this.updateFundRaising(),
			1000
		);
	}
  updateFundRaising() {
    this.setState({currentFund: this.state.currentFund + 100000})
  }
	componentWillUnmount() {
		clearInterval(this.icoFundRaising);
	}
  render(){
    return (
      <div>
        <h1>ICO Countdown Component</h1>
        <FlipClock icoProgress campaignEndDate='2018-9-31' currentFund={this.state.currentFund} softcap={9000000} hardcap={24000000} milestones={milestonesData}/>
      </div>
    );
  }
}

render(<Demo />, document.getElementById("app"));
