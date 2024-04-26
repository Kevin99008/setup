import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Pagination } from '@mui/material';

export default function MyPagination(value) {

    const totalPosts = value.totalPosts;
    const postsPerPage = value.postsPerPage;
    const setCurrentPage = value.setCurrentPage;


    const ClickPage = (event, value) => {
        setCurrentPage(value);
    };

    const pagesNumber = Math.ceil(totalPosts/ postsPerPage)
    return (
        <Pagination count={pagesNumber} color="primary" onChange={ClickPage} />
    );
}