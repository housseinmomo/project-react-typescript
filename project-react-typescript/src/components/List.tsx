import React, { ReactElement, ReactNode } from 'react'

interface ListProps<T>  {
    items: T[],
    render(item: T): ReactNode
}

const List = <T,>({items, render}: ListProps<T>) : ReactElement => {
  return (
    <ul>
        {items.map((item, index) => {
            return <li key={index}>
                {render(item)}
            </li>
        })}
    </ul>
  )
}

export default List