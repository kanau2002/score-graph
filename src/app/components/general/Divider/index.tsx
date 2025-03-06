import React from 'react'

type DividerProps = {
  style?: React.CSSProperties
}

export default function Divider({ style }: DividerProps) {
  return (
    <div className="mb-4 border-b border-gray-200" style={style ?? {}}></div>
  )
}
