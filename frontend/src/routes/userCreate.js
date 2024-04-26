import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Form } from 'react-router-dom';

export default function UserCreate() {
    const handleSubmit = event => {
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "name": name,
          "age": age,
          "email": email,
          "avatarUrl": avatarUrl
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        fetch("http://localhost:8000/api/user", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result['status'] == 201){
                    window.location.href = "/"
                    alert(result['message'])
                }
                else if (result['status'] == 400){
                    alert(result['errors'])
                }
            })
            .catch((error) => console.error(error));
        
    };

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    


  return (
    <>
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
            Create User
        </Typography>
        <Form onSubmit={handleSubmit} >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                      id="name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                      id="age"
                      label="Age"
                      type="number"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAge(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      id="avatarUrl"
                      label="Avatar URL"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setAvatarUrl(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Button variant="contained" type="submit" style={{ float: 'right' }} >
                        Create
                    </Button>
                </Grid>
            </Grid>

        </Form>
      </Container>
    </>
  );
}