import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography, Paper, Avatar, Link, ButtonGroup, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import UserUpdate from './userUpdate';
import MyPagination from '../components/MyPagination';


export default function Root() {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const UserGet = () => {
      fetch("http://localhost:8000/api/user?"+`q=${search}`+`&start=${start}`+`&limit=${limit}`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result.users);

            },
          )
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const [countItems, setCountItems] = useState(1);
    let currentItems = [];

    if(items){
      currentItems = items.slice(firstPostIndex,lastPostIndex);
      setCountItems(items.length)
    }
    


    useEffect(() => {
      UserGet()
      
    }, [])

    
    const [search, setSearch] = useState('');
    const [start,  setStart] = useState('');
    const [limit,  setlimit] = useState('');
    
    useEffect(() => {
      console.log(search);
      UserGet();
      if(items){
        currentItems = items.slice(firstPostIndex,lastPostIndex);
      }
      console.log(currentItems);
    }, [search, start, limit]);



    const UserUpdate = id => {
      window.location = '/update/'+ id  
    }
  

    const UserDelete = id =>{
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow"
        };
      
        fetch(`http://localhost:8000/api/user/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            alert(result['message'])
            UserGet()

          })
          .catch((error) => console.error(error));
    }


  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 5 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex" sx={{ p: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Users
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1  }}>
            <TextField label="Search" variant="outlined" onChange={(e) => setSearch(e.target.value)}/>
            <TextField label="Start" variant="outlined" type="number"  onChange={(e) => setStart(e.target.value)}/>
            <TextField label="limit" variant="outlined" type="number"  onChange={(e) => setlimit(e.target.value)}/>
            </Box>
            <Box>
              <Link href="create">
                <Button variant="contained">Create</Button>
              </Link>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">AvatarUrl</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Age</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Avatar alt={row.name} src={row.avatarUrl} />
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.age}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      <ButtonGroup variant="outlined" aria-label="Basic button group">
                        <Button onClick={()=> UserUpdate(row._id)}>Edit</Button>
                        <Button onClick={()=> UserDelete(row._id)}>Del</Button>
                        
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" sx={{ pt:2 }}>
            <MyPagination totalPosts={countItems} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} ></MyPagination>

          </Box>
        </Paper>
      </Container>
    </>
  );
}