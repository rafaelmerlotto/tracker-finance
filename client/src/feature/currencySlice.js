import { createSlice } from '@reduxjs/toolkit'

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    value: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }),
  },
  reducers: {
    BRL: state => {
      state.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    },
    EUR: state => {
      state.value = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
      })
    },
    GBP: state => {
      state.value = new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP'
      })
    },
    INR: state => {
      state.value = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      })
    },
    USD: state => {
      state.value = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
  }
})

export const { BRL, EUR, GBP, INR, USD } = currencySlice.actions

export default currencySlice.reducer