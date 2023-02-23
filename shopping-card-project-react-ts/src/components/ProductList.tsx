import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import { UseProductsContextType } from "../context/ProductsProvider"
import { ReactElement } from "react"
import Product from "./Product"

const ProductList = () => {

  const {dispatch, REDUCER_ACTIONS, cart} = useCart()
  const {products} = useProducts()

  console.log(products);
  

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

  if(products?.length) {
    pageContent = products.map((product) => {
      // on verifie si le produit est sur la cart 
      const inCart: boolean = cart.some(item => item.sku === product.sku)
       
      return (
        <Product 
          key={product.sku}
          product={product}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      )
    })
  }

  const content = (
    <main className="main main--products">
      {pageContent}
    </main>
  )

  return content
}

export default ProductList