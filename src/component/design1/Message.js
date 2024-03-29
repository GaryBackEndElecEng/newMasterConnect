import React from 'react'
import { Stack, Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Message = ({comment,title}) => {
  const theme = useTheme();
  return (
    <Stack direction="column" sx={{ width: "100%", position: "relative" }}>
      <Paper elevation={4} sx={{ backgroundColor: theme.palette.fade}}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Paper component="div" elevation={2}>
            <Typography component="h1" variant="h5" sx={{ color: theme.palette.primary.dark, textAlign: "center" }} >
              {title}
            </Typography>
          </Paper>
          <Typography component="h1" variant="body1" sx={{color:theme.palette.common.light,padding:"0.5rem"}}>
            {comment}
          </Typography>

        </Box>
      </Paper>
    </Stack>
  )
}

export default Message