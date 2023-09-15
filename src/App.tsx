import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import './App.css';
import { fetchBooks } from './states/creator/fetchBooks';
import { useAppDispatch, useAppSelector } from './states/store';
import { setSearch } from './states/slices/searchSlice';
import { deleteBooks } from './states/slices/booksSlice';
import { setCategory ,setOrder} from './states/slices/searchSlice';
interface ItemsEl {
  volumeInfo?: {
    title: string,
    imageLinks: {
      thumbnail: string
    },
    description: string,
    categories: Array<string>,
    authors: Array<string>,
    readingModes?: {
      image: boolean
    }
  };
}
export interface PayloadBooks {
  search_text: string;
  start: number;
  signal: AbortSignal;
  category:string,
  order:string
}
function App(): ReactElement {
  const [text, setText] = useState('javascript')
  const [start, setStart] = useState(0)
  const { books, isloading, error } = useAppSelector((state) => state.booksSlice)
  const { search_text,category ,order} = useAppSelector((state) => state.searchSlice)
  console.log(category);
  
  const dispatch = useAppDispatch()

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(fetchBooks({ search_text, start, signal,category,order } as PayloadBooks))
    return () => {
      controller.abort();
    };
  }, [search_text, start,category])
  return (
    <div className="App">
      {
        isloading ? 'loading...' :
          <>
            <header>
              <h1 className='title'>Search Books</h1>
              <div className='search_container'>
                <input type="search" value={text} className='search_container_input' placeholder='Война и мир...' onChange={(e) => { setText(e.target.value); dispatch(deleteBooks('')) }} /><button className='search_container_button' onClick={() => dispatch(setSearch(text))}>поиск</button>
              </div>
            </header>
            <select onChange={(e)=>{
             dispatch( setOrder(e.target.value))
            }}>
              <option value="relevance ">relevance </option>
              <option value="newest ">newest </option>
            </select>
            <select value={category} onChange={(e)=>{dispatch(setCategory(e.target.value));dispatch(deleteBooks(''))}}>
              <option value="all">all</option>
              <option value="art">art</option>
              <option value="biography">biography</option>
              <option value="computers">computers</option>
              <option value="history">history</option>
              <option value="medical">medical</option>
              <option value="poetry">poetry</option>
            </select>
            <h3>Total Results {books.totalItems}</h3>
            <div className='books_container'> 
            
             {
              books.items.map((el: ItemsEl, index: number): ReactElement<any, string | JSXElementConstructor<any>> => {
                const descLength: number | undefined = el.volumeInfo?.description?.length ?? 0;
                return (
                  <div key={index} className='book'>
                    <img src={el.volumeInfo?.readingModes?.image ? el.volumeInfo?.imageLinks.thumbnail : ''} alt="google books image" />
                    <p className='book_title'>{el.volumeInfo?.title}</p>
                    <p className='book_desc'>
                      {descLength > 150 ? el.volumeInfo?.description.substring(0, 110) + '...' : el.volumeInfo?.description}
                    </p>
                    <h4>Category</h4>
                    <div className='book_category'>
                      {el.volumeInfo?.categories !== undefined ? el.volumeInfo?.categories[0] : ''}
                    </div><h4>Authors</h4>
                    <div className='book_authors'>
                      { el.volumeInfo?.authors !==undefined? el.volumeInfo?.authors.map((el) => {
                        return (
                          <div className='book_author'>
                            {el}
                          </div>
                        )
                      }) :''}

                    </div>

                  </div>
                )

              })
            }
              <button className='load_more' onClick={() => {
                setStart((prew) => prew + 30)

              }}>load more</button>
            </div>
          </>
      }
    </div>
  );
}

export default App;