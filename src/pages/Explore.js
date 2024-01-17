import Sidebar from '../nav/Sidebar.js'
import GlobalAPI from '../services/GlobalAPI'
import { useEffect, useState } from 'react'
import Star from '../assets/star.svg'
import { UserAuth } from '../context/AuthContext.js'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';    

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Explore = () => {
    const [gameList, setGameList] = useState([]);
    const [gameLikes, setGameLikes] = useState(() => {
        const storedLikes = localStorage.getItem('likedGames');
        return storedLikes ? JSON.parse(storedLikes) : {};
    });
    const { addEntry, delEntry } = UserAuth(); 

    useEffect(() => {
        localStorage.setItem('likedGames', JSON.stringify(gameLikes));
    }, [gameLikes]);

    const getGamesList = () => {
        GlobalAPI.getGamesList.then((resp) => {
            console.log(resp);
            setGameList(resp.data.results);
        });
    };

    const handleAddGame = (id) => {
        // Check if the game is already liked
        const isLiked = gameLikes[id];

        // If the game is not liked, add it to the database
        if (!isLiked) {
            addEntry(id);
        } else {
            // If the game is liked, remove it from the database
            delEntry(id);
        }

        // Toggle the like status in the local state
        setGameLikes((prevLikes) => {
            const newLikes = { ...prevLikes, [id]: !isLiked };
            return newLikes;
        });
    };

    const handleTBP = (id) => {
        // Handle bookmark functionality here
    };

    useEffect(() => {
        getGamesList();
    }, []);

    return (
        <div>
            <Sidebar />
            <div className='explore'>
                {gameList.map((item) => (
                    <div className="card" key={item.id}>
                        <img className="game-img" src={item.background_image} alt="in-game screenshot" />
                        <h3 className="name">{item.name}</h3>
                        <h3 className="rating">{item.rating} <img className="icon" src={Star} alt="star" /></h3>
                        <p>{item.id}</p>
                        <div className="boxes">
                            <Checkbox
                                {...label}
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                onChange={(event) => handleAddGame(item.id)}
                                checked={gameLikes[item.id] || false}
                            />
                            <Checkbox
                                {...label}
                                icon={<BookmarkBorderIcon />}
                                checkedIcon={<BookmarkIcon />}
                                onChange={() => handleTBP(item.id)}
                                checked={false} 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Explore;
