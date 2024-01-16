import { UserAuth } from '../context/AuthContext.js'
import {useNavigate} from 'react-router-dom'

export default function SidebarItem({item}){
    const { user, logOut } = UserAuth(); 
    const navigate = useNavigate()
    //signs out user
    const handleSignOut = async()=>{
        try{
            await logOut()
            navigate('/')
            console.log(user)
        }
        catch(error){
            console.log(error)
        }
    }

    
    if(item.title === "LOGOUT"){
        return(
            <a href = {item.path || '#'} className = "sidebar-item">
                <div className = "sidebar-title" onClick={(handleSignOut)}>
                    <span>
                        {item.title}
                    </span>
                </div>
            </a>
        )
    }
    else{
        return(
            <a href = {item.path || '#'} className = "sidebar-item">
                <div className = "sidebar-title">
                    <span>
                        {item.title}
                    </span>
                </div>
            </a>
        )
    

    }

}