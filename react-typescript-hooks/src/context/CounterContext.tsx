import React, { ChangeEvent, ReactElement, useCallback, useContext, useReducer } from 'react'
import { createContext } from 'react'
import Counter from '../Counter'


export const initState: StateType = {count: 0, text: "" , color: false}

type StateType = {    
    count: number,
    text: string,
    color: boolean,
}

const enum REDUCER_ACTION_TYPE {
    INCREMENT, 
    DECREMENT,
    NEW_INPUT,
    TG_COLOR
}

type ReducerAction = {type: REDUCER_ACTION_TYPE, payload?: string}


// state : represente l'evolution de notre initalState <valeur initial>
// actions : c'est l'objet qu'on va passer en param au niveau du dispatch

const reducer = (state: StateType, action: ReducerAction): StateType  => {
    switch(action.type){
        case REDUCER_ACTION_TYPE.INCREMENT:
            return {...state, count: state.count + 1}
        case REDUCER_ACTION_TYPE.DECREMENT:
            return {...state, count: state.count - 1}
        case REDUCER_ACTION_TYPE.NEW_INPUT:
            return {...state, text: action.payload ?? ""} // si c'est null <action.payload> on met rien
        case REDUCER_ACTION_TYPE.TG_COLOR:
            return {...state, color: !state.color}
        default:
            throw new Error()
    }
}

const useCounterContext = (initState: StateType) => {
        const [state, dispatch] = useReducer(reducer, initState)
        console.log(state) 

        //   // les fonctions anonyme sont recreer a chaque rendu
        // pour memoriser nos fonction, on va utiliser useCallback
        const incrementer = useCallback(() => dispatch({type: REDUCER_ACTION_TYPE.INCREMENT}), [])
        const decrementer = useCallback(() => dispatch({type: REDUCER_ACTION_TYPE.DECREMENT}), [])
        const toogleColor = useCallback(() => dispatch({type: REDUCER_ACTION_TYPE.TG_COLOR}), [])
        const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>  
        dispatch({type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value}),[])

        return {state, incrementer, decrementer, toogleColor, handleInputChange}
}

// Obtain the return type of a function type
type UseCounterContextType = ReturnType<typeof useCounterContext>

// On definie le context initial 
const initialContextState: UseCounterContextType = {
    state: initState,
    incrementer: () => {},
    decrementer: () => {},
    toogleColor: () => {},
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => {}
} 

// creation du contexte 
export const CounterContext = createContext<UseCounterContextType>(initialContextState)

type ChildrenType = {
    children?: ReactElement
}

// c'est le initialState qui evolue
export const CounterProvider = ({children, ...initState}: ChildrenType & StateType): ReactElement => {
    return (
        <CounterContext.Provider value={useCounterContext(initState)}>
            {children}
        </CounterContext.Provider>
    )
}

type UseCounterHookType = {
    count: number,
    incrementer: () => void,
    decrementer: () => void
}

export const useCounter = (): UseCounterHookType => {
    const {state: {count}, incrementer, decrementer} = useContext(CounterContext)
    return {count, incrementer, decrementer}
}

type UseCounterTextHookType = {
    text: string, 
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const useText = ():UseCounterTextHookType => {
    const {state: {text}, handleInputChange} = useContext(CounterContext)
    return {text, handleInputChange}
}

type UseCounterColorHookType = {
    color: boolean,
    toogleColor: () => void
}

export const useColor = (): UseCounterColorHookType => {
    const {state: {color}, toogleColor} = useContext(CounterContext)
    return {color, toogleColor}
}

export default CounterContext