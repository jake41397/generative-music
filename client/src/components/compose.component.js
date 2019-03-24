import React, { Component } from 'react';
import * as mag from "@magenta/music";
import DrumKit from "./DrumKit";
import Dashboard from "./dashboard";

//create the sequence that we need. "input midi"
var drumRnn;
var drumPlayer;
var noteSet = new Set();
var temperature = 0.5;
var measures = 2;

//when this is called, the active notes will be put into an array and constructed into a note sequence for the Rnn player.
function buildNoteSequence()
{
    var notes = [];
    var parsed;

    for (let item of noteSet)
    {
        parsed = JSON.parse(item);
        notes.push(parsed);
    };

    const drumSeq = {
        notes,
        quantizationInfo: {stepsPerQuarter: 4},
        tempos: [{time: 0, qpm: 120}],
        totalQuantizedSteps: 8
    };

    return drumSeq;
}


async function initRnn()
{
	//google's RNN, eventually we will use JAI's rnn from the backend.
    drumRnn = new mag.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn');
    // Initialize the model.
    await drumRnn.initialize();
}

export default class compose extends Component {

    constructor(props) {
        super(props);
        //bind this function because we're gonna pass it to the individual buttons
        this.testSound = this.testSound.bind(this);
        this.changeTemperature = this.changeTemperature.bind(this);
        this.changeMeasures = this.changeMeasures.bind(this);
    }

    //tests the sound of the drumkit button that is pressed.
    testSound(e, msg, pitch, QTS, QTE, toggleState) {
        e.preventDefault();

        //the button has been pressed on if this is received as false, and it will go into our set which our user will submit to jai
        if (toggleState === false) {
            var noteJson = '{ "pitch" : ' + pitch + ',"isDrum" : ' + true + ', "quantizedStartStep" : ' + QTS + ',"quantizedEndStep" : ' + QTE + '}';

            noteSet.add(noteJson);
            console.log(noteSet.has(noteJson));
        }
        //if the user toggles this off we need to purge what they entered before.
        else {
            //delete the string of the note that got untoggled.
            var noteJson = '{ "pitch" : ' + pitch + ',"isDrum" : ' + true + ', "quantizedStartStep" : ' + QTS + ',"quantizedEndStep" : ' + QTE + '}';
            noteSet.delete(noteJson);
        }

        //0 to 1 QTS to QTE because we just want to test the sound when the button is clicked.
        var drumSequence = {
            notes: [
                {pitch: pitch, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true},
            ],
            quantizationInfo: {stepsPerQuarter: 4},
            tempos: [{time: 0, qpm: 120}],
            totalQuantizedSteps: 1
        };

        drumPlayer.start(drumSequence);
    }

    //playback currently selected notes in order.
    testNoteSequence() {
        const drumSequence = buildNoteSequence();
        drumPlayer.start(drumSequence);
        const midi = mag.sequenceProtoToMidi(drumSequence);
        console.log(midi);
    }

    jaiGenerate(e) {
        e.preventDefault();
        const drumSequence = buildNoteSequence();
        const rnnPlayer = new mag.Player();
        drumRnn.continueSequence(drumSequence, (16 * measures), temperature).then((sample) => rnnPlayer.start(sample));
    }

    //callback function for temp slider.
    changeTemperature(e, value) {
        e.preventDefault();
        temperature = (value / 60);
    }

    changeMeasures(e, value)
    {
        e.preventDefault();
        measures = value;
    }

        render() {

        initRnn();
        drumPlayer = new mag.Player();

            //in theory this comes from the DB.
            const drumNotes =
                {
                    notes: [
                        { pitch: 41},
                        { pitch: 42},
                        { pitch: 43},
                        { pitch: 44},
                        { pitch: 45},
                        { pitch: 46},
                        { pitch: 47},
                        { pitch: 48},
                    ]
                };

        //then we put them into the button element.
        const drumkit1 = <DrumKit pitch={drumNotes.notes[0].pitch} testCallback ={this.testSound}/>;
        const drumkit2 = <DrumKit pitch={drumNotes.notes[1].pitch} testCallback ={this.testSound}/>;
        const drumkit3 = <DrumKit pitch={drumNotes.notes[2].pitch} testCallback ={this.testSound}/>;
        const drumkit4 = <DrumKit pitch={drumNotes.notes[3].pitch} testCallback ={this.testSound}/>;
        const drumkit5 = <DrumKit pitch={drumNotes.notes[4].pitch} testCallback ={this.testSound}/>;
        const drumkit6 = <DrumKit pitch={drumNotes.notes[5].pitch} testCallback ={this.testSound}/>;
        const drumkit7 = <DrumKit pitch={drumNotes.notes[6].pitch} testCallback ={this.testSound}/>;
        const drumkit8 = <DrumKit pitch={drumNotes.notes[7].pitch} testCallback ={this.testSound}/>;

        const dash = <Dashboard tempCallback ={this.changeTemperature} measureCallback ={this.changeMeasures}/>;


        return (
            <div>

                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    {drumkit1}
                </div>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    {drumkit2}
                </div>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    {drumkit3}
                </div>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    {drumkit4}
                </div>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    {drumkit5}
                </div>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    {drumkit6}
                </div>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    {drumkit7}
                </div>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    {drumkit8}
                </div>
                <p>Let's make some music!</p>
                <div>{dash}</div>
                <button onClick={this.testNoteSequence}>test sequence</button>
                <button onClick={this.jaiGenerate}>Jai generate</button>
            </div>
        );
    }
}