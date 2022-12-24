import React, { useContext, useEffect, useState, } from 'react';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { PriceContext } from '../../context/PriceContextProvider';
import { Container, Stack, Grid, Typography, Card, Avatar, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Stars from './Stars';
import styled from 'styled-components';

const MainPageRating=styled.div`
margin: 1rem auto;
display:${({display})=>display ? "flex":"none"};
justify-content:flex-start;
align-items:center;
flex-direction:column;
background:${({bg})=>bg};
width:100vw;
animation:climbDown 1s ease-in-out;
@keyframes climbDown {
    from {opacity:0;transform:translateY(-100%);}
    to {opacity:1;transform:translateY(0%);}
}
@media screen and (max-width:900px){
    
}
@media screen and (max-width:600px){

}
`;
const PageRatings = () => {
    const theme = useTheme();
    const { pageRatings, } = useContext(GeneralContext);
    const {getProductList} = useContext(PriceContext);
    const [filterRating,setFilterRating]=useState([]);
    const [desc,setDesc]=useState({loaded:false,data:{}})
    const logo = "https://new-master.s3.ca-central-1.amazonaws.com/static/logo.png";
    const isLoaded=pageRatings.loaded ? true:false;

    useEffect(()=>{
        let arr=[]
        if(pageRatings.loaded && pageRatings.data && getProductList.loaded){
            let filtered=pageRatings.data?.filter(obj=>(parseInt(obj.rating) > 2));
            getProductList.data.forEach((product,index)=>{
                filtered.forEach((obj)=>{
                    if(obj.page === product.extra_kwargs){
                        arr.push({...obj,"title":product.name})
                    }
                });
            });
            
            setFilterRating(arr);
        }

    },[pageRatings.loaded,pageRatings.data,getProductList.loaded,getProductList.data]);
    const handledesc=(e,obj)=>{
        e.preventDefault();
        if(desc.loaded === false){
            let id=obj.id;
            let comment=obj.comment
            setDesc({loaded:true,data:{id:id,comment:comment}});
        }else{setDesc({loaded:false,data:{id:null}})}

    }
    const handleClose=(e)=>{
        e.preventDefault();
        setDesc({loaded:false,data:{id:null}})
    }

    return (
        <MainPageRating 
        bg={theme.palette.splash2}
        display={isLoaded}
        >
            <Typography component="h1" variant="h2" sx={{textAlign:"center",margin:"1rem auto",color:"white",}}>Reviews</Typography>
            <Grid container spacing={{ xs: 0, sm: 1, md: 1 }}
            sx={{maxHeight:{md:"40vh",xs:"50vh"},overflowY:"scroll",borderTop:"1px solid blue",
            justifyContent:"center",alignItems:"center",textAlign:'center'
        }}
            >
                {filterRating && filterRating.map((obj, index) => (
                    <Grid item xs={12} sm={6} md={2} key={`${obj.id}-${index}-${Math.floor(Math.random()*10000)}`}
                     sx={{padding:{xs:"0.5rem",sm:"1rem"},
                     margin:"auto",justifyContent:"center",alignItems:"center",textAlign:"center",
                    }}
                    >
                        <Card elevation={10}
                         sx={{
                            padding:{sm:"1rem",xs:"1rem"}, borderRadius:"10%",
                         backgroundColor:"white", cursor:"pointer",
                        maxWidth:{xs:"220px",sm:"225px"},margin:"auto"
                    }}
                         onClick={(e)=>handledesc(e,obj)}
                         onMouseOut={(e)=>handleClose(e)}
                        >
                            <Avatar src={logo} alt="www.master-connect.ca" sx={{ width: { sm: "25%", xs: "25%", md: "25%" }, height: { sm: "25%", xs: "25%", md: "25%" }, boxShadow: `1px 1px 10px 8px ${theme.palette.common.blueFade}` }} />
                            <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
                                {obj.name}
                            </Typography>
                            <Stack direction={{xs:"column",sm:"column",md:"row"}} spacing={2}>
                            
                            <Stars rating={obj.rating} sx={{ml:0}}/>
                            </Stack>
                            <CardContent
                                sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",position:"relative" }}
                            >
                                <Typography component="h1" variant="h6">
                                    title:{obj.title}
                                </Typography>
                                <Typography component="h1" variant="h6">
                                    page:{obj.page}
                                </Typography>
                                <Typography component="h1" variant="h6">
                                    comment
                                </Typography>
                                 <Typography component="h1" variant="body1">
                                    {obj.comment.slice(0,26)},,,
                                </Typography>
                                
                                {desc.data.id === obj.id &&
                                 <Typography component="h1" variant="body1"
                                 sx={{position:"absolute",top:"0%",left:"auto",background:theme.palette.footer.blueGrey,color:"white",padding:"1rem",width:"100%"}}
                                 >
                                    {desc.data.comment}
                                </Typography>}
                            </CardContent>
                        </Card>

                    </Grid>
                ))}
            </Grid>

        </MainPageRating>
    )
}

export default PageRatings