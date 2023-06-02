import React from 'react';
import styled from 'styled-components';
import {Stack} from '@mui/material';
import styles from './design2.module.css';
import TagItem from './TagItem';

const ScrollParent=styled(Stack).attrs({className:styles.scroll_parent})`
margin:auto;
justify-content:flex-start;
align-items:center;
width:100%;
flex-wrap:nowrap;
overflow-x:scroll;
scroll-snap-type: x proximity;
scroll-snap-align:center ;
overflow-y:hidden;
column-gap:5px;
@media screen and (max-width:900px){
  scroll-snap-type: x mandatory;
  scroll-snap-align:center ;
}
`;
const ScrollChild= styled.div.attrs({className:styles.scrollChild})`
margin:auto;
flex:0 0 100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
scroll-snap-align: center;
scroll-margin-block: 5px;
`;

const FlowerTagParent = ({flowerTags}) => {
  return (
    <ScrollParent direction="row">
        {flowerTags.loaded ? flowerTags.data.map((obj,index)=>(
            <ScrollChild
            
            key={`${obj.id}--flowerTag--${index}`}
            >
                <TagItem obj={obj}/>
            </ScrollChild>
        ))
        :
        <div><h5>loading...</h5></div>
    }
    </ScrollParent>
  )
}

export default FlowerTagParent