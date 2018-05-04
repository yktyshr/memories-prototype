// @flow

import React from 'react'

type Props = {
  body: string;
  onChangeBody: (body: string) => void;
}

const NoteBody = ({ body, onChangeBody }: Props) => {
  const _onChange = (event: any) => {
    onChangeBody(event.target.value)
  }

  return (
    <div>
      <div
        contentEditable
        onChange={_onChange}
      >
        {body}
      </div>

      <input
        defaultValue={body}
        onChange={_onChange}
      />
      {body}
    </div>
  )
}

export default NoteBody
