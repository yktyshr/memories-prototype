// @flow

import React from 'react'
import Article from 'src/models/Article'

type Props = {
  article: Article;
}

const NoteHeader = ({ article }: Props) => (
  <header>
    <ul className="note-collaborator">
      <li><img alt="hoge" src="user_1.png" /></li>
      <li><img alt="hoge" src="user_2.png" /></li>
      <li><i className="material-icons">add</i></li>
    </ul>

    <p className="note-directory"><i className="material-icons">folder</i> <span>考察メモ</span></p>
    <h1 className="note-title">無題のノート
    </h1>
    <p className="note-just-saved">10秒前に保存されました</p>
  </header>
)

export default NoteHeader
