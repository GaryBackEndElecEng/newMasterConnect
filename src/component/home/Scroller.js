import React from "react";
import styles from "./home.module.css";
import { Stack, Box, Typography, Container } from "@mui/material";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import styled from "styled-components";

const ScrollerTrain = styled(Stack)`
  align-items: center;
  flex: 0 0 32%;
  text-align: center;
  justify-content: flex-start;
  color: black;
  scroll-margin-left: 0;

  flex-wrap: nowrap;
  animation: scrollMsg 50s linear infinite;
  scroll-margin-left: 0;
  @keyframes scrollMsg {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(${({ translate }) => translate}%);
    }
  }
  @media screen and (max-width: 900px) {
    flex: 0 0 50%;
  }
  @media screen and (max-width: 600px) {
    flex: 0 0 90%;
  }
`;
const ScrollerTrainReverse = styled(Stack)`
  align-items: center;
  flex: 0 0 39%;
  text-align: center;
  justify-content: flex-start;
  color: black;
  scroll-margin-left: 0;
  flex-wrap: nowrap;
  animation: scrollMsg 50s linear infinite;
  animation-direction: reverse;
  scroll-margin-left: 0;
  @keyframes scrollMsg {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(${({ translatex }) => translatex}%);
    }
  }
  @media screen and (max-width: 900px) {
    flex: 0 0 50%;
    // font-size:120%;
  }
  @media screen and (max-width: 600px) {
    flex: 0 0 90%;
  }
`;

const Scroller = () => {
  const [trainLength, setTrainLength] = React.useState(0);
  const [trainLength1, setTrainLength1] = React.useState(0);
  const [fontsize, setFontsize] = React.useState("h3");

  const arr = [
    {
      id: 1,
      name: "Content Strategy",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 2,
      name: "Research",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 3,
      name: "Interactive",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 4,
      name: "automation",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 5,
      name: "Prototyping",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 6,
      name: "Quick design",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 7,
      name: "Ecommerce",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 8,
      name: "Web-development",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 9,
      name: "Photography",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 10,
      name: "R & D",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 11,
      name: "Mobile Apps",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 12,
      name: "back-end R&D",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
  ];
  const arr1 = [
    {
      id: 13,
      name: "Chap AI",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 14,
      name: "DB Ownership",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 15,
      name: "Unbeatable $$$",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 16,
      name: "Andoid",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 17,
      name: "IOS",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 18,
      name: "Front-end R&D",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 19,
      name: "JWT Tech",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 20,
      name: "user accounts",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 21,
      name: "API Calls",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 22,
      name: "Responsive Des.",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 23,
      name: "fits All Screens",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 24,
      name: "Secure design",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
    {
      id: 25,
      name: "Content Strategy",
      icon: <FileDownloadDoneIcon sx={{ ml: 1, mr: 1, color: "lightgrey" }} />,
    },
  ];
  React.useEffect(() => {
    setTrainLength(-arr.length * 80);
    setTrainLength1(-arr1.length * 80);
    if (window.innerWidth < 900) {
      setFontsize("h4");
    }
  }, []);

  return (
    <div className={styles.mainScroller}>
    <Container
      component="section"
      maxWidth="xl"
      sx={{ minHeight: "300px",paddingTop:"6rem",}}
    >
      <section className={styles.section4Container}>
        <Typography component="h1" variant="h2" className={styles.fontStyleScoller}>What we do</Typography>
        <div className={styles.scrollerParentSec4}>
          {arr.length > 0 &&
            arr.map((obj, index) => (
              <ScrollerTrain
                translate={trainLength}
                key={`${obj.id}--${index}`}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ textAlign: "center", alignItems: "center" ,color:"white"}}
                >
                  {obj.icon}
                  <span style={{color:"white"}}>{obj.id}</span>
                  <Typography component="h1" variant={fontsize} style={{color:"white"}}>
                    {obj.name}
                  </Typography>
                </Stack>
              </ScrollerTrain>
            ))}
        </div>
        <div className={styles.scrollerParentSec4}>
          {arr1.length > 0 &&
            arr1.map((obj, index) => (
              <ScrollerTrainReverse
                translatex={trainLength1}
                key={`${obj.id}--${index}`}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ textAlign: "center", alignItems: "center",color:"white",fontFamily:"var(--font-family)" }}
                >
                  {obj.icon}
                  <span style={{color:"white"}}>{obj.id}</span>
                  <Typography component="h1" variant={fontsize} style={{color:"white",fontFamily:"var(--font-family)",}}>
                    {obj.name} 
                  </Typography>
                </Stack>
              </ScrollerTrainReverse>
            ))}
        </div>
      </section>
    </Container>
    </div>
  );
};

export default Scroller;
