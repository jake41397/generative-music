import React from 'react';
import DrumNote from './DrumNote';

class DrumKit extends React.Component{

    constructor(props) {
        super(props);
        //bind this function because we're gonna pass it to the individual buttons
        this.handleNoteClick= this.handleNoteClick.bind(this);
    }

    handleNoteClick(e,msg, pitch, QTS, QTE, toggleState)
    {
        e.preventDefault();
        const testCallback = this.props.testCallback;
        testCallback(e,msg,pitch,QTS,QTE, toggleState);
    }

    render() {

        const drum1 = <DrumNote pitch={this.props.pitch} clickCallback = {this.handleNoteClick} QTS = {0} QTE = {1}/>;
        const drum2 = <DrumNote pitch={this.props.pitch} clickCallback = {this.handleNoteClick} QTS = {2} QTE = {3}/>;
        const drum3 = <DrumNote pitch={this.props.pitch} clickCallback = {this.handleNoteClick} QTS = {4} QTE = {5}/>;
        const drum4 = <DrumNote pitch={this.props.pitch} clickCallback = {this.handleNoteClick} QTS = {6} QTE = {7}/>;


        return(
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                {drum1}
                {drum2}
                {drum3}
                {drum4}
            </div>

        )
    }
}

export default DrumKit;