import { useState, useEffect, useContext } from 'react'
import Sidebar from '../nav/Sidebar.js'
import Star from '../assets/star.svg'

//RAWG
import GlobalAPI from '../services/GlobalAPI'

//Firebase
import { db } from '../firebase.js'
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

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

const MyGames =()=>{
    const [games, setGames] = useState([]); // store the liked games 
    const [gameList, setGameList] = useState([]); // stores list of liked games from Firebase
    // const { user } = UserAuth();   

    const [loading, setLoading] = useState([]); 

    const getGamesList = () => {
        GlobalAPI.getGamesList.then((resp) => {
            console.log(resp);
            setGameList(resp.data.results);
        });
    };

    const [gameLikes, setGameLikes] = useState(() => {
        const storedLikes = localStorage.getItem('likedGames');
        return storedLikes ? JSON.parse(storedLikes) : {};
    });
    const { addEntry, delEntry } = UserAuth(); 

    const auth = getAuth(); 
    const user = auth.currentUser; 

    useEffect(() => {
        if(user){
            setGames([]);

            const docRef = doc(db, user.uid, 'played-games'); 
        
            getDoc(docRef).then((docSnap) => {
                if(docSnap.exists()){
                    const data = docSnap.data(); 
                    const games = data.games || []; 
                    const likedGamesArray = [...games]; 
                    setGames(likedGamesArray);

                    console.log(likedGamesArray)
                }
            })
        }
        else{
            setGames([]);  
        }
    }, [user])

    // check if game is liked
    function checkLiked(id){
        for(let i = 0; i < games.length; i++){
            if(games[i] === id){
                return true; 
            }
        }

        return false; 
    }

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

    return(
        <div>
            <Sidebar/>
            <div className="mygames">
                <h1>MY GAMES</h1>
                {gameList.map((item) => (
                    checkLiked(item.id) && (
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
                                    <Typography gutterBottom variant="h7" component="div">
                                    {item.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        <h3 className="rating">{item.rating}<img className="icon" src={Star} alt="star" /></h3>
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
                                        checked={false} 
                                    />
                                </Button>
                                </CardActions>
                            </Card>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default MyGames