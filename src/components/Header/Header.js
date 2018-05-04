// @flow

import React from 'react'

const Header = () => (
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
)

export default Header
