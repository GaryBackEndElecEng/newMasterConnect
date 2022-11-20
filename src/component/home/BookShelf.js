import React, { useEffect, useState,} from 'react';
import styled from 'styled-components';

// import Styles from './home.module.css';
// import { useTheme } from '@mui/material/styles';
import Book from './Book';



const BookEffectDiv = styled.div`
margin:auto;
width:100%;
z-index:1000;
position:absolute;
top:40%;
display:flex;
flex-direction:row;
// border:1px solid red;
flex-wrap:nowrap;
justify-content:center;
align-items:flex-start;
text-align:center;
gap:0px;


`;

const BookShelf = () => {
    let arr = [];
    let count = 0;
    const url = "https://master-connect.s3.ca-central-1.amazonaws.com/media/ckeditor"
    const bookArr = [{ id: 0, book: "book1.png" }, { id: 1, book: "book2.png" }, { id: 2, book: "book3.png" }, { id: 3, book: "book4.png" }, { id: 4, book: "book5.png" }, { id: 5, book: "book6.png" }, { id: 6, book: "book7.png" }, { id: 7, book: "book8.png" }, { id: 8, book: "book9.png" },]
    const [prevCountArr, setPrevCountArr] = useState([]);

    const getBooks = (count) => {
        let book = bookArr.filter(book => (parseInt(book.id) === count))[0];
        arr.push({ id: count, image: `${url}/${book.book}` })
        setPrevCountArr(arr);
    }


    useEffect(() => {
        const loopThrough = () => {

            setTimeout(() => {
                getBooks(count);
                if (count < bookArr.length - 1) {
                    count++;
                    loopThrough();
                }
            }, 600);
        }
        loopThrough();

    }, [bookArr.length,getBooks]);
    return (
        
            <BookEffectDiv   >
                {prevCountArr.map(obj => (

                            <Book obj={obj} count={count} key={`${obj.id}-${Math.ceil(Math.random() * 10000)}`}/>
                        ))
                    }
                  
            </BookEffectDiv>



        


    )
}

export default BookShelf