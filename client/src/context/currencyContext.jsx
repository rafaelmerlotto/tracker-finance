
import { createContext, useContext } from "react";


export const contextCurrency = createContext({
   currencyEUR: Intl.NumberFormat('en-DE', {
      style: 'currency',
      currency: 'EUR'
   }),
   currencyUSD: Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
   }),
   currencyBRL: Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
   }),
})


export const useCurrency = () => {
   return useContext(contextCurrency)
} 




