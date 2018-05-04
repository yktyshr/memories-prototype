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
          <div className="container">
            <div className="header-left">
              <i className="material-icons">dehaze</i>
              <h1 className="App-title">Memories</h1>
            </div>
            <div className="header-center">
              <input type="search" placeholder="検索キーワードを入力"/>
            </div>
            <div className="header-right">
              <div className="header-user-icon-wrap">
                <img src="user_1.png" />
              </div>
              <i className="material-icons">more_vert</i>
            </div>
          </div>
        </header>



        <div className="App-body">
          <div className="App-body-note">
            <input
              defaultValue={this.state.query}
              onChange={this._onUpdateQuery}
            />
          </div>


          <div className="App-body-search">
            <iframe src={'http://localhost:8080/iframe?url=https://qiita.com/sl2/items/1e503952b9506a0539ea'} title="iframe example 1" width="400" height="300">
              <p>Your browser does not support iframes.</p>
            </iframe>
            <iframe src={'http://localhost:8080/iframe?url=https://www.google.co.jp/search?q=' + this.state.query} title="iframe example 2" width="400" height="300">
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
