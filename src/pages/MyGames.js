import { useState, useEffect } from 'react'
import Sidebar from '../nav/Sidebar.js'
import Star from '../assets/star.svg'

//RAWG
import GlobalAPI from '../services/GlobalAPI'

//Firebase
import { db } from '../firebase.js'
import { doc, getDoc } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext.js'
import { getAuth } from 'firebase/auth'

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
import CircularProgress from '@mui/material/CircularProgress';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const MyGames =()=>{
    const [loading, setLoading] = useState(true); 
    const [games, setGames] = useState([]); // store the liked games 
    const [gameList, setGameList] = useState([]); // store api list of games 
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

    const getGamesList = () => {
        GlobalAPI.getGamesList.then((resp) => {
            console.log(resp);
            setGameList(resp.data.results);
        });

        setLoading(false)
    };

    const auth = getAuth(); 
    const user = auth.currentUser; 

    useEffect(() => {
        if(user){
            setGames([]);

            const docRef = doc(db, user.uid, 'liked-games'); 
        
            getDoc(docRef).then((docSnap) => {
                if(docSnap.exists()){
                    const data = docSnap.data(); 
                    const liked = data.liked || []; 
                    const likedGamesArray = [...liked]; 
                    setGames(likedGamesArray);

                    console.log(likedGamesArray)
                }
            })
        }
        else{
            setGames([]);  
        }

        setLoading(false)
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

    if(loading){
        return(
            <div>
                <Sidebar />

                <div className="mygames">
                    <div className="loading"><CircularProgress size="5rem" /></div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Sidebar/>
            
            <div className="mygames">
                <h1 className="title">FAVOURITES</h1>

                {gameList.map((item) => (
                    checkLiked(item.id) && (
                        <div className="card" key={item.id}>    
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="250"
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
                                        checked={gameSaves[item.id] || false} 
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