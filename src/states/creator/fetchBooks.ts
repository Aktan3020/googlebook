import { createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadBooks } from "../../App";

interface Book {
    items: Array<any>;
    totalItems:number;
}
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (payload:PayloadBooks, thunkApi) => { 
    try {   
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${payload.search_text}?subject:${payload.category}&orderBy=${payload.order}&key=AIzaSyB-YZnSNyxGYSR3CgeYAHFFE0eAWb6AsUY`,{
            signal: payload.signal
        });
        const data: Book = await response.json();
        
        console.log('fetchdata',data);
        
        return data;
    } catch (err) { 
        return thunkApi.rejectWithValue("Произошла ошибка при загрузке книг."+ err);
    }
});

