import React from 'react';
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { User } from '../../types';
import { logout } from '../../features/users/usersThunks';
import { useAppDispatch } from '../../app/hooks';
import {  useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    };

    return (
        <Grid container alignItems="center" spacing={2} direction="row">
            <Grid item>
                <Avatar
                    src={user.googleID
                        ? (user.avatar ? user.avatar : undefined)
                        : (user.avatar ? `${API_URL}/${user.avatar}` : undefined)
                    }
                    sx={{ width: 40, height: 40, fontSize: 12 }}
                >
                    {user.displayName}
                </Avatar>
            </Grid>
            <Grid item>
                <Typography color="inherit">
                    Hello, {user.displayName ? user.displayName : user.username}!
                </Typography>
            </Grid>
            <Grid item>
                <Button onClick={handleLogout} color="inherit">
                    Logout
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserMenu;