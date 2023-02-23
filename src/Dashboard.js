import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import ArrowBack from '@mui/icons-material/ArrowBackIos';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Data from './Data'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const mdTheme = createTheme();

function DashboardContent() {
    const navigate = useNavigate();
    function handleClick() {
        navigate({
            pathname: '/'
        });
    }

    const poolAddress = "Liquidity for pool: " + window.location.href.substring(window.location.href.indexOf("?=") + 2)

    return (
        <ThemeProvider theme={mdTheme}>
            <AppBar position="relative">
                <Toolbar>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="secondary" startIcon={<ArrowBack />} onClick={handleClick}>
                            Back to Search
                        </Button>
                        <Typography variant="h6" color="inherit" noWrap>
                            {poolAddress}
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Data />
                </Paper>
            </Grid>
        </ThemeProvider>

    );
}

export default function Dashboard() {
    return <DashboardContent />;
}