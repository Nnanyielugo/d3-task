import * as React from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/Toolbar';
import { styled } from '@material-ui/core/styles';

const CustomAppBar = styled(AppBar)({
  flexGrow: 1,
  backgroundColor: 'whitesmoke',
  margin: 0,
  padding: 0,
  alignItems: 'flex-start',
  height: 10,
});

const AppBarText = styled('h3')({
  marginLeft: 80,
});

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar>
        <AppBarText>Syrup Screener</AppBarText>
      </CustomAppBar>
    </Box>
  );
}
