
import { createContext, useContext } from "react";


export const contextCurrency = createContext({
   currencyEUR: new Intl.NumberFormat('en-DE', {
      style: 'currency',
      currency: 'EUR'
   }),
   currencyUSD: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
   }),
   currencyBRL: new Intl.NumberFormat('br-BR', {
      style: 'currency',
      currency: 'BRL'
   }),
   currencyINR: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
   }),
   currencyGBP: new Intl.NumberFormat('en-UK', {
      style: 'currency',
      currency: 'GBP'
   }),
})


export const useCurrency = () => {
   return useContext(contextCurrency)
} 




