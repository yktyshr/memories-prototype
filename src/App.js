import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor() {
    super()

    this.state = {
      query: 'a',
      searchResults: {
        google: [],
      },
    }
  }

  _onUpdateQuery = (event) => {
    this.setState({ query: event.target.value })
    this.searchResults = 'https://www.google.co.jp/search?'
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Memories</h1>
        </header>
        <div className="App-body">
          <div className="App-body-note">
            <input
              defaultValue={this.state.query}
              onChange={this._onUpdateQuery}
            />
          </div>
          <div className="App-body-search">
            {this.state.query}
          </div>
          <iframe src="https://www.google.co.jp/search?q=hoge" title="iframe example 1" width="400" height="300">
            <p>Your browser does not support iframes.</p>
          </iframe>
        </div>
      </div>
    )
  }
}

export default App
