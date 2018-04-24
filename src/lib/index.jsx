import React, { Component } from "react";
import {Progress} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import './index.css';

const TOP_MIL_DIV = 'top_milestone_div';
const TOP_LINE_DIV = 'top_line_div';
const BOTTOM_MIL_DIV = 'bottom_milestone_div';
const BOTTOM_LINE_DIV = 'bottom_line_div';

class AnimatedCard extends React.Component {
	render() {
		const { position, digit, animation } = this.props;
		return(
			<div className={`flipCard ${position} ${animation}`}>
				<span>{digit}</span>
			</div>
		);
	}
}

class StaticCard extends React.Component {
	render() {
		const { position, digit } = this.props;
		return(
			<div className={position}>
				<span>{digit}</span>
			</div>
		);
	}
}

class FlipUnitContainer extends React.Component {
	render() {
		const { digit, shuffle, unit, alias } = this.props;

		let now = digit;
		let before = digit===59? 0 : digit + 1;
		// to prevent a negative value
		if( unit !== 'hours') {
			before = before === -1 ? 59 : before;
		} else {
			before = before === -1 ? 23 : before;
		}
		// add zero
		if( now < 10 ) now = `0${now}`;
		if( before < 10 ) before = `0${before}`;

		// shuffle digits
		const digit1 = shuffle ? before : now;
		const digit2 = !shuffle ? before : now;

		// shuffle animations
		const animation1 = shuffle ? 'fold' : 'unfold';
		const animation2 = !shuffle ? 'fold' : 'unfold';

		return(
      <div>
  			<div className={'flipUnitContainer'}>
  				<StaticCard
  					position={'upperCard'}
  					digit={now}
  					/>
  				<StaticCard
  					position={'lowerCard'}
  					digit={before}
  					/>
  				<AnimatedCard
  					position={'first'}
  					digit={digit1}
  					animation={animation1}
  					/>
  				<AnimatedCard
  					position={'second'}
  					digit={digit2}
  					animation={animation2}
  					/>
  			</div>
        <div className={'UnitItemContainer'}>
          <span>{alias}</span>
        </div>
      </div>
		);
	}
}
class ShapeMilestone extends React.Component {
  render(){
    const {softcap, hardcap, currentFund, divType, line, currency, milestones, milestoneLineColor} = this.props;
    console.log('current Fund: ',currentFund);
    console.log('Milstones: ', JSON.stringify(milestones));
    let previousCap = 0;
    let divs= milestones.map((item, i) => {
      let width= i==0? (item.cap/hardcap)*100 : (Math.abs(item.cap-previousCap)/hardcap)*100
      previousCap=item.cap;
      let _classname, _milestoneText='';
      switch (divType) {
        case TOP_MIL_DIV:
          _classname= i%2===0? 'milestone':'empty-div';
					_milestoneText= i%2===0? item.text:'';
          break;
        case TOP_LINE_DIV:
          _classname= i%2===0? 'vl':'empty-div';
          break;
        case BOTTOM_LINE_DIV:
          _classname= i%2!=0? 'vl':'empty-div';
          break;
        case BOTTOM_MIL_DIV:
					_milestoneText= i%2!=0? item.text:'';
          _classname= i%2!=0? 'milestone':'empty-div';
          break;
        default:
      }
      if (line) {
        return <div key={i} className={_classname} style={{width:`${width}%`, borderColor: `${milestoneLineColor}`}}></div>
      }
      else {
        return <div key={i} className={_classname} style={{width:`${width}%`}}><span style={{color:this.props.milestoneLineColor}}>{_milestoneText}</span></div>
      }
    })
		// this.props.onTimerComplete();
    return divs;
  }
}
ShapeMilestone.propTypes = {
icoProgress: PropTypes.bool,
};

ShapeMilestone.defaultProps = {
  line: false
  // onTimerComplete: ()=>{this.onTimerComplete}
};

export class FundingProgress extends React.Component {
	render(){
		const {currentFund, softcap, hardcap, currency, milestones, milestoneLineColor, icoProgress} = this.props;

		return icoProgress? <div className={'ProgressContainer'}><div className={'flexLines'}><ShapeMilestone divType={TOP_MIL_DIV}  {...this.props} /></div><div className={'flexLines'}><ShapeMilestone  {...this.props} divType={TOP_LINE_DIV} line /></div><Progress multi>
				<Progress  striped active animated bar max={100} color="success" value={(currentFund/hardcap)*100}><span style={{color:this.props.milestoneLineColor}} className={'progressText'}>{`${currency}${currentFund}`}</span></Progress>
				<Progress bar max={100} color="warning" value={(softcap-currentFund)>0?((softcap-currentFund)/hardcap)*100: 0}><span style={{color:this.props.milestoneLineColor}} className={'progressText'}>softcap: {`${currency}${softcap}`}</span></Progress>
				<Progress bar max={100} color="info" value={(softcap-currentFund)>0? 100 - (softcap/hardcap)*100 : 100 - (currentFund/hardcap)*100}><span style={{color:this.props.milestoneLineColor}} className={'progressText'}>hardcap: {`${currency}${hardcap}`}</span></Progress>
			</Progress><div className={'flexLines'}><ShapeMilestone line divType={BOTTOM_LINE_DIV} {...this.props} /></div><div className={'flexLines'}><ShapeMilestone divType={BOTTOM_MIL_DIV}  {...this.props} /></div></div>: null;
	}
}

