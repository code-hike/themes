"use client"

import { createContext, useContext, useRef } from "react"
import { useStore } from "zustand"

import { Actions, State, createMyStore } from "./store"

type Store = ReturnType<typeof createMyStore>

const StoreContext = createContext<Store | null>(null)

type StoreProviderProps = React.PropsWithChildren<{
  initialState: State
}>

export function StoreProvider({ children, initialState }: StoreProviderProps) {
  const storeRef = useRef<Store>()
  if (!storeRef.current) {
    storeRef.current = createMyStore(initialState)
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

export function useSelector<T>(
  selector: (state: State & Actions) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(StoreContext)
  if (!store) throw new Error("Missing StoreProvider in the tree")
  return useStore(store, selector, equalityFn)
}
