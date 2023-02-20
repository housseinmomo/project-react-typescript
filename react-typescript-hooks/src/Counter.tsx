import { ChangeEvent, ReactNode, useReducer } from "react"
import { useCounter } from "./context/CounterContext"
import { useText } from "./context/CounterContext"
import { useColor } from "./context/CounterContext"

type ChildrenType = {
    children: (num: number) => ReactNode
}


const Counter = ({children}: ChildrenType) => {

    const {count, incrementer, decrementer} = useCounter()
    const {text, handleInputChange} = useText()
    const {color, toogleColor} = useColor()

    return <div style={{color: color ? "red" : "green"}}>
        <h1>{children(count)}</h1>
        <input  type="text" value={text} 
                onChange={handleInputChange}/>
        <h2>{text}</h2>
        <div>
            <button onClick={() => incrementer()}>+</button>
            <button onClick={() => decrementer()}>-</button>
            <button onClick={() => toogleColor()}>change color</button>
        </div>
    </div>
}

export default Counter