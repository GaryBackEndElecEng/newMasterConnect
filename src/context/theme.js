
import {createTheme} from '@mui/material/styles';
import {orange,red,blue,lightBlue,blueGrey,teal,purple,grey,indigo,pink,cyan,green,yellow,brown} from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

export const windowTheme=createTheme({
  // palette:{
  //   primary:{
  //     light:"#42a5f5",
  //     main:"#1976d2",
  //     dark:"#1565c"
  //   },
  //   secondary:{
  //     light:"#ba68c8",
  //     main:"#9c27b0",
  //     dark:"#7b1fa2"
  //   },
  //   error:{
  //     light:"#ef5350",
  //     main:"#d32f2f",
  //     dark:"#c62828"
  //   },
  //   warning:{
  //     light:"#ff9800",
  //     main:"#ed6c02",
  //     dark:"#e65100"
  //   },
  // }
});

export const theme = createTheme({
  status:{
    danger:red[900],
  },
  mode:{
    dark:grey[900],
    light:grey[50]

  },
  palette:{
    
    primary2:blue[500],
    fade:alpha(blue[400],.5),
    secondary2:{
      main:'#9c27b0',
      light:"#ba68c8",
      dark:"#7b1fa2",
      
    },
    sand:alpha("#DB9A59",.5),
    aqua:alpha("#00A68D",.5),
    lightGreen:alpha(green[900],.7),
    common:{
      dark:grey[900],
      darker:grey['A200'],
      medium:alpha(grey[400],1),
      mediumGreen:alpha(green[500],1),
      teal:alpha(teal[900],.9),
      mediumTeal:alpha(teal[600],.3),
      lightTeal:alpha(teal[300],.1),
      light:grey[300],
      shadeGrey:alpha(grey[400],0.5),
      lighter:grey[100],
      red:red[600],
      lightRed:alpha(red[600],.8),
      blueGrey:blueGrey[500],
      blueGreyFade:alpha(blueGrey[500],.7),
      blueGreyLight:alpha(blueGrey[300],.4),
      transparent:alpha(grey[200],.8),
      background:alpha(grey[900],1),
      background2:alpha(blueGrey[500],.6),
      background3:alpha(blueGrey[900],.8),
      blueGreyDark:blueGrey[900],
      blueFade:alpha(blue[300],.7),
      blueFadeLighter:alpha(blue[300],.4),
      orangeFade:alpha(orange[400],.2),
      orangeFade2:alpha(orange[900],.6),
      orangeFade3:alpha(orange[900],1),
      mediumBlue:alpha(blue[500],.5),
      mediumBlue2:alpha(blue[400],.3),
      blue:blue[600],
      darkBlue:alpha(blue[800],1),
      cyanPale:alpha(cyan[200],.5),
      lightBrow:alpha(brown[300],1),
      fadeCharcoal:alpha("#333",0.6),
      fadeCharcoal2:alpha("#333",0.4),
      fadeCharcoal3:alpha("#333",0.9),


    },
    home:{
      light:red[50],
      light2:"rgba(255,205,255,.3)",
      blueGrey:blueGrey[500],
      transparent:alpha(grey[200],.3),
      background:alpha(grey[900],1),
      background2:alpha(blueGrey[200],.6),
      letters:cyan[900],
      emphasize:alpha(orange[600],.4),
      white:"rgb(255,255,255)",
      mediumCyan:alpha(cyan[400],.4),
      grey:alpha(grey[500],1),
      blueGrey2:alpha(blueGrey[800],.5),
      lightBlue:alpha(blue[400],.3),
      lightBlueGrey:alpha(blueGrey[400],.6),
    },
    primary:{
      main:blue[300],
      light:lightBlue[200],
      dark:blue[600],
      lighter:lightBlue[50],
    },
    secondary:{
      main:red[300],
      light:alpha(purple[50],.8),
      lighter:red[200],
      dark:purple[900],
      darkRed:red[900]

    },
    background:{
      main:grey[800],
      light:grey[50]
    },
    logo:{
      main:alpha(red[400],1),//use
      dark:alpha(grey[900],1),//use
      medium:alpha(blueGrey[200],.8),//use
      light:alpha(grey[400],1),//use
      circleFill:alpha(teal[200],1), //turned off ctx.stroke()
      circleStroke:alpha(teal[900],1),//use
      help:alpha(indigo[900],1),//use
      lines:alpha(teal[900],1),
    },
    footer:{
      dark:grey[900],
      main:lightBlue[400],
      light:lightBlue[100], 
      medium:indigo[600],
      darkIndigo:alpha(indigo[900],1),
      mediumLight:alpha(blueGrey[300],.2),
      lighter:alpha(grey[100],.7),
      bannerWords:red[300],
      bgBanner:alpha(grey[900],1),
      blueGrey:alpha(blueGrey[500],.9),
      mediumLightBlue:alpha(blue[500],.7),
      secondary:alpha(purple[500],1)
    },
    navBar:{
      dark:grey[900],
      darkLight:grey['A700'],
      medium:grey[400],
      light:grey[50],
      red:red[200],
      lightRed:red[100],
      blueGrey:blueGrey[500],
      lightBlueGrey:alpha(blueGrey[500],.6),
      dropDown:alpha(blueGrey[900],.7)
    },
    card:{
      main:teal[300],
      light:teal[50]
    },
    icon:{
      purple:{
        main:purple[500],
        secondary:indigo[200]},
      indigo:{
        main:indigo[500],
        secondary:yellow[200]},
      cyan:{
        main:cyan[500],
        secondary:pink[200]},
        star:{
          main:yellow[600]
        }
    },
    splash: `linear-gradient(to left, lightgrey,darkgrey, grey 50%, lightgrey 75%, lightgrey 75%);`,
    splash2: `linear-gradient(to left top,black,white);`,
  }
})

