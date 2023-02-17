import React, { ReactNode } from 'react'
import { useState } from 'react'

type CounterProps = {
    children: ReactNode, 
    setCount: React.Dispatch<React.SetStateAction<number>>
}
const Counter = ({children, setCount}: CounterProps) => {
  return (
    <>
        <h2>{children}</h2>
        <button onClick={() => setCount(prev => prev + 1)}>increment</button>
        <button onClick={() => setCount(prev => prev - 1)}>decrement</button>
    </>
  )
}

export default Counter