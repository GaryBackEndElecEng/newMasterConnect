import React, {  useState } from 'react';
import { Stack, Container, Grid, Card, CardMedia, Typography, CardContent, Fab } from '@mui/material';
import styles from './design9.module.css'
import { useTheme } from '@mui/material/styles';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import BathroomIcon from '@mui/icons-material/Bathroom';
import DescriptionIcon from '@mui/icons-material/Description';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DateRangeIcon from '@mui/icons-material/DateRange';
import GrassIcon from '@mui/icons-material/Grass';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import MouseIcon from '@mui/icons-material/Mouse';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';



const Projects = ({language,turnOn}) => {
    const theme = useTheme();
    const [viewSummary,setViewSummary]=useState({loaded:false,obj:{}});
    const [viewDesc,setViewDesc]=useState({loaded:false,obj:{}});
    

const handleSummary =(obj)=>{
    if(viewSummary.loaded===false){
        setViewSummary({loaded:true,obj:obj})
    }
    if(viewSummary.loaded===true){
        setViewSummary({loaded:false,obj:{}})
    }
}
const handleSDesc =(obj)=>{
    if(viewDesc.loaded===false){
        setViewDesc({loaded:true,obj:obj})
    }
    if(viewDesc.loaded===true){
        setViewDesc({loaded:false,obj:{}})
    }
}

    return (
        <Container maxWidth="xl"
            sx={{ margin: "1rem auto" }}

        >

            <Grid container spacing={{ xs: 0, sm: 1, md: 2 }} sx={{ background: theme.palette.common.light }}>
                {language.map((obj, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`${index}-${obj.id}`} sx={{ padding: "1rem" }}>
                        <Card elevation={20} 
                            sx={{ background: "white", padding: "1rem ", alignItems: "center", justifyContent: "flex-start", flexDirection: "column", display: "flex" ,position:"relative"}}
                        >
                            <Stack direction="column" spacing={0} sx={{position: "relative",width:"100%"}}>
                            <MouseIcon className={styles.clickSummary}  sx={{fontSize:"2rem"}} onClick={()=>handleSummary(obj)}  />
                            <Typography component="h1" variant="h4">{obj.title}</Typography>
                            <Typography component="h1" variant="h5">{obj.location}< AddLocationIcon sx={{ml:1,color:"red"}}/></Typography>
                            </Stack>
                            
                            
                            <CardMedia component="img" image={obj.image}/>
                            
                            <Typography component="h1" variant="h5"
                                sx={{ marginTop: "2rem" }}
                            >
                                <AttachMoneyIcon sx={{ mr: 1, color: "green", fontSize: "2rem" }} />
                                {obj.price}.<sup>00</sup>
                            </Typography>
                            <CardContent
                                sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",margin:"1rem auto" }}
                                onMouseOut={()=>setViewSummary({loaded:false,obj:{}})}
                            >
                               {(viewSummary.loaded & viewSummary.obj.id===obj.id) ? <Typography component="h1" variant="h6" 
                                    className={styles.showSummary}
                                >
                                    {viewSummary.obj.summary}
                                </Typography>
                                :
                                <></>
                                }

                                <Grid container spacing={{  sm: 1, md: 2 }} sx={{ background: theme.palette.common.background2, margin: "1rem auto" }}>
                                    <Grid item xs={12} sm={6} md={4}

                                    >
                                        
                                        <Stack direction={{xs:"row",sm:"column"}}>
                                        <Typography component="h1" variant="body1" sx={{ color: "white" }}>LOT <GrassIcon sx={{ml:1,color:"green",fontSize:"1.5rem"}}/></Typography>
                                        <Typography component="h1" variant="body1" sx={{ color: "white" }}>{obj.size}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}
                                    >
                                        <Stack direction={{xs:"row",sm:"column"}}>
                                        <Typography component="h1" variant="body1" sx={{ color: "white" }}>{turnOn ? "Chambre a coucher" :"bedrooms"} <SingleBedIcon sx={{ml:1,color:"blue"}}/></Typography>
                                        <Typography component="h1" variant="body1" sx={{ color: "white" }}>{obj.bedrooms}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}
                                    >
                                        <Stack direction={{xs:"row",sm:"column"}}>
                                        <Typography component="h1" variant="body1" sx={{ color: "white" }}>{turnOn ? "Chambres" :"rooms"} <MeetingRoomIcon sx={{ml:1,color:"blue"}}/></Typography>
                                        <Typography component="h1" variant="body1" sx={{ color: "white" }}>{obj.rooms}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}
                                    >
                                        <Stack direction={{xs:"row",sm:"column"}}>
                                        <Typography component="h1" variant="body1" sx={{ color: "white" }}>{turnOn ? "Salle de bains":"bathrooms"} <BathroomIcon sx={{ml:1,background:"blue",color:"white"}}/></Typography>
                                        <Typography component="h1" variant="body1" sx={{ color: "white" }}>{obj.bathrooms}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}
                                    >
                                        <Stack direction={{xs:"row",sm:"column"}}>
                                        <Typography component="h1" variant="body1" sx={{ color: "white" }}>{turnOn ? "supplementaires":"extras"} <FormatAlignJustifyIcon sx={{ml:1,color:"blue"}}/></Typography>
                                        <Typography component="h1" variant="body1" sx={{ color: "white" }}>{obj.extras}</Typography>
                                        </Stack>
                                    </Grid>

                                </Grid>




                                <Stack direction="column" spacing={{ xs: 1, sm: 2 }}
                                    sx={{ margin: "1rem auto" }} 
                                >
                                    <Typography component="h1" variant="body1">{obj.desc.slice(0, 100)},,,,</Typography>
                                    <DescriptionIcon sx={{ml:1,color:"blue",fontSize:"2rem"}} onClick={()=>handleSDesc(obj)}/>

                                </Stack>
                                {/* SHOW HIDE DESCRIPTION */}
                                {(viewDesc.loaded && viewDesc.obj.id===obj.id) &&<Stack direction="column" 
                                   className={styles.showDescription}
                                >
                                    <Typography component="h1" variant="body2" 
                                    sx={{background:theme.palette.common.background3,color:"white",padding:"1rem",width:"100%"}}
                                    >
                                        {viewDesc.obj.desc}
                                    </Typography>
                                    

                                </Stack>}





                                <Stack direction="row" spacing={{ xs: 2, sm: 1, md: 3 }}
                                    sx={{ justifyContent: "flex-start", alignItems: "center" }}
                                    onMouseOut={()=>setViewDesc({loaded:false,obj:{}})}
                                >
                                    <DateRangeIcon sx={{color:"red"}}/>
                                    <Typography component="h1" variant="body1" >{turnOn ? "Annee":"Year:"}</Typography>
                                    <Typography component="h1" variant="body1">{obj.year}</Typography>
                                </Stack>
                            </CardContent>
                            <Stack direction="column" spacing={{xs:1,sm:2}}
                            sx={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column",margin:"1rem auto"}}
                            >
                                <Fab variant="extended" color="info" size="small">
                                    {turnOn ? "Voir":"View"} <ExitToAppIcon sx={{color:"pink",ml:1}}/>
                                </Fab>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Container>
    )
}

export default Projects