import React, { useContext, useEffect, useState } from 'react'
import { Paper, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { useTheme } from '@mui/material/styles';
import styles from './about.module.css';



const Stripe1 = ({ scrollRef }) => {
    const theme = useTheme();
    const {  allCategory,staticImage } = useContext(GeneralContext);
    const [about, setAbout] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const stripe1 = `${staticImage}/stripe1.png`;
    const stripe2 = `${staticImage}/stripe2.png`;
    const stripe3 = `${staticImage}/stripe3.png`;
    const easySelection = about.length > 0  ? about.filter(obj => (parseInt(obj.id) === 22))[0] : null;
    const easyPurchase = about.length > 0 ? about.filter(obj => (parseInt(obj.id) === 16))[0] : null;
    const easyFinance = about.length > 0 ? about.filter(obj => (parseInt(obj.id) === 17))[0] : null;
    const ownDatabase = about.length > 0 ? about.filter(obj => (parseInt(obj.id) === 23))[0] : null;
    const database="https://new-master.s3.ca-central-1.amazonaws.com/static/database.png"

    useEffect(() => {
        const getData = allCategory.loaded && allCategory.data ? allCategory.data.filter(obj => (obj.section === "about"))[0].categories : null;
        if (getData) {
            setAbout(getData)
        }
    }, [allCategory.loaded]);

    const handleMouseOver=()=>{
        if(!show){
            setShow(true)
        }
    }
    const handleMouseOut=()=>{
        if(show){
            setShow(false)
        }
    }

    return (
        <Paper component="div" elevation={6}
            sx={{
                margin: "auto",
                display: "flex", justifyContent: "center",
                alignItems: "center", flexDirection: "column",
                width: { sm: "100%", xs: "100%" ,lg:"70%"},
                height: { xs: "100%", sm: "100%",lg:"70%" },
                flexGrow: 1,
            }}
        >
            <Grid container spacing={1} direction={"row"} sx={{ justifyContent: "center", padding: "10px", margin: "auto" }}>
                <Grid item xs={12} sm={6} md={6}>
                    <Card spacing={1}
                    sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",margin:"1rem auto"}}
                    >
                        <CardMedia component="img" image={stripe1} alt="www.master-connect.ca" sx={{width:{lg:"50%",md:"67%",sm:"75%",xs:"100%"}}} />
                        <CardContent sx={{margin:"1rem auto"}}>
                            <Typography component="h1" variant="h4"
                                sx={{ color: theme.palette.common.blueGrey, fontFamily: "playfair Display", fontStyle: "italic" }}
                            >
                                {easySelection !== null && easySelection.title}
                            </Typography>
                            <Typography component="h1" variant="h6" sx={{ fontFamily: "Roboto", padding: "5px" }}>
                                {easySelection !== null && easySelection["content"]}
                            </Typography>
                        </CardContent>
                    </Card>

                </Grid>

                <Grid item xs={12} sm={6} md={6}>

                    <Card spacing={1}
                    sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",margin:"1rem auto"}}
                    >
                        <CardMedia component="img" image={stripe2} alt="www.master-connect.ca" sx={{width:{lg:"50%",md:"67%",sm:"75%",xs:"100%"}}} />
                        <CardContent sx={{margin:"1rem auto"}}>
                            <Typography component="h1" variant="h4"
                                sx={{ color: theme.palette.common.blueGrey, fontFamily: "playfair Display", fontStyle: "italic" }}
                            >
                                {easyPurchase && easyPurchase.title}
                            </Typography>
                            <Typography component="h1" variant="h6" sx={{ fontFamily: "Roboto", padding: "5px" }}>
                                {easyPurchase && easyPurchase.content}
                            </Typography>
                        </CardContent>
                    </Card>

                </Grid>

                <Grid item xs={12} md={12}>

                    <Card spacing={1}
                    sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",margin:"1rem auto",position:"relative"}}
                    >
                        <CardMedia component="img" image={stripe3} alt="www.master-connect.ca" sx={{width:{lg:"50%",md:"67%",sm:"75%",xs:"100%"},boxShadow:`1px 2px 8px 10px ${theme.palette.common.blueFade}`}}
                        onMouseOver={()=>setShow2(true)} onMouseOut={()=>setShow2(false)}
                        />
                        {show2 &&
                       
                       <Paper className={styles.hoverShow} elevation={20}
                       sx={{boxShadow:`1px 1px 4px 12px ${theme.palette.common.shadeGrey}`,textAlign:"center",width:"auto"}}
                       >
                       <span >
                        {easyFinance && easyFinance.summary}
                       </span>
                       </Paper>
                       
                       }
                        
                        <CardContent sx={{margin:"1rem auto"}}>
                            <Typography component="h1" variant="h4"
                                sx={{ color: theme.palette.common.blueGrey, fontFamily: "playfair Display", fontStyle: "italic" }}
                            >
                                {easyFinance && easyFinance.title}
                            </Typography>
                            <Typography component="h1" variant="h6" sx={{ fontFamily: "Roboto", padding: "5px" }}>
                                {easyFinance && easyFinance.content}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12}>

                    <Card spacing={1} 
                    sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",margin:"1rem auto",position:"relative"}}
                    >
                        <CardMedia component="img" image={database} alt="www.master-connect.ca" sx={{width:{lg:"50%",md:"67%",sm:"75%",xs:"100%"},boxShadow:`1px 2px 8px 10px ${theme.palette.common.blueFade}`}} onMouseOver={()=>handleMouseOver()} onMouseOut={()=>handleMouseOut()}/>
                       {show &&
                       
                       <Paper className={styles.hoverShow} elevation={20}
                       sx={{boxShadow:`1px 1px 4px 12px ${theme.palette.common.shadeGrey}`,textAlign:"center",width:"auto"}}
                       >
                       <span >
                        {ownDatabase && ownDatabase.summary}
                       </span>
                       </Paper>
                       
                       }
                        <CardContent sx={{margin:"1rem auto"}}>
                            <Typography component="h1" variant="h4"
                                sx={{ color: theme.palette.common.blueGrey, fontFamily: "playfair Display", fontStyle: "italic" }}
                            >
                                {ownDatabase && ownDatabase.title}
                            </Typography>
                            <Typography component="h1" variant="h6" sx={{ fontFamily: "Roboto", padding: "5px" }}>
                                {ownDatabase && ownDatabase.content}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Stripe1