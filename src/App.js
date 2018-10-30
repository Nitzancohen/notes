import React, { Component } from 'react';
import './App.css';
import Note from './components/Note';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: this.getFromLS(),
      currentTitle: '',
      currentDetails: '',
      search: ''
    }
  }

  saveToLS = () => {
    localStorage.setItem('notes', JSON.stringify(this.state.notes))
  }

  getFromLS = () => {
    return JSON.parse(localStorage.getItem('notes') || '[]')
  }

  bindTitle = (e) => {
    this.setState({ currentTitle: e.target.value })
  }

  bindDetails = (e) => {
    this.setState({ currentDetails: e.target.value })
  }

  bindSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  addNote = () => {
    if (this.state.currentTitle !== '')
    {
      let time = new Date();
      let timeStamp = time.toString().substr(0, 25);
      let notes = [...this.state.notes]
      let newNote = { title: this.state.currentTitle, details: this.state.currentDetails, timeStamp: timeStamp }
      notes.push(newNote)
      this.setState({ notes: notes, currentTitle: '', currentDetails: '' }, ()=>{this.saveToLS()})
    }
  }

  removeNote = (noteToRemove) => {
    let notes = [...this.state.notes]
    notes.splice(notes.indexOf(noteToRemove), 1)
    this.setState({ notes : notes }, ()=>{this.saveToLS()})
  }

  render() {
    let notes = this.state.notes.filter(n => n.title.includes(this.state.search) || n.details.includes(this.state.search) )
    return (
      <div className="App">
          <h1 id="App-title">Notes.</h1>
          <input type="text" id="search-bar" placeholder="search..." value={this.state.search} onChange={this.bindSearch}></input>
        <header className="App-header">
          <input type="text" placeholder="Title" value={this.state.currentTitle} onChange={this.bindTitle}></input><br />
          <input type="text" placeholder="Details" id="details" value={this.state.currentDetails} onChange={this.bindDetails}></input><br />
          <button type="button" id="add-note" onClick={this.addNote}>Add Note</button>
        </header>
        <div className="notes-continer">
          {notes.map(n => { return <Note key={n.timeStamp} note={n} removeNote={this.removeNote} /> })}
        </div>
      </div>
    );
  }
}

export default App;
