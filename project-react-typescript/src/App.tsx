import { useState } from "react"
import { render } from "react-dom"
import Counter from "./components/Counter"
import Heading from "./components/Heading"
import List from "./components/List"
import Section from "./components/Section"


function App(){

  const [count, setCount] = useState<number>(1)

  return ( 
    <>
        <Heading title="Premier Projet avec React & Typescript" />
        <Section title="Difference between React and Flutter">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quisquam impedit consequuntur  <br/>
          vitae sapiente aperiam odit, iusto error porro nostrum neque magnam perspiciatis non ullam accusamus esse <br />
          possimus reiciendis officiis?
        </Section>
        <Section title="Difference between Java and C-Sharp">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quisquam impedit consequuntur  <br/>
          vitae sapiente aperiam odit, iusto error porro nostrum neque magnam perspiciatis non ullam accusamus esse <br />
          possimus reiciendis officiis?
        </Section>
        <Counter setCount={setCount}>Count : {count}</Counter>
        <List items={["coffee", "Coca-cola", "Pepsi"]} 
              render={ (item: string) => 
                    {return <span className="bold">{item}</span>}
                  } 
        />
    </>
          
   )
}

export default App
