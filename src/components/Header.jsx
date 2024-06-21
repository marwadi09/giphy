import React, { useEffect } from 'react'
import { useState } from 'react'
import { HiEllipsisVertical, HiMiniBars3BottomRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { GifState } from '../context/GifContext';
import GifSearch from './GifSearch';
const Header = () => {
    const [Categories, setCategories] = useState([]);
    const [showCategories, setshowCategories] = useState(false);
    const {gf,favorites}=GifState();
    const fetchGifCategories = async()=>{
      const {data}=await gf.categories();
      setCategories(data);
    }
    //he
    useEffect(()=>{
      fetchGifCategories();
    })
    // console.log(Categories);
  return (
    <nav>
        <div className='relative flex gap-4 justify-between items-center mb-2'>
            <Link to='/' className='flex gap-2'>
            <img src="/logo.svg" className='w-8' alt="Giphy logo" />
            <h1 className='text-5xl font-bold cursor-pointer tracking-tight'>GIPHY</h1>
            </Link>

          <div className='flex font-bold items-center text-md gap-2'>
            {/* render categories */}
            {Categories?.slice(0,5)?.map((category)=>{
              return (<Link key={category.name} to={`/${category.name_encoded}`} className='px-4 py-1 hover:gradient border-b-4 hidden lg:block'>
                {category.name}
              </Link>)
            })}
            
            <button onClick={()=>setshowCategories(!showCategories)}> 
              <HiEllipsisVertical size={35} 
              className={`py-0.5 hover:gradient ${showCategories? "gradient": ""} border-b-4 hidden lg:block`}   /> 
            </button>

            {favorites.length>0 && (<div className='h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded'>
              <Link to='/favorites'>Favorite GIFs</Link>
            </div>)}

            <button>
              <HiMiniBars3BottomRight className='text-sky-400 block lg:hidden' size={30}/>
            </button>
          </div>
          {showCategories && 
            (<div className='absolute right-0 top-14 px-10 pt-6 pb-9 w-full z-20 gradient'>
              <span className='text-3xl font-extrabold'>Categories</span>
              <hr className='bg-gray-100 my-5 opacity-50'/>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                {Categories?.map((category)=>{
                  return (<Link 
                    key={category.name}
                    to={`/${category.name_encoded}`}
                    className='font-bold'>{category.name}</Link>)
                })}
              </div>
            </div>)
          }
        </div>

        {/* search */}
        <GifSearch/>
    </nav>
  )
}

export default Header