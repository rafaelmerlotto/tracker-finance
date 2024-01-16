import { createContext, useContext } from "react";


export const contextCurrencyEUR = createContext({
    currency: Intl.NumberFormat('en-DE', {
        style: 'currency',
        currency: 'EUR'
     })
})

export const useCurrency =() => {
   return useContext(contextCurrencyEUR)
} 
