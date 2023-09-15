import { configureStore } from '@reduxjs/toolkit';
import booksSlice from './slices/booksSlice';
import searchSlice from './slices/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
const store = configureStore({
  reducer: {
    booksSlice,
    searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;