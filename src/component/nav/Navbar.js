import React from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./navbar.module.css";
import styled from "styled-components";
import { IconButton, Typography, Grid, Stack } from "@mui/material";
import RegisterPage from "../RegisterPage";

const CustNav = styled.nav.attrs({ className: styles.custNav })`
  position: fixed;
  top: ${({ open }) => (open ? "0" : "2")}%;
  left: ${({ open }) => (open ? "0" : "0")}%;
  z-index: ${({ open }) => (open ? "10000" : "100")};
  width: ${({ open }) => (open ? "90" : "0")}vw;
  height: ${({ open }) => (open ? "60" : "0")}vh;
  transition: all 0.75s ease-in-out;
  background: var(--background-1111);
  @media screen and (max-width: 1200px) {
    width: ${({ open }) => (open ? "100" : "0")}vw;
    height: ${({ open }) => (open ? "70" : "0")}vh;
    left: 0%;
    top: 0%;
  }
  @media screen and (max-width: 900px) {
    width: ${({ open }) => (open ? "100" : "0")}vw;
    height: ${({ open }) => (open ? "50" : "0")}vh;
    left: 0%;
    top: 0%;
  }
  @media screen and (max-width: 600px) {
    width: ${({ open }) => (open ? "100" : "0")}vw;
    height: ${({ open }) => (open ? "100" : "0")}vh;
    left: 0%;
    top: 0%;
  }
`;
const CustomButton = styled(IconButton)`
  // min-height: "10vh";
  position: absolute;
  left: 0%;
  top: 0%;
  z-index: ${({ open }) => (open ? "1000" : "100")};
  background-color: ${({ open }) =>
    open ? "var(--background-1111)" : "white"};
  border-radius: 50%;
  width: ${({ open }) => (open ? "85px" : "55px")};
  height: ${({ open }) => (open ? "85px" : "55px")};
  box-shadow: ${({ open }) =>
    open ? "1px 1px 10px 2px red" : "1px 1px 10px 2px white"};
  // margin-right: 100px;
  background-image: url(${({ bgimage }) => bgimage});
  background-position: 50% 50%;
  background-size: 125% 125%;
  transition: all 1s ease-in;
  overflow: hidden;
  cursor: pointer;
  @media screen and (max-width: 900px) {
    width: ${({ open }) => (open ? "70px" : "55px")};
    height: ${({ open }) => (open ? "70px" : "55px")};
    left: 0%;
    top: 0%;
  }
  @media screen and (max-width: 600px) {
    width: ${({ open }) => (open ? "65px" : "45px")};
    height: ${({ open }) => (open ? "65px" : "45px")};
    left: 0%;
    top: 0%;
  }
`;
const CustNavGrid = styled(Grid)`
  opacity: ${({ open }) => (open ? "1" : "0")};
  width: ${({ open }) => (open ? "100" : "0")}%;
  height: ${({ open }) => (open ? "auto" : "0px")};
  justify-content: center;
  align-items: flex-start;
  // align-content:start;
  gap: 10px;
  padding: 10px;
  transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
  transition: all 0.75s ease-in-out;
  color: white;
  @media screen and (max-width: 600px) {
    gap: 0px;
    padding-inline: 5px;
  }
`;
const CustGridChild = styled(Grid)`
  display: ${({ open }) => (open ? "flex" : "none")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  width: auto;
  height: auto;
  margin: auto;
  justify-self: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 5px;
  transform: ${({ open }) => (open ? "scale(1)" : "scale(0)")};
  transition: all 0.75s ease-in-out;
  color: white;
  box-shadow: 1px 1px 4px 1px white;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 2px;
    margin: 0px;
  }
`;
const Ukrain = styled(Stack)`
  opacity: ${({ opacity }) => opacity};
  width: ${({ width }) => width};
  background-image: url(${({ bgimage }) => bgimage});
  background-size: 100% 100%;
  background-position: 50% 50%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;
const GridFlag = styled(Grid)`
  height: 10vh;
  background-image: url(${({ bgimage }) => bgimage});
  background-size: 100% 100%;
  background-position: 50% 50%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;

const Navbar = () => {
  const { open, setOpen, staticImage, navList } =
    React.useContext(GeneralContext);
  const navigate = useNavigate();
  const logo = `${staticImage}/logo.png`;
  const ukrain = `${staticImage}/extra/ukrain.png`;
  const [getWidth, setGetWidth] = React.useState(null);
  const [activate, setActivate] = React.useState(null);
  const is600 = window.innerWidth < 600 ? true : false;
  const is900 =
    window.innerWidth < 900 && window.innerWidth > 600 ? true : false;
  const iconbuttonFontsize = is600 ? "8px" : "none";

  React.useEffect(() => {
    setGetWidth(window.innerWidth);
    setOpen(false);
    if (window.scrollY) {
      window.scroll(0, 0);
    }
  }, []);
  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        setActivate(true);
      }, 1000);
    } else {
      setActivate(false);
    }
  }, [open]);

  const handleOnClick = (e) => {
    e.preventDefault();
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const handleNavigate = (e, link) => {
    e.preventDefault();
    setOpen(false);
    navigate(link);
  };
  const handleClose = (e) => {
    e.preventDefault();
    if (open) {
      document.addEventListener("scroll", () => {
        if (window.scrollY) {
          setOpen(false);
        }
      });
    }
  };

  return (
    <CustNav
      open={open}
      width={is900 ? "100%" : "100%"}
      height={is900 ? (is600 ? "100vh" : "80vh") : "60vh"}
      activate={activate}
    >
      <CustomButton
        spacing={open ? 5 : 0}
        open={open}
        bgimage={logo}
        onClick={(e) => {
          handleOnClick(e);
        }}
      ></CustomButton>

      <div>
        <div>
          <CustNavGrid
            container
            open={open}
            className={styles.custNavGridList}
            onMouseOut={(e) => handleClose(e)}
            spacing={1}
          >
            {navList &&
              navList.map((obj, index) => (
                <CustGridChild
                  open={open}
                  item
                  key={`${obj.id}--link--${index}`}
                  xs={6}
                  sm={4}
                  md={4}
                  onClick={(e) => handleNavigate(e, obj.link)}
                >
                  <IconButton>{obj.icon}</IconButton>
                  <Typography
                    component="h1"
                    variant={is600 ? "body1" : "h6"}
                    sx={{ color: "white" }}
                  >
                    {obj.name}
                  </Typography>
                </CustGridChild>
              ))}
          </CustNavGrid>
          
        </div>
        <RegisterPage/>
      </div>
    </CustNav>
  );
};

export default Navbar;
