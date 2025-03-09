import React from 'react'

type ContainerProps = {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDF4EC]">{children}</div>
  )
}
