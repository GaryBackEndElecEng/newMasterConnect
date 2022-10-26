import React from 'react';

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