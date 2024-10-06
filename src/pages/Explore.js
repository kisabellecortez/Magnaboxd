import { useEffect, useState } from 'react'
import Sidebar from '../nav/Sidebar.js'
import Star from '../assets/star.svg'

//RAWG
import GlobalAPI from '../services/GlobalAPI'

//Firebase
import { UserAuth } from '../context/AuthContext.js'

//Material UI components
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Explore = () => {
    const [gameList, setGameList] = useState([]);
    const { addLike, delLike, addSave, delSave } = UserAuth(); 
    const [gameLikes, setGameLikes] = useState(() => {
        const storedLikes = localStorage.getItem('likedGames');
        return storedLikes ? JSON.parse(storedLikes) : {};
    });
    const[gameSaves, setGameSaves] = useState(() => {
        const storedSaves = localStorage.getItem('savedGames'); 
        return storedSaves ? JSON.parse(storedSaves) : {}; 
    })

    // update local storage items when modified
    useEffect(() => {
        localStorage.setItem('likedGames', JSON.stringify(gameLikes));
        localStorage.setItem('savedGames', JSON.stringify(gameSaves));
    }, [gameLikes, gameSaves]);

    // get list of games from api 
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
            addLike(id);
        } else {
            // If the game is liked, remove it from the database
            delLike(id);
        }

        // Toggle the like status in the local state
        setGameLikes((prevLikes) => {
            const newLikes = { ...prevLikes, [id]: !isLiked };
            return newLikes;
        });
    };

    const handleTBP = (id) => {
        const isSaved = gameSaves[id]; 

        // add to db 
        if(!isSaved){
            addSave(id); 
        }
        else{
            delSave(id); 
        }

        setGameSaves((prevSaves) => {
            const newSaves = { ...prevSaves, [id]: !isSaved }; 
            return newSaves;
        })
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
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={item.background_image}
                                alt="game image"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                {item.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    <p className="rating">Global Rating: {item.rating}<img className="icon" src={Star} alt="star" /></p>
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Button size="small" color="primary">
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
                                    checked={gameSaves[item.id] || false} 
                                />
                            </Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Explore;
