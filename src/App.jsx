import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Category from './pages/Category'
import Search from './pages/Search'
import GifPage from './pages/GifPage'
import Favorites from './pages/Favorites'
// @ts-ignore
import Home from './pages/Home'
import GifProvider from './context/GifContext'

const router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/:category",
        element: <Category />
      },
      {
        path:"/search/:query",
        element: <Search />
      },
      {
        path:"/:type/:slug",
        element: <GifPage />
      },
      {
        path:"/favorites",
        element: <Favorites />
      }
    ]
  }
])

function App() {
  
  return (
  <GifProvider>
    <RouterProvider router={router} />
  </GifProvider>
  )
}

export default App
