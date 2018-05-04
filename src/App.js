// @flow

import React, { Component } from 'react'
import { search } from 'src/services/api'
import './App.css'

type SearchResults = {
  url: string;
  title: string;
  description: string;
}

type Providers = {
  google: Array<SearchResults>;
}

type State = {
  query: string;
  searchResults: Providers;
}

class App extends Component<{}, State> {
  constructor() {
    super()

    this.state = {
      query: 'a',
      searchResults: {
        google: [],
      },
    }
  }

  _onUpdateQuery = async(event: any) => {
    this.setState({
      query: event.target.value,
    })

    const google = await search(event.target.value)
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
              contentEditable={true}
              defaultValue={this.state.query}
              onChange={this._onUpdateQuery}
            />hoge
          </div>
          <div className="App-body-search">
            <iframe src={'http://localhost:8080/iframe?url=https://qiita.com/sl2/items/1e503952b9506a0539ea'} title="iframe example 1" width="400" height="300">
              <p>Your browser does not support iframes.</p>
            </iframe>
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
