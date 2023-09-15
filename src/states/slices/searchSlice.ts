import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'
interface State{
    search_text:string,
    category:string,
    order:string
}
const initialState:State = {
    search_text: 'javascript',
    category:'all',
    order:'relevance',

};

const serachSlice = createSlice({
    name: 'search_books',
    initialState,
    reducers: {
        setSearch:(state,action:PayloadAction<string>)=>{
            state.search_text = action.payload
        },
        setCategory:(state,action:PayloadAction<string>)=>{
            state.category = action.payload
        },
        setOrder:(state,action:PayloadAction<string>)=>{
            state.order = action.payload
        }
        
    },
});

export const { setSearch ,setCategory,setOrder} = serachSlice.actions;
export const selectSearch = (state: RootState) => state.searchSlice
export default serachSlice.reducer;
