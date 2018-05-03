import React, { Component } from 'react'
import './App.css'

const http = {
}

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

  _onUpdateQuery = async(event) => {
    this.setState({
      query: event.target.value,
    })

    const google = await (await fetch('http://localhost:8080/search?q=' + event.target.value)).json()
    this.setState({
      searchResults: {
        google,
      },
    })
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
            <div className="App-body-search">
              {this.state.query}
            </div>
            {this.state.searchResults.google.map(({ title, url, }) =>
              <div key={url}>{title} {url}</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
