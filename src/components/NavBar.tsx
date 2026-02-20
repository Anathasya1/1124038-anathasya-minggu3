import { useNavigate } from "react-router";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { authActions } from "../redux/authSlice";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(state => state.auth.userInfo);

    const handleLogout = () => {
        dispatch(authActions.logout());
        alert("Berhasil logout");
        navigate('/login');
    }

    return (
        <AppBar position="static" sx ={{mb:4}}>
            <Toolbar>
                <Typography 
                    variant="h6" 
                    sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold' }} 
                    onClick={() => navigate('/')}
                > Forum </Typography>
                {userInfo && (
                    <Box display="flex" alignItems="center" gap={2}>
                        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                        <Button color="inherit" onClick={() => navigate('/post')}>List Post</Button> 

                        <Typography variant="body2" sx={{ ml: 2, mr: 1, fontStyle: 'italic' }}>
                            Hi, {userInfo.name}
                        </Typography>

                        <Button 
                            variant="contained" 
                            color="error" 
                            size="small" 
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}