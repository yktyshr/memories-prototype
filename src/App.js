// @flow

import React, { Component } from 'react'
import { search } from 'src/services/api'
import Note from 'src/components/Note/Note'
import Article from 'src/models/Article'
import 'src/App.css'

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
  article: Article;
  searchResults: Providers;
}

const getWordStart = (text, index) => {
  if (! text[index]) {
    return 0
  }
  if (text[index] === ' ') {
    return index
  }
  return getWordStart(text, index - 1)
}

const getWordEnd = (text, index) => {
  if (! text[index]) {
    return text.length // TODO: When cursor is at the end of line, always returns true
  }
  if (text[index] === ' ') {
    return index
  }
  return getWordEnd(text, index + 1)
}

const getCurrentWord = (text, index) => {
  const start = getWordStart(text, index)
  const end = getWordEnd(text, index)

  return text.slice(start, end)
}

class App extends Component<{}, State> {
  constructor() {
    super()

    this.state = {
      query: '',
      article: {
        title: '',
        body: '安藤忠雄との比較',
      },
      searchResults: {
        google: [],
      },
    }
  }

  _onUpdateArticle = (article: Article) => {
    this.setState({ article })
  }

  _onUpdateQuery = async(query: string) => {
    const google = await search(query)
    this.setState({
      query,
      searchResults: {
        google,
      },
    })
  }

  _onChangePosition = (position: number) => {
    const cword = getCurrentWord(this.state.article.body, position)
    if (cword.includes('#')) {
      this._onUpdateQuery(cword)
    }
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
                <img alt="User" src="user_1.png" />
              </div>
              <i className="material-icons">more_vert</i>
            </div>
          </div>
        </header>

        <div className="App-body">
          <div className="App-body-note">
            <article>
              <header>

                <ul className="note-collaborator">
                  <li><img alt="hoge" src="user_1.png" /></li>
                  <li><img alt="hoge" src="user_2.png" /></li>
                  <li><i className="material-icons">add</i></li>
                </ul>

                <p className="note-directory"><i className="material-icons">folder</i> <span>考察メモ</span></p>
                <h1 className="note-title">タイトル</h1>
                <p className="note-just-saved">10秒前に保存されました</p>


              </header>
              <Note article={this.state.article} onChange={this._onUpdateArticle} onChangePosition={this._onChangePosition} />
            </article>
          </div>

          <div className="App-body-search">
            {/*
            <iframe src={'http://localhost:8080/iframe?url=https://qiita.com/sl2/items/1e503952b9506a0539ea'} title="iframe example 1" width="400" height="300">
              <p>Your browser does not support iframes.</p>
            </iframe>
            */}
            <div>
              {this.state.query}
            </div>
            {this.state.searchResults.google.map(({ title, url, description }) =>
              <div key={url}>
                <a href={url}>{title}</a>
                <p>{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
