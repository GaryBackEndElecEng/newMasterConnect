import React from "react";
import styles from "./design3.module.css";
import styled from "styled-components";
import { GeneralContext } from "../../context/GeneralContextProvider";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SelectMainArr from "./SelectMainArr";

const CustSelection = styled.div`
  margin: 0 3vw;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // opacity:${({ open }) => (open ? "1" : "0")};
  opacity: 1;
  transition: all 2s ease-in-out;
`;


const Selection = ({ getWidth }) => {
  const { staticImage, select, setSelect } = React.useContext(GeneralContext);

  const [engages, setEngages] = React.useState({ loaded: false, data: [] });
  const [weddings, setWeddings] = React.useState({ loaded: false, data: [] });
  const [selectOpen, setSelectOpen] = React.useState({
    loaded: false,
    data: [],
  });

  React.useEffect(() => {
    const genEngage = () => {
      const engArr = [];
      for (let i = 1; i < 9; i++) {
        engArr.push({
          id: 1,
          name: `name-${i}`,
          image: `${staticImage}/design3/engagement/ring${i}.png`,
          type:"engagement",
          desc: `description-${i}`,
          price: "$$$",
        });
      }
      setEngages({ loaded: true, data: engArr });
    };
    genEngage();

    const genWedding = () => {
      const engArr = [];
      for (let i = 1; i < 7; i++) {
        engArr.push({
          id: 1,
          name: `name-${i}`,
          image: `${staticImage}/design3/wedding/ring${i}.png`,
          type:"wedding",
          desc: `description-${i}`,
          price: "$$$",
        });
      }
      setWeddings({ loaded: true, data: engArr });
    };
    genWedding();
  }, []);
  

  return (
    <CustSelection open={selectOpen}
    className={styles.custSelect}
    >
        <div className={styles.hr_line}/>
      <Container maxWidth="xl">
        <div style={{ position: "relative" }}>
          <SelectMainArr
            arr={engages}
            getWidth={getWidth}
            type={"Engagement"}
          />
          
        </div>
        <div style={{ position: "relative" }}>
          <SelectMainArr 
          arr={weddings}
           getWidth={getWidth}
           type={"Wedding"}
           />
          
        </div>
      </Container>
    </CustSelection>
  );
};

export default Selection;
