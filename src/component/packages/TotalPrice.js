import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';

const TotalPrice = ({ obj }) => {
    return (
        <Stack direction="column" sx={{margin:"0.5rem auto"}} spacing={{xs:0,sm:1}}>
        <Stack direction={{ md: "row", xs: "column" }} spacing={2} sx={{ alignItems: "center", justifyContent: "center", margin: "auto", padding: " 0.25rem 0.5rem", boxShadow: "1px 1px 15px 5px grey", width: "100%",}}>
            <Typography component="h1" variant="body1" sx={{ margin: "1rem auto" }}>reg: $
                <span style={{ textDecoration: "line-through" }}>{reducePerc(obj.monthly, obj.reducePerc).price2}</span>
                <sup>00</sup>
            </Typography>
            <Box>
                <Typography component="h1" variant="body1" sx={{ margin: " auto" }}>
                    <span style={{ color: "blue" }}>reduced: </span><DiscountIcon sx={{ ml: 1, mr: 1, color: "red",fontSize:"80%" }} /><span style={{ color: "green" }}>$</span>
                    <span style={{ fontWeight: "bold",margin:"0 0.25rem" }}>
                        {obj.monthly}.<sup style={{margin:"0 0.25rem"}}>0{reducePerc(obj.monthly, obj.reducePerc).num2}</sup>
                    </span>
                    
                </Typography>
            </Box>
            <Box>
                <Typography component="h1" variant="body1" sx={{ margin: "1 auto" }}>
                    
                    <span style={{ fontWeight: "bold", margin: "0 0.5rem" }}>
                        {obj.reducePerc} % -<span style={{color:"red"}}> off</span>
                    </span>
                </Typography>
            </Box>
            
        </Stack>
        <Stack direction="row" sx={{margin:"0.5rem auto",textAlign:"center", justifyContent:"center"}}>
        <DiscountIcon sx={{ ml: 1, mr: 1, color: "red" }} />
                <Typography component="h1" variant="h6">Savings:</Typography>
                <Typography component="h1" variant="h5">$ {obj.savings}.<sup>00</sup></Typography>
            </Stack>
        </Stack>
    )
}

export default TotalPrice

function reducePerc(price, reducePerc) {
    let num = price
    let price2 = Math.floor(num * (1 + reducePerc / 100))
    let num2 = Math.floor((num * (1 + reducePerc / 100) - price2) * 100)
    let main = { price2: price2, num2: num2 }
    return main
}