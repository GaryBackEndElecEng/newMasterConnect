import React from 'react';
import { Box, Stack, Container } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import {useTheme} from '@mui/material/styles'


const Stars = ({ rating }) => {
    const theme=useTheme();
    
    const rateStar = () => {
        let arr = []
        if(parseInt(rating)){
                if (rating <=5) {
                    //has no remainder return(<StarIcon/>)
                    for (let i = 0; i < Math.floor(rating); i++) {
                        if (i <= rating) {
                            arr.push(<StarIcon />)
                        }
                    }
                }if (rating % 1 > 0) {
                    //rating%1=> gives remainder return(<StarHalfIcon/>)
                    arr.push(<StarHalfIcon />)
                }if (rating <= 5 && rating >= 0 ) {
                    //rating%1=> gives remainder return(<StarHalfIcon/>)
                    for (let i = Math.ceil(rating); i < 5; i++) {
                        arr.push(<StarBorderIcon />)
                    }
                }
            return arr
        }else{return []}
    }
    return (
        
            <Stack spacing={{xs:0}}
            sx={{display:"inline-flex",flexDirection:"row",gap:"1px",color:theme.palette.icon.star.main}}>
                {rateStar().map((star,index)=>(
                   <Box key={`${Math.ceil(Math.random()*100000)}-star-${index}`}> {star} </Box>
                    ))
                }
                </Stack>
        
    )
}

export default Stars