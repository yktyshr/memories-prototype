// @flow

import React from 'react'
import Article from 'src/models/Article'

type Props = {
  article: Article;
  onChangeBody: (event: any) => void;
}

const Note = ({ article, onChangeBody }: Props) => (
  <div>
    <input
      contentEditable={true}
      defaultValue={article.body}
      onChange={onChangeBody}
    />
    {article.body}
  </div>
)

export default Note
