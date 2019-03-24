import React from 'react';

class DrumNote extends React.Component{
    render() {
        return(
            <li>{this.props.note.pitch}</li>
        )
    }
}

export default DrumNote;