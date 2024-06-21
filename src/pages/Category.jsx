import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GifState } from '../context/GifContext';
import Gif from '../components/Gif';

const Category = () => {
  const [results,setResults] = useState([]);
  const {category} = useParams();


  const {gf}=GifState();
  const fetchResults=async() =>{
    const {data} = await gf.gifs(category,category);
    setResults(data);
  }

  useEffect(()=>{
    fetchResults();
  },[category]);

  return (
    <div className='flex flex-col sm:flex-row gap-5 my-4'>
      <div className='w-full sm:w-72'>
        {results.length>0 && <Gif gif={results[0]} hover={false} />}
        <span className='text-gray-400 pt-2 text-sm'>Don&apos;t tell it to me, GIF it to me</span>
        <div className='divider'></div>
      </div>
      <div className='text-4xl pb-1 capitalize font-extrabold'>
        <h2>{category.split("-").join(" & ")} GIFs</h2>
        <h2 className='text-lg text-gray-400 font-bold pb-3 hover:text-gray-500 cursor-pointer'>
          @{category}
        </h2>
        {results.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
            {results.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category