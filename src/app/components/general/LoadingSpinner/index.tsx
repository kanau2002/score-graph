import React from 'react'

export default function LoadingSpinner() {
  return (
    <div
      className="inline-block size-16 animate-spin rounded-full border-8 border-solid border-[#61b1ed] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  )
}
