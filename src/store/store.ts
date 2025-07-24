import { configureStore } from '@reduxjs/toolkit'

import { clientsApi } from './api/clientsApi'

export const store = configureStore({
  reducer: {
    [clientsApi.reducerPath]: clientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(clientsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 