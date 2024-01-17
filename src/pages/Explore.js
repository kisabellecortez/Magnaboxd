import Sidebar from '../nav/Sidebar.js'
import GlobalAPI from '../services/GlobalAPI'
import { useEffect, useState } from 'react'
import Star from '../assets/star.svg'

const Explore =()=>{
    const [gameList, setGameList] = useState([])
    const [genreList, setGenreList] = useState([])

    useEffect(()=>{
        getGamesList()
    }, [])

    const getGamesList=()=>{
        GlobalAPI.getGamesList.then((resp)=>{
            console.log(resp)
            setGameList(resp.data.results)
        })

    }

    return(
        <div>
            <Sidebar/>
            <div className='explore'>
                {gameList.map((item)=>(
                    <div className="card">
                        <img className="game-img"src={item.background_image} alt="in-game screenshot"></img>
                        <h3 className="name">{item.name}</h3>
                        <h3 className="rating">{item.rating} <img className="icon" src={Star} alt="star"></img></h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Explore; 