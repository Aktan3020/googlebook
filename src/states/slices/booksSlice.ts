import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'
import { fetchBooks } from '../creator/fetchBooks'
import { normalize } from 'path';
interface BooksItems{
  items:Array<object>;
  totalItems:number
}
interface Books {
  books: BooksItems;
  isloading: boolean;
  error: string | null,
}


const initialState: Books = {
  books: {
    items:[],
    totalItems:0
  },
  isloading: false,
  error: '',

};

const BooksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    deleteBooks:(state,action:PayloadAction<string>)=>{
      state.books.items = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isloading = true
    });
    builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<BooksItems>) => {
      action.payload.items? state.books.items.push(...action.payload.items):state.books ={
        items:[],
        totalItems:0
      }
      state.books.totalItems = action.payload.totalItems
      state.isloading = false 

    });
    builder.addCase(fetchBooks.rejected, (state, action: any) => {
      if (action.payload) {
        state.error = action.payload
      } else {
        state.error = action.error.message
      }
      state.isloading = false
    });
  },
});

export const {deleteBooks } = BooksSlice.actions;
export const selectBooks = (state: RootState) => state.booksSlice
export default BooksSlice.reducer;
