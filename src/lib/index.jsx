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
		const { position, digit, animation, style, textStyle } = this.props;
		return(
			<div className={`flipCard ${position} ${animation}`} style={style}>
				<span style={textStyle}>{digit}</span>
			</div>
		);
	}
}

class StaticCard extends React.Component {
	render() {
		const { position, digit, style, textStyle } = this.props;
		return(
			<div className={position} style={style}>
				<span style={textStyle}>{digit}</span>
			</div>
		);
	}
}

class FlipUnitContainer extends React.Component {
	render() {
		const { digit, shuffle, unit, alias,
			icoClockStyle, icoClockFlipStyle, icoClockFlipTextStyle,
			unitLabelContainerStyle, unitLabelTextStyle} = this.props;

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
  			<div className={'flipUnitContainer'} style={icoClockStyle}>
  				<StaticCard
  					position={'upperCard'}
  					digit={now}
						style={icoClockFlipStyle}
						textStyle={icoClockFlipTextStyle}
  					/>
  				<StaticCard
  					position={'lowerCard'}
  					digit={before}
						style={icoClockFlipStyle}
						textStyle={icoClockFlipTextStyle}
  					/>
  				<AnimatedCard
  					position={'first'}
  					digit={digit1}
  					animation={animation1}
						style={icoClockFlipStyle}
						textStyle={icoClockFlipTextStyle}
  					/>
  				<AnimatedCard
  					position={'second'}
  					digit={digit2}
  					animation={animation2}
						style={icoClockFlipStyle}
						textStyle={icoClockFlipTextStyle}
  					/>
  			</div>
        <div className={'UnitItemContainer'} style={unitLabelContainerStyle}>
          <span style={unitLabelTextStyle}>{alias}</span>
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
        return <div key={i} className={_classname} style={{width:`${width}%`, borderColor: milestoneLineColor}}></div>
      }
      else {
        return <div key={i} className={_classname} style={{width:`${width}%`}}><span style={{color:milestoneLineColor}}>{_milestoneText}</span></div>
      }
    })
		// this.props.onTimerComplete();
    return divs;
  }
}
ShapeMilestone.propTypes = {
	line: PropTypes.bool,
};

ShapeMilestone.defaultProps = {
  line: false,
};

export class FundingProgress extends React.Component {
	render(){
		const {currentFund, softcap, hardcap, currency, milestones, progressColor, milestoneLineColor, icoProgress} = this.props;

		return icoProgress?
			<div className={'ProgressContainer'}>
				<div className={'flexLines'}>
					<ShapeMilestone divType={TOP_MIL_DIV}  {...this.props} /></div>
					<div className={'flexLines'}><ShapeMilestone  {...this.props} divType={TOP_LINE_DIV} line /></div>
					<Progress active animated max={100} color={progressColor} value={(currentFund/hardcap)*100}><span style={{color:this.props.milestoneLineColor}} className={'progressText'}>{`${parseInt((currentFund/softcap)*100)}% Funded`}</span></Progress>
				<div className={'flexLines'}>
					<ShapeMilestone line divType={BOTTOM_LINE_DIV} {...this.props} />
				</div>
				<div className={'flexLines'}>
					<ShapeMilestone divType={BOTTOM_MIL_DIV}  {...this.props} />
				</div>
			</div> : null;
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
		clearInterval(this.icoCountDown);
    this.setState({
      isExpired: true
    });
  }
}

render() {
		const { days, hours, minutes, seconds, daysShuffle, hoursShuffle, minutesShuffle, secondsShuffle, isExpired } = this.state;
    const { softcap, hardcap, Milestones, icoProgress, milestones } = this.props;
		return(
      isExpired && icoProgress?
			<FundingProgress {...this.props} />
      :
			<div className={'flipClock'} >
        <FlipUnitContainer
          unit={'days'}
          alias={'Hari'}
          digit={days}
          shuffle={daysShuffle}
					{...this.props}
          />
        <FlipUnitContainer
					unit={'hours'}
          alias={'Jam'}
					digit={hours}
					shuffle={hoursShuffle}
					{...this.props}
					/>
				<FlipUnitContainer
					unit={'minutes'}
          alias={'Menit'}
					digit={minutes}
					shuffle={minutesShuffle}
					{...this.props}
					/>
				<FlipUnitContainer
					unit={'seconds'}
          alias={'Detik'}
					digit={seconds}
					shuffle={secondsShuffle}
					{...this.props}
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
	icoClockStyle: PropTypes.object,
	icoClockFlipStyle: PropTypes.object,
	unitLabelContainerStyle: PropTypes.object,
	unitLabelTextStyle: PropTypes.object,
	icoClockFlipTextStyle: PropTypes.object
};

FundClockProgress.defaultProps = {
  campaignEndDate: new Date(
  								new Date().getFullYear(),
  								new Date().getMonth(),
  								new Date().getDate(),
  								new Date().getHours(),
  								new Date().getMinutes(),
  								new Date().getSeconds()+20).toString(),
  icoProgress: false,
  currentFund: 0,
  softcap: 0,
  hardcap: 0,
  milestones: [],
  currency: '$',
  milestoneLineColor: 'grey',
	icoClockStyle: {},
	icoClockFlipStyle: {},
	unitLabelContainerStyle: {},
	unitLabelTextStyle:{},
	icoClockFlipTextStyle:{}
};


export default FundClockProgress;
