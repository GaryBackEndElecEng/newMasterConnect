import React, { useContext, useEffect, useState,  } from 'react';

import { PriceContext } from '../../context/PriceContextProvider';
import { Stack, Typography, Fab, Paper, } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


const ServiceDependancy = ({ usersArray }) => {
    const { DNS, SEO,userAccountPostGroup } = useContext(PriceContext);
    const [returnedArr, setReturnedArr] = useState({ loaded: false, data: [] });


    useEffect(() => {

        const verifyInput = (usersArray, checkArray) => {
            if (usersArray && checkArray) {
                let checkArr = checkArray;
                let getServiceImage = usersArray;
                getServiceImage.forEach((obj) => {
                    checkArr.forEach((dns, index) => {
                        if (parseInt(dns.id) === parseInt(obj.id)) {
                            checkArr.splice(index, 1)
                            if (checkArr.length > 0) {
                                return setReturnedArr({ loaded: true, data: checkArr })
                            }else{setReturnedArr({ loaded: false, data: [] })}
                        }
                    });
    
                });
            }
    
        };

        let verifyArray = [DNS, SEO,userAccountPostGroup];
        verifyArray.forEach((state) => {
            if (state.loaded) {
                verifyInput(usersArray, state.data)
            }
        });

    }, [DNS, SEO, usersArray,userAccountPostGroup])


    return (
        <div>
            {
                (returnedArr.loaded) &&

                
                    <Stack direction="column" 
                     sx={{ width: "100%", alignItems: "center", justifyContent: "center",
                     position:"absolute",top:{sm:"0%",xs:"0%",md:"0%"},marginLeft:"0%",left:"0%",zIndex:"10000"
                     }}>
                        <Paper elevation={20} sx={{padding:"0.5rem",width:"100%",margin:"0.5rem auto",textAlign:"center"}}>
                       { returnedArr.data.map(obj => (
                        <Typography component='h1' variant="h5"
                        key={`${obj.id}-${Math.ceil(Math.random()*1000)}`}
                         sx={{ margin: "1rem auto" }}>
                             You should include {obj.name}
                        </Typography>
                        ))}
                        <Typography component="h1" variant="h4" sx={{margin:"1rem auto"}}>These are all dependancies</Typography>
                        <Fab variant="extended" color="warning" sx={{ width: {sm:"25%",xs:"100%"} }} onClick={() => setReturnedArr({ loaded: false })}>
                            close <ClearIcon sx={{ ml: 1, color: "red" }} />
                        </Fab>
                        </Paper>
                    </Stack>
                
            }
        </div>
    )
}

export default ServiceDependancy