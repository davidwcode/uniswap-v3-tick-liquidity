import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function Search() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [empty, setEmpty] = useState(true);
  function handleClick() {
    console.log(searchInput);
    if (!empty) {
      console.log("hit");
      navigate({
        pathname: '/search',
        search: "?=" + searchInput,
      });
    }
  }

  function handleChange(event) {
    event.preventDefault();
    if (event.target.value !== "") {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
    setSearchInput(event.target.value);

  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Search Pool
          </Typography>
          <Box component="form" noValidate sx={{
            width: 500, mt: 1
          }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Pool"
              label="Pool Address"
              autoFocus
              error={empty}
              onChange={handleChange}

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}