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
    let count1 = 0;
    const url = "https://master-connect.s3.ca-central-1.amazonaws.com/media/ckeditor"
    const bookArr = [{ id: 0, book: "book1.png" }, { id: 1, book: "book2.png" }, { id: 2, book: "book3.png" }, { id: 3, book: "book4.png" }, { id: 4, book: "book5.png" }, { id: 5, book: "book6.png" }, { id: 6, book: "book7.png" }, { id: 7, book: "book8.png" }, { id: 8, book: "book9.png" },]
    const [prevCountArr, setPrevCountArr] = useState([]);
    const [restart,setRestart]=useState(0);

    


    useEffect(() => {
        
        let arr = [];
        const url = "https://master-connect.s3.ca-central-1.amazonaws.com/media/ckeditor"
        const bookArr = [{ id: 0, book: "book1.png" }, { id: 1, book: "book2.png" }, { id: 2, book: "book3.png" }, { id: 3, book: "book4.png" }, { id: 4, book: "book5.png" }, { id: 5, book: "book6.png" }, { id: 6, book: "book7.png" }, { id: 7, book: "book8.png" }, { id: 8, book: "book9.png" },]

        const getBooks = (count) => {
            let book1 = bookArr.filter(book1 => (parseInt(book1.id) === count))[0];
            arr.push({ id:count, image:`${url}/${book1.book}` })
            setPrevCountArr(arr);

            
        }
        const loopThrough = () => {

            setTimeout(() => {
                getBooks(count1);
                if (count1 < bookArr.length - 1) {
                    setRestart(count1)
                    count1++;
                    loopThrough();
                }else{setRestart(0)}
            }, 600);
        }
        loopThrough();

    }, [setPrevCountArr,setRestart]);
    
    return (
        
            <BookEffectDiv   >
                {prevCountArr.map(obj => (

                            <Book obj={obj} count={restart} key={`${obj.id}-${Math.ceil(Math.random() * 10000)}`}/>
                        ))
                    }
                  
            </BookEffectDiv>



        


    )
}

export default BookShelf