import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Form } from 'react-router-dom';

export default function UserUpdate() {
    const {id} = useParams();

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        fetch(`http://localhost:8000/api/user/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if(result["status"] == 200){
                setName(result["user"]["name"])
                setAge(result["user"]["age"])
                setEmail(result["user"]["email"])
                setAvatarUrl(result["user"]["avatarUrl"])
            }
            else if(result["status"] == 404){
                alert(result['message'])
                window.location.href = "/"
            }
            else if(result["status"] == 500){
                alert(result['message'])
                window.location.href = "/"
            }
          })
          .catch((error) => console.error(error));
    }, [id])

    const handleSubmit = event => {
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
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        fetch(`http://localhost:8000/api/user/${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if(result['status'] == 200){
                    alert(result['message'])
                    window.location.href = "/"
                }
                else if(result['status'] == 404){
                    alert(result['message'])
                }
                else if(result['status'] == 400){
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
            Update User
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
                      value={name}
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
                      InputProps={{ inputProps: { min: 1 } }}
                      value={age}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                      id="avatarUrl"
                      label="Avatar URL"
                      variant="outlined"
                      fullWidth
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Button variant="contained" type="submit" style={{ float: 'right' }} >
                        Update
                    </Button>
                </Grid>
            </Grid>

        </Form>
      </Container>
    </>
  );
}