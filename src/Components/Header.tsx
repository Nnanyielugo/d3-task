import * as React from 'react';
import savePdf from 'd3-save-pdf';
import * as d3 from 'd3';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/Toolbar';
import Toolbar from '@material-ui/core/Toolbar';

import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const CustomAppBar = styled(AppBar)({
  flexGrow: 1,
  backgroundColor: 'whitesmoke',
  margin: 0,
  padding: 0,
  alignItems: 'flex-start',
  height: 10,
});

const AppBarText = styled('h3')({
  marginLeft: '10vw',
});

const DownloadContainer = styled('div')({
  alignSelf: 'center',
  marginLeft: '60vw',
});

export default function Header() {
  const handleSavePdf = () => {
    const config = {
      filename: 'MySVGFile',
    };
    savePdf.save(d3.select('svg').node(), config);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar>
        <Toolbar>
          <AppBarText>Syrup Tech Screener</AppBarText>

          <DownloadContainer>
            <Button onClick={handleSavePdf} color="inherit" size="small">
              <Icon>file_download</Icon>
            </Button>
          </DownloadContainer>
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
}
