import React, { Component } from 'react';
import '../App.css';

class Note extends Component {
    constructor() {
        super();
        this.state = {
            showDetails: false
        }
    }

    toggleDetails = (e) => {
        this.state.showDetails ? e.target.innerHTML='(show details)' : e.target.innerHTML='(hide details)'
        this.setState({ showDetails: !this.state.showDetails })
    }

    removeNote = () => {
        this.props.removeNote(this.props.note);
    }

    render() {
        const note = this.props.note
        let details = note.details;
        if (note.details === '') details = '(no details)'
        return (
            <div className="note">
                <div>
                    <p className="timestamp">Recorded: {note.timeStamp}</p>
                    <p className="controls-container">
                        <span className="controls" id="toggle-details" onClick={this.toggleDetails}>(show details)</span>
                        <span className="controls" id="remove-note" onClick={this.removeNote}>(remove note)</span>
                    </p>
                </div>
                <h1 className="note-title">{note.title}</h1>
                {this.state.showDetails ? <div><hr /><span className="d">Details: </span>{details}</div> : null }
                
            </div>
        );
    }
}

export default Note;