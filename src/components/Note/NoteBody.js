// @flow

import React from 'react'

type Props = {
  body: string;
  onChangeBody: (body: string) => void;
  onChangePosition: (position: number) => void;
}

const NoteBody = ({ body, onChangeBody, onChangePosition }: Props) => {
  const _onChange = (event: any) => {
    onChangeBody(event.target.value)
  }

  const _onKeyUp = (event: any) => {
    onChangePosition(event.target.selectionStart)
  }

  return (
    <div>
      {/*
      <div
        contentEditable
        onChange={_onChange}
      >
        {body}
      </div>
      */}

      <textarea
        defaultValue={body}
        onChange={_onChange}
        onKeyUp={_onKeyUp}
        autoFocus
      />
      <p>
        {body}
      </p>
    </div>
  )
}

export default NoteBody
