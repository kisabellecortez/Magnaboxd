import { useState } from 'react'

import Sidebar from '../nav/Sidebar.js'

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';  
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const drawerWidth = 240;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Settings = () => {
    const [profilePic, setProfilePic] = useState('')
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState(''); 

    const handleChangeProfilePicture = async() => {

    }

    const handleChangeUsername = async() => {

    }

    const  handleChangeEmail = async() => {

    }

    const handleChangePassword = async() => {
        
    }

    return(
        <div>
            <Sidebar />

            <div className="settings">
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="permanent"
                    anchor="right"
                >
                    <Toolbar />
                    <List>
                    {['Personal Information', 'Account Management'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                            {index % 2 === 0 ? <PersonIcon /> : <ManageAccountsIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                </Drawer> 

                <div className="settings">
                    <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon 
                    onClick={handleChangeProfilePicture}/>}
                    >
                    Upload Profile Picture
                    <VisuallyHiddenInput
                        type="file"
                        value={profilePic}
                        onChange={(e) => setProfilePic(e.target.files)}
                        multiple
                    />
                    </Button>

                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField 
                            id="outlined-basic" 
                            label="New Username" 
                            variant="outlined" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                        <Button variant="text" onClick={handleChangeUsername}>Change Username</Button>
                    </Box>
                </div>
                <div className="settings">
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                        >
                        <TextField 
                            id="outlined-basic" 
                            label="New Email" 
                            variant="outlined" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        <Button variant="text" onClick={handleChangeEmail}>Change Username</Button>
                    </Box>

                    <Button variant="text" onClick={handleChangePassword}>Reset Password</Button>
                </div>
            </div>
        </div>

    )
}

export default Settings; 