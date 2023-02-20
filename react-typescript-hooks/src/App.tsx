import { useState, useEffect, useCallback, MouseEvent, KeyboardEvent, useMemo, useRef } from 'react'
import Counter from './Counter'
import { CounterProvider, initState } from './context/CounterContext'



interface User {
  id: number, 
  username: string
}

type fibFunc = (n: number) => number


/**la suite de Fibonacci est une suite d'entiers dans laquelle chaque terme est la somme des deux termes qui le précèdent */
const fib: fibFunc = (n) => {
  // c'est dans le cas ou : [0, 1]
  if(n < 2) return n
  // nous aurons la somme des deux dernier terme 
  return fib(n - 1) + fib(n -2)
}

const myNum: number = 10

// 36 + 35 = 71
function App() {
  
  const [count, setCount] = useState<number>(0)
  const [users, setUsers] = useState<User[] | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    // console.log("mounting")
    // console.log("users: ", users)
    // return () => //console.log("unmounting");
  },[users])

  // les fonctions anonyme sont recreer a chaque rendu
  // pour memoriser nos fonction, on va utiliser useCallback
  const addTwo = useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void => setCount(count + 2), [count])
  const retrieveTwo = useCallback((): void => setCount(count - 2) ,[count])

  // on utilise ce hook pour les operations couteuse 
  // Renvoie une valeur mémoïsée
  const result = useMemo(() => fib(myNum), [myNum])

  // console.log(inputRef.current?.value)
  // console.log(inputRef.current)

  return (
    <>
      {/* <div className='App'></div>
      <h2>{count}</h2>
      <button onClick={addTwo}>Add Two</button>
      {count === 0 ? "" : <button onClick={retrieveTwo}>Retrieve Two</button>}
      <h3>{result}</h3>
      <input type="text" ref={inputRef} value="mugen" /> */}

      <CounterProvider count={initState.count} text={initState.text} color={initState.color}>
        <Counter>
          {(num: number) => <>Current Count {num}</>}
        </Counter>
      </CounterProvider>
      
      
    </>
  )
}

export default App
