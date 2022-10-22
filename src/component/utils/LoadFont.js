import React  from 'react';
// import {GeneralContext} from '../../context/GeneralContextProvider';
import { useGoogleFonts, GoogleFontsStatus } from "@flayyer/use-googlefonts";


const GoogleFont = ({family}) => {
   
    const font = useGoogleFonts([
        {
          family: "Cabin", // Family Name
          styles: [
            "600..700", // Range, if family supports it.
            "100..200italic", // Range with italic
            "300italic", // Weight with italic
            "regular", // Shortcut to 400
            "italic", // Shortcut to 400 Italic
            "500", // Regular with weight
            444, // Regular weight for variable font
          ],
        },
        {
          family: "Roboto", // Family Name - Roboto doesn't support ranges
          styles: [
            "300italic", // Weight with italic
            "regular", // Shortcut to 400
            "italic", // Shortcut to 400 Italic
            "500",
            100,
          ],
        },
      ]);
    
      if (font.status === GoogleFontsStatus.FAILED) {
        console.log(font.error);
      }
      console.log(font.href);
      // https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,444;0,500;0,600..700;1,100..200;1,300;1,400;1,600..700&family=Roboto:ital,wght@0,100;0,400;0,500;1,300;1,400&display=auto
      return `${family}, sans-serif` 
       
  
}

export default GoogleFont