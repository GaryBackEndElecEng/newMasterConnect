import React from 'react';
import { Stack, Card, Typography, Fab, Container, Grid,CardMedia,CardContent } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {useTheme} from '@mui/material/styles';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const returnArray=(rating)=>{
    let arr=[];
    for(let i=0;i<rating;i++){
        arr.push(i)
    }
    return arr
}
const ItemList = ({ resArr}) => {
    const theme=useTheme();
    return (
        <Container maxWidth="xl" sx={{margin:{md:"1rem auto",xs:"1rem 0px"}}}>
            
            <Grid container spacing={{ xs: 0, sm: 1, md: 2 }}>
                {(resArr.loaded && resArr.data) && resArr.data.map((obj,index) => (
                    <Grid item xs={12} sm={6} md={4} key={`${obj.id}-res-${index}`}>
                        <Card elevation={10}>
                            <Typography component="h1" variant="h5" sx={{textAlign:"center",margin:"2rem auto"}}>{obj.title}</Typography>
                            <CardMedia component="img" src={obj.image} height="400"/>
                            <CardContent 
                            sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:2}}
                            >
                                <Typography component="h1" variant="h6">{obj.desc}</Typography>
                                <Stack direction="column" spacing={2} sx={{justifyContent:"center",alignItems:"center"}}>
                                <Typography component="h1" variant="h5">price: <AttachMoneyIcon sx={{ml:1,color:"green",fontSize:"30px"}}/> {obj.price}.<sup>00</sup></Typography>
                                <Stack direction="row" spacing={1}>
                                    { obj.desc &&
                                        returnArray(obj.rating).map((num,index)=>(
                                            <StarIcon key={index} sx={{color:theme.palette.common.orangeFade2,ml:2}}/>
                                        ))
                                    
                                    }
                                </Stack>
                                </Stack>
                                <Stack direction="column" sx={{alignItems:"center"}}>
                                    <Fab variant="extended">
                                        add to basket <LocalMallIcon sx={{ml:1,color:"green"}}/>
                                    </Fab>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
        </Container>
    )
}

export default ItemList