class FundClockProgress extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      days: 0,
			daysShuffle: true,
			hours: 0,
			hoursShuffle: true,
			minutes: 0,
			minutesShuffle: true,
			seconds: 0,
			secondsShuffle: true,
      isExpired: false,
		};
	}
	componentDidMount() {
		this.icoCountDown = setInterval(
			() => this.updateTime(),
			1000
		);
	}
	componentWillUnmount() {
		clearInterval(this.icoCountDown);
	}
	updateTime() {
		// get new date
		const {onTimerComplete, campaignEndDate} = this.props;
		const now = new Date;
    // get campaign end Date
    const _campaignEndDate = new Date(campaignEndDate);
		// set time units

    if(_campaignEndDate>now){
			var distance = Math.abs(_campaignEndDate - now) / 1000;

			// calculate (and subtract) whole days
			var days = Math.floor(distance / 86400);
			distance -= days * 86400;

			// calculate (and subtract) whole hours
			var hours = Math.floor(distance / 3600) % 24;
			distance -= hours * 3600;

			// calculate (and subtract) whole minutes
			var minutes = Math.floor(distance / 60) % 60;
			distance -= minutes * 60;

			// what's left is seconds
			var seconds = parseInt(distance)
			//console.log(seconds)

			// on days chanage, update days and shuffle state
			if( days !== this.state.days) {
				const daysShuffle = !this.state.daysShuffle;
				this.setState({
					days,
					daysShuffle
				});
			}
		// on hour chanage, update hours and shuffle state
		if( hours !== this.state.hours) {
			const hoursShuffle = !this.state.hoursShuffle;
			this.setState({
				hours,
				hoursShuffle
			});
		}
		// on minute chanage, update minutes and shuffle state
		if( minutes !== this.state.minutes) {
			const minutesShuffle = !this.state.minutesShuffle;
			this.setState({
				minutes,
				minutesShuffle
			});
		}
		// on second chanage, update seconds and shuffle state
		if( seconds !== this.state.seconds) {
			const secondsShuffle = !this.state.secondsShuffle;
			this.setState({
				seconds,
				secondsShuffle
			});
		}
	} else {
    this.setState({
      isExpired: true
    });
		clearInterval(this.icoCountDown);
  }
}

render() {
		const { days, hours, minutes, seconds, daysShuffle, hoursShuffle, minutesShuffle, secondsShuffle, isExpired } = this.state;
    const { softcap, hardcap, Milestones, icoProgress, milestones } = this.props;
		return(
      isExpired? <FundingProgress {...this.props} />
      :
			<div className={'flipClock'}>
        <FlipUnitContainer
          unit={'days'}
          alias={'Days'}
          digit={days}
          shuffle={daysShuffle}
          />
        <FlipUnitContainer
					unit={'hours'}
          alias={'Hours'}
					digit={hours}
					shuffle={hoursShuffle}
					/>
				<FlipUnitContainer
					unit={'minutes'}
          alias={'Mins'}
					digit={minutes}
					shuffle={minutesShuffle}
					/>
				<FlipUnitContainer
					unit={'seconds'}
          alias={'Secs'}
					digit={seconds}
					shuffle={secondsShuffle}
					/>
			</div>
		);
	}
}
FundClockProgress.propTypes = {
campaignEndDate: PropTypes.string,
currency: PropTypes.string,
currentFund: PropTypes.number,
softcap: PropTypes.number,
hardcap: PropTypes.number,
milestones: PropTypes.array,
icoProgress: PropTypes.bool,
onTimerComplete: PropTypes.func,
milestoneLineColor: PropTypes.string,
};

FundClockProgress.defaultProps = {
  campaignEndDate: new Date(
  								new Date().getFullYear(),
  								new Date().getMonth(),
  								new Date().getDate(),
  								new Date().getHours(),
  								new Date().getMinutes(),
  								new Date().getSeconds()+10).toString(),
  icoProgress: false,
  currentFund: 0,
  softcap: 0,
  hardcap: 0,
  milestones: [],
  currency: '$',
  milestoneLineColor: 'grey'
};


export default FundClockProgress;
