// @flow

import React from 'react'
import Article from 'src/models/Article'
import NoteBody from 'src/components/Note/NoteBody'
import _ from 'lodash'

type Props = {
  article: Article;
  onChange: (article: Article) => void;
}

const Note = ({ article, onChange }: Props) => {
  const _onChangeBody = (body: string) => {
    onChange(_.merge(article, { body }))
  }

  return (
    <div>
      <NoteBody body={article.body} onChangeBody={_onChangeBody} />
    </div>
  )
}

export default Note
