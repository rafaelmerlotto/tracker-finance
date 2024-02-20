import { configureStore } from '@reduxjs/toolkit'
import currencySlice from '../feature/currencySlice'

export default configureStore({
  reducer: {
    count: currencySlice
  }
})