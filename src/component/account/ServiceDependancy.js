import React, { useContext, useEffect, useState, } from 'react';
// import { useNavigate } from 'react-router-dom';
import { PriceContext } from '../../context/PriceContextProvider';
import { Stack, Typography, Fab, Paper, } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


const ServiceDependancy = ({ usersArray }) => {
    const { DNS, serviceImage,userAccountGroup } = useContext(PriceContext);
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
                            }
                        }
                    });
    
                });
            }
    
        };

        let verifyArray = [DNS, serviceImage,userAccountGroup];
        verifyArray.forEach((state) => {
            if (state.loaded) {
                verifyInput(usersArray, state.data)
            }
        });

    }, [DNS, serviceImage, usersArray,userAccountGroup])


    return (
        <div>
            {
                (returnedArr.loaded) &&

                returnedArr.data.map(obj => (
                    <Stack direction="column" key={obj.id}
                     sx={{ width: "100%", alignItems: "center", justifyContent: "center",
                     position:"absolute",top:{sm:"0%",xs:"0%",md:"0%"}
                     }}>
                        <Paper elevation={20} sx={{padding:"0.5rem",width:"100%",margin:"0.5rem auto",textAlign:"center"}}>
                        <Typography component='h1' variant="h5" sx={{ margin: "1rem auto" }}> You should include {obj.name}</Typography>
                        <Fab variant="extended" color="warning" sx={{ width: {sm:"25%",xs:"100%"} }} onClick={() => setReturnedArr({ loaded: false })}>
                            close <ClearIcon sx={{ ml: 1, color: "red" }} />
                        </Fab>
                        </Paper>
                    </Stack>
                ))
            }
        </div>
    )
}

export default ServiceDependancy