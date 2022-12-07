import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Typography,  Container, Paper, FormControl, InputLabel, FormHelperText, Input, FormLabel, Fab, Select, MenuItem, List, ListItem, TextareaAutosize } from '@mui/material';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import styled from 'styled-components';
import api from '../axios/api';
import { Box, Stack } from '@mui/system';

const CustomStack= styled(Stack)`
position:absolute;
top:20%;
width:100%;
left:0%;
background:white;
justify-content:center;
align-items:flex-start;
padding:1rem;
z-index:1000;
box-shadow:1px 1px 8px 6px ${({bs})=>bs};
border:1px solid grey;
animation: reappear 1s ease-in-out;
@keyframes reappear {
    from {opacity:0;transform:scale(0);}
    from {opacity:1;transform:scale(1);}
}
@media screen and (max-width:900px){
    top:26%;
}
@media screen and (max-width:600px){
top:10%;
}
`;
const PageFeedback = () => {
    const location = useLocation();
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [validName, setValidName] = useState(false);
    const [validRating, setValidRating] = useState(false);
    const [validComment, setValidComment] = useState(false);
    const [timeoutMsg, setTimeoutMsg] = useState(false);
    const [item, setItem] = useState({ loaded: false, body: {} });
    const [returnedItem, setReturnedItem] = useState({ loaded: false, data: {} });


    const getvalid = useMemo(() => {
        const name_REGEX = /(^[A-Za-z]{1,4})/;
        const rating_REGEX = /(^[0-9]{0,2})/;
        let validComment1 = name_REGEX.test(comment);
        let validName2 = name_REGEX.test(name);
        let validRating3 = rating_REGEX.test(rating);
        // console.log(validName,validRating,validComment)
        if (validComment1 && validName2 && validRating3) {
            setItem({ loaded: true, body: { name: name, email: email, comment: comment, rating: rating, page: location.pathname } })
            setValidName(true); setValidComment(true); setValidRating(true)
            setTimeoutMsg(false)
            return true

        }else{return false}

    }, [comment, name, rating, email, location.pathname]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (getvalid===true) {
           const sendData = async ()=>{
            try {
                const res= await api.post("postPageFeedback/",item.body);
                const body=res.data;
                if(body){
                    setReturnedItem({loaded:true,data:body});
                    setTimeoutMsg(false);
                    setTimeout(()=>{
                        setTimeoutMsg(true);
                        setEmail("");
                        setName("");
                        setRating("");
                        setComment("");
                    },4000);
            }
                // console.log("Body",body)
            } catch (error) {
                console.error(error.message)
            }
           }
           sendData();
        }
    }
   

    return (
        <Container maxWidth="sm" sx={{position:"relative",margin:"1rem auto"}}>
            <Typography component="h1" variant="h5" sx={{textAlign:"center",margin:"1rem auto"}}>Please comment on this page. We would be honored. We respect your privacy.</Typography>
        <form style={{ background: theme.palette.common.blueFade, padding: "0.5rem" }}>
            <FormLabel component="div" filled={true} required={false}
                sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", padding: "1rem", width: "100%", margin: "1rem auto", background: theme.palette.common.lighter }}

            >
                <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input sx={{ color: "black", background: theme.palette.common.light }}
                        id="email"
                        name="email"
                        aria-describedby="valid email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormHelperText id="comment" sx={{ color: "blue" }}>we won't use or show your email</FormHelperText>
                </FormControl>
            </FormLabel>
            <FormLabel component="div" required={true} filled={true}
                sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", padding: "1rem", width: "100%", background: theme.palette.common.lighter, color: "white", margin: "1rem auto" }}
            >
                <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative", background: theme.palette.common.light }}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        id="name"
                        name="name"
                        aria-describedby="Your full name"
                        placeholder=" your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={validName ? "false" : "true"}
                    />

                    <FormHelperText id="name" sx={{ color: "blue" }}>name</FormHelperText>

                </FormControl>
            </FormLabel>
            <FormLabel component="div" required={true} filled={true}
                sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", padding: "1rem", width: "100%", background: theme.palette.common.lighter, color: "white", margin: "1rem auto" }}
            >
                <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative", background: theme.palette.common.light }}>
                    
                    <TextareaAutosize 
                        id="comment"
                        name="comment"
                        placeholder=" please comment"
                        aria-describedby="minimum or two letters"
                        value={comment}
                        minRows={4}
                        onChange={(e) => setComment(e.target.value)}
                        aria-invalid={validComment ? "false" : "true"}
                    />

                    <FormHelperText id="comment" sx={{ color: "blue" }}>Your thoughts goes a long way, Thank you</FormHelperText>
                </FormControl>
            </FormLabel>
            <FormLabel component="div" required={true}
                sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", padding: "1rem", width: "100%", background: theme.palette.common.lighter, margin: "1rem auto" }}
            >
                <FormControl size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative", background: theme.palette.common.light }}>

                    <InputLabel id="demo-simple-select-label">rating</InputLabel>
                    <Select sx={{ color: "white" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rating}
                        label="Age"
                        onChange={(e) => setRating(e.target.value)}
                        aria-invalid={validRating ? "false":"true"}
                    >
                        <MenuItem value={0}>zero</MenuItem>
                        <MenuItem value={1}>one</MenuItem>
                        <MenuItem value={2}>two</MenuItem>
                        <MenuItem value={3}>three</MenuItem>
                        <MenuItem value={4}>four</MenuItem>
                        <MenuItem value={5}>five</MenuItem>
                    </Select>

                    <FormHelperText id="rating" sx={{ color: "blue" }}>Thank you for helping us improve on what you prefer.</FormHelperText>
                </FormControl>
            </FormLabel>
            <Stack direction="column" spacing={2} sx={{justifyContent:"center",alignItems:"center"}}>
            <Fab variant="extended" size="large" color="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                send <SendToMobileIcon sx={{ ml: 1, color: "green" }} />
            </Fab>
            </Stack>
        </form>
        {(returnedItem.loaded && returnedItem?.data && !timeoutMsg) &&
        <CustomStack direction="column" spacing={{xs:0,sm:1}}
        bs={theme.palette.common.blueFade}
        >
            <Paper elevation={3} sx={{margin:"auto",zIndex:"10000"}}>
            <Typography component="h1" variant="h5" sx={{margin:"1rem auto",padding:"0.5rem"}}>
                You comment was well recieved, shown below:
                <List sx={{zIndex:"1000"}}>
                <ListItem>email:{returnedItem.data.email}</ListItem>
                <ListItem>name: {returnedItem.data.name}</ListItem>
                <ListItem>rating: {returnedItem.data.rating}</ListItem>
                <Box>
                    <Typography component="h1" variant="h6">comment</Typography>
                    <Typography component="h1" variant="body2">
                        {returnedItem.data.comment}
                    </Typography>
                </Box>
                <Typography component="h1" variant="h5" sx={{margin:"1rem auto"}}>Thank you once again for contributing to our growth!</Typography>
            </List>
            </Typography>
            </Paper>
            
           
        </CustomStack>
            }
        </Container>
    )
}

export default PageFeedback