import { Children, createContext, ReactElement, useEffect, useState } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number
}

// JSON SERVER : Get a full fake REST API with zero coding in less than 30 seconds (seriously)
// Created with <3 for front-end developers who need a quick back-end for prototyping and mocking.
// npx json-server -w (watch) path_ressource -p (port) number

const initState: ProductType[] = [
    {
        "sku": "item0001",
        "name": "Widget",
        "price": 9.99
    },        
    {
        "sku": "item0002",
        "name": "Premium Widget",
        "price": 19.99
    },        
    {
        "sku": "item0003",
        "name": "Deluxe Widget",
        "price": 29.99
    }
] 

export type UseProductsContextType = {products: ProductType[]}

const initContextState: UseProductsContextType = {products: []}

export const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = {children?: ReactElement | ReactElement[]}

export const ProductsProvider = ({children}: ChildrenType): ReactElement => {
    
    const [products, setProducts] = useState<ProductType[]>(initState)

    // Quand le tableau de depandance du useEffect est vide, alors la fonction va s'executer qu'une seule fois, au premier chargement 
    // useEffect(() => {
    //     const fetchProducts = async (): Promise<ProductType[]> => {
    //         const data = await fetch("http://localhost:3500/products").then(response => {
    //             return response.json()
    //         }).catch(err => {
    //             if(err instanceof Error) console.log(err.message)
    //         })
    //         return data     
    //     }

    //     fetchProducts().then(products => setProducts(products))
    // }, [])

  return (
    <ProductsContext.Provider value={{ products }}>
        {children}
    </ProductsContext.Provider>
  )
}

