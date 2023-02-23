import { createContext, ReactElement, useMemo, useReducer } from "react"

export type CartItemType = {
    sku: string, 
    name: string,
    price: number,
    qty: number
}

type CartStateType = {cart: CartItemType[]}

const initCartState: CartStateType = {cart: []}

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType,
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch(action.type){
        case REDUCER_ACTION_TYPE.ADD: {
            // Ajout au panier : 
        
            if(!action.payload) throw new Error("action.payload missing in ADD action")
            
            const {sku, name, price }: CartItemType = action.payload

            // On recupere les items qui n'ont pas ete ajouter 
            const filterdCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            // On recupere le item qui a ete ajouter au panier 
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            const qty: number = itemExists ?  itemExists.qty + 1 : 1

            // On recupere le state, ainsi que le cart // on y ajoute l'ensemble des {} qui ne ne sont pas concerner 
            // On ajoute a la fin notre nouvelle objet modifier 
            return {...state, cart: [...filterdCart, {sku, name, price, qty}]}
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            
            // Supprimer un item du panier

            if(!action.payload) throw new Error("action.payload missing in REMOVE action")

            const {sku }: CartItemType = action.payload

            // On recupere l'ensemble des items qui ne sont pas concerner par la suppression 
            const filterdCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            // nous allons retourner un tableau de cart en ommetant celui avec le id specifier au niveau du payload 
            return {...state, cart: [...filterdCart]}
   
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            // On vide la liste apres le submit
            return {...state, cart: []}
        }
        case REDUCER_ACTION_TYPE.QUANTITY:{
            
            if(!action.payload) throw new Error("action.payload missing in REMOVE action")
            
            const {sku, qty }: CartItemType = action.payload

            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            if(!itemExists) throw new Error("Item must exist in order to update quantity")

            const updateItem: CartItemType = {...itemExists, qty}

            const filterdCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

            return {...state, cart: [...filterdCart, updateItem]}
        }
        default: {
            throw new Error("Unidentified reducer action type")
        }
    }
}

export const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initCartState)

    // Memoriser dans une constante l'ensemble des actions au premier render
    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    // On fait la somme de l'ensemble des qty dans notre liste de cart
    const totalItems:number = state.cart.reduce((previousValue: number, cartItem: CartItemType) => {
        return previousValue + cartItem.qty
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', {style: 'currency', currency: "USD"}).format(
        state.cart.reduce((previousValue: number, cartItem: CartItemType) => {
            return previousValue + (cartItem.price * cartItem.qty)
        }, 0)
    )

    // Pour respecter l'ordre entre les  cartes 
    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}
} 

// Il s'agit du type de retour de notre contexte
// Il s'agit egalement du type de retour de notre custom hook useCartContext
export type UseCartContextType = ReturnType<typeof useCartContext>

// Il s'agit desdonnees initiale de notre contexte
const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: []
}

// Il s'agit de notre contexte pour la cart
export const CartContext = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = {children?: ReactElement | ReactElement[]}

export const CartProvider = ({children}: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext