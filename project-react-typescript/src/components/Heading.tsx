import  {ReactElement} from 'react'
import React from 'react'

// controller les types des props de nos component 
type headingProps = {title: string}

// on a utiliser la destructuration
const Heading = ({title}: headingProps): ReactElement => {
  return <h1>{title}</h1>
}

export default Heading