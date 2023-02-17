import React from 'react'
import { ReactNode } from 'react'

type sectionType = {
    title?: string, 
    children: ReactNode // nous offre beaucoup de possibilite
}

// on a utiliser la destructuration 
const Section = ({title = "Mon sujet", children}: sectionType) => {
  return (
    <>
        <h2>{title}</h2>
        <p>{children}</p>
    </>
  )
}

export default Section