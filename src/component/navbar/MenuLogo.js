import React ,{useContext} from 'react';
import {GeneralContext} from '../../context/GeneralContextProvider';
import {MenuLogoBox} from '../../styled/Div.styled';

const MenuLogo = () => {
    const {staticImage,}=useContext(GeneralContext);
    const logo=`${staticImage}/logo.png`;
    return (
      <MenuLogoBox display={"flex"} width={110}>
      <img src={logo} style={{width:"100%",height:"100%",borderRadius:"50%"}} alt=" master-connect"/>
      </MenuLogoBox>
    )
}

export default MenuLogo