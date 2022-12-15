import React, { useState, } from 'react';
import { Stack, Grid, Typography, Avatar, Fab } from '@mui/material';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const CustItemGrid=styled(Grid)`
display:flex;
justify-content:flex-start;
align-items:center;
flex-direction:column;
animation: growIn 1s ease-in-out;
@keyframes growIn {
    from {transform:scale(0);}
    to {transform:scale(1);}
}
@media screen and (max-width:900px){

}
@media screen and (max-width:800px){

}
@media screen and (max-width:600px){

}
`;
const Expander = ({ id, arr, staticImage }) => {
    const [expand, setExpand] = useState({ loaded: false, id: null });
    const bgColor= expand.loaded ? "red": "orange";
    const text=expand.loaded ? "green":"white";

    const handleExpandClose = (e, id) => {
        if (expand.loaded) {
            setExpand({ loaded: false, id: null });
        } else { setExpand({ loaded: true, id: id }); }
    }
    return (

        <>
            {(arr && arr.length > 0) &&
                <Stack direction="column" spacing={2}>

                    <Fab variant="extended" color="warning"
                        onClick={(e) => handleExpandClose(e, id)}
                        sx={{background:bgColor,color:text}}
                    >
                        {(expand.loaded && expand.id === id) ?
                            <> close
                                <ExpandMoreIcon sx={{ ml: 1 }} />
                            </>
                            :
                            <> extend
                                <ExpandLessIcon sx={{ ml: 1 }} />
                            </>
                        }
                    </Fab>
                </Stack>
            }
            <Grid container spacing={{ xs: 0, sm: 1 }}
            sx={{ maxHeight: "50vh", overflowY: "scroll" }}
        >
            {(arr && expand.loaded && expand.id === id) && arr.map((obj, index2) => (
                <CustItemGrid item xs={12} sm={6} key={`${obj.id}-item-${index2}`}
                    sx={{ margin: "1rem auto",flexDirection:"column" }}
                >
                    {obj.imageName ?
                        <Avatar src={`${staticImage}/${obj.imageName}`}
                            alt="www.master-connect.ca"
                            sx={{ width: "50px", height: "50px" }}
                        />
                        :
                        <Avatar src={`${staticImage}/${obj.image}`}
                            alt="www.master-connect.ca"
                            sx={{ width: "50px", height: "50px" }}
                        />
                    }
                    <Typography component="h1" variant="h5" sx={{ margin: "1rem auto" }} >{obj.name}</Typography>
                    <Typography component="h1" variant="body2" >{obj.summary}</Typography>
                </CustItemGrid>
            ))}
        </Grid>
        </>

    )
}

export default Expander