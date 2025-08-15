import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const loadFromLocalStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveToLocalStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items))
  }
}

const initialState: CartState = {
  items: loadFromLocalStorage()
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 })
        toast.success(`${action.payload.title} added to cart`)
      }
      saveToLocalStorage(state.items)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const removedItem = state.items.find(item => item.id === action.payload)
      state.items = state.items.filter(item => item.id !== action.payload)
      if (removedItem) toast.error(`${removedItem.title} removed from cart`)
      saveToLocalStorage(state.items)
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.quantity += 1
      }
      saveToLocalStorage(state.items)
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
      saveToLocalStorage(state.items)
    },
    clearCart: (state) => {
      state.items = []
      saveToLocalStorage(state.items)
    }
  }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
