import React from 'react'

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  title?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export default function Button(props: ButtonProps) {
  // TODO:LINKでも対応できるようにコンポーネント修正
  // TODO:ボーダータイプも考慮する
  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={
        props.className ??
        `w-full rounded-md bg-[#D6722E] px-4 py-2 font-bold text-white
        shadow-[0_2px_2px_0px_rgba(0,0,0,0.3),0_0px_6px_0px_rgba(0,0,0,0.1)]
        ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}`
      }
      style={props.style ?? {}}
    >
      {props.children ?? props.title ?? 'ボタン'}
    </button>
  )
}
