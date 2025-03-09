import React from 'react'

type ContainerProps = {
  children: React.ReactNode
}

export default function ColumnMainContainer({ children }: ContainerProps) {
  return <div className="">{children}</div>
}
