import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/GifContext';
import Gif from '../components/Gif';
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from 'react-icons/hi2';

const contentType=["gifs","stickers","texts"];
const GifPage = () => {
  const {type,slug}=useParams();
  const [gif,setgif]=useState({});
  const [readmore,setreadmore]=useState(false);
  const [relatedgif,setrelatedgif]=useState([]);
  const {gf}=GifState();

  const fetchGif=async()=>{
    const gifId=slug.split("-");
    const {data} = await gf.gif(gifId[gifId.length-1]);
    const {data:related} = await gf.related(gifId[gifId.length-1],{
      limit:10,
    });
    setgif(data);
    setrelatedgif(related);
  };

  useEffect(()=>{
    if(!contentType.includes(type)){
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  },[])
  return (
    <div className='grid grid-cols-4 my-10 gap-4'>
      <div className='hidden sm:block'>
        {gif?.user && (
          <>
            <div className='flex gap-1'>
              <img src={gif?.user?.avatar_url} alt={gif?.user?.display_name} className='h-14' />
            </div>
            <div className="px-2">
              <div className="font-bold">{gif?.user?.display_name}</div>
              <div className="font-thin">@{gif?.user?.username}</div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readmore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center font-bold cursor-pointer"
                  onClick={() => setreadmore(!readmore)}
                >
                  {readmore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <div className='divider'></div>
      </div>

      <div className='col-span-4 sm:col-span-3'>
        <div className='flex gap-6'>
          <div className='w-full sm:w-full'>
            <div className='truncate mb-2'>{gif.title}</div>
            <Gif gif={gif} hover={false}/>
            {/* mobile ui */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="font-semibold">@{gif?.user?.username}</div>
              </div>
            {/*mobile ui */}
            </div>
          </div>
        </div>
        
        <div>
          <div className='font-extrabold text-xl capitalize mb-2 text-center'>related gifs</div>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedgif.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GifPage