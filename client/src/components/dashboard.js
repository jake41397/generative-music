import React from 'react';
import Slider from './simpleSlider';
import RadioButtonGroup from './RadioButtonsGroup';

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.handleSlider = this.handleSlider.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
    }

    handleSlider(e, value)
    {
        e.preventDefault();
        const sliderCallback = this.props.tempCallback;
        sliderCallback(e, value);
    }

    handleRadio(e,value)
    {
        e.preventDefault();
        const changeMeasure = this.props.measureCallback;
        changeMeasure(e,value);
    }

    render() {

        const TempSlide = <Slider temperatureCallback = {this.handleSlider}/>;
        const Radio = <RadioButtonGroup radioCallback = {this.handleRadio}/>;
        return(
                <div>
                    <div>{TempSlide}</div>
                    <div>{Radio}</div>
                </div>
        )
    }
}

export default Dashboard;