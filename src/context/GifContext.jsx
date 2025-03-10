import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

const Gifcontext=createContext();

const GifProvider = ({children})=>{
    const [gifs,setgifs]=useState([]);
    const [filter,setfilter]=useState("gifs");
    const [favorites,setfavorites]=useState([]);

    const gf=new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

    return <Gifcontext.Provider value={{gf,gifs,setgifs,filter,setfilter,favorites}}>
        {children}
    </Gifcontext.Provider>
}

export const GifState=()=>{
    return useContext(Gifcontext);
}

export default GifProvider;