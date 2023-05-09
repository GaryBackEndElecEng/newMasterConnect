import React from "react";
import styles from "./design.module.css";
import { Button, Container, Grid } from "@mui/material";
// import styled  from "styled-components";
import Product from "./Product";




const MasterProduct = ({staticImage,productDesigns}) => {

  return (
    <Container maxWidth="xl" sx={{ position: "relative",minHeight:"100dvh",justifyContent:"center",alignItems:"center",flexDirection:"column",display:"flex", }}>
      
       
      <div className={styles.scrollParent}>
        <Grid container spacing={{xs:1,sm:10}} sx={{margin:"auto",justifyContent:"center",alignItems:"center"}} >
        
          {productDesigns.loaded &&
            productDesigns.data.map((obj, index) => (
              <Grid item xs={12} 
              data={`data-${index}`}
                key={`${obj.id}--${index}`}
                className={styles.scrollChild}
              >
                
                <Product
                  getId={`scroll-${index + 1}`}  
                  product={obj}
                  staticImage={staticImage}
                  
                />
              </Grid>
            ))}
        </Grid>
        </div>
        
        <div className={styles.hr_line} />
      </Container>
  )
}

export default MasterProduct