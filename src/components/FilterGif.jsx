import React from 'react'
import { GifState } from '../context/GifContext';
import { HiMiniArrowTrendingUp } from 'react-icons/hi2';
const filters = [
    {
      title: "GIFs",
      value: "gifs",
      background:
        "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
    },
    {
      title: "Stickers",
      value: "stickers",
      background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
    },
    {
      title: "Text",
      value: "text",
      background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
    },
  ];

const FilterGif = ({alignLeft=false,showTrending=false}) => {
    const {filter,setfilter}=GifState();
  return (
    <div className={`flex my-3 gap-3 ${alignLeft?"":"justify-end"} ${showTrending? "justify-between flex-col sm:flex-row sm:items-center":""}`}>
        {
            showTrending && (
            <span className='flex gap-2'>
                {showTrending && (<HiMiniArrowTrendingUp size={25} className='text-teal-500' />)}
                <span className='font-semibold text-gray-400'>Trending</span>
            </span>
            )
        }
        <div className='flex min-w-80 rounded-full bg-gray-800'>
            {filters.map((f)=>{
                return <span onClick={()=>setfilter(f.value)} className={`${filter===f.value?f.background:""} font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer`}>{f.title}</span>;
            })}
        </div>
    </div>
  )
}

export default FilterGif