import React from 'react';

class DrumNote extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick= this.handleClick.bind(this);
        this.state = {bgColor: '#1C1616', toggle: false};
    }

    handleClick(e)
    {
        e.preventDefault();
        const clickCallback = this.props.clickCallback;

        //tickity toggle these buttons so we know which drums the users have chosen.
        if(!this.state.toggle)
        {
            this.setState({bgColor: '#4482BE', toggle: true});
        }
        else
        {
            this.setState({bgColor: '#1C1616', toggle: false});
        }

        clickCallback(e,"Reporting for duty sir!",this.props.pitch, this.props.QTS, this.props.QTE, this.state.toggle);
    }

    render() {
        return(
            <div className="btn-group mr-2 mb-2" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary" onClick={this.handleClick} data-toggle="button" style={{backgroundColor:this.state.bgColor}}>drum pitch: {this.props.pitch}</button>
            </div>
        )
    }
}

export default DrumNote;