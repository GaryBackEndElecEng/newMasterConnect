import React, { useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const BookAnimate = styled.img`
width:3.5%;
top:5%;

`;
const Book = ({ obj,count }) => {
    
    return (
        <BookAnimate src={obj.image} alt="www.master-connect.ca"  />
    )
}

export default Book