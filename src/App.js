// @flow

import React, { Component } from 'react'
import { search } from 'src/services/api'
import Note from 'src/components/Note/Note'
import Header from 'src/components/Header/Header'
import Article from 'src/models/Article'
import 'src/App.css'
import { getCurrentWord } from 'src/utils'

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
    if (this.state.query === query) {
      return
    }
    this.setState({
      query,
    })
    const google = await search(query)
    this.setState({
      searchResults: {
        google,
      },
    })
  }

  _onChangePosition = (position: number) => {
    const cword = getCurrentWord(this.state.article.body, position)
    if (cword.includes('#')) {
      this._onUpdateQuery(cword.replace('#', '').replace(' ', ''))
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-body">
          <div className="App-body-note">
            <Note article={this.state.article} onChange={this._onUpdateArticle} onChangePosition={this._onChangePosition} />
          </div>

          <div className="App-body-search">
            {/*
            <iframe src={'http://localhost:8080/iframe?url=https://qiita.com/sl2/items/1e503952b9506a0539ea'} title="iframe example 1" width="400" height="300">
              <p>Your browser does not support iframes.</p>
            </iframe>
            */}
            <div className="search-header">
              <h2><i className="material-icons">search</i> <span>{this.state.query}</span></h2>
            </div>
            {this.state.searchResults.google.map(({ title, url, description }) =>
              <div key={url} className="search-result-item">
                <a target="_blank" href={url}>{title}</a>
                <p className="search-url">{url}</p>
                <p className="search-description">{description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
