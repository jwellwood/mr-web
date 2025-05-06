import React from 'react';
import Divider from '@mui/material/Divider';
import { BackButton } from '../buttons';
import SideDrawer from '../navigation/SideDrawer';
import { theme } from 'theme';
import CustomTypography from './CustomTypography';

interface Props {
  title: string;
  backButton?: boolean;
}

const PageHeader: React.FC<Props> = ({ title, backButton = true }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {backButton && <BackButton />}
          <CustomTypography color="data" bold size="md">
            {title}
          </CustomTypography>
        </div>
        <SideDrawer />
      </div>

      <Divider
        sx={{ background: theme.palette.label.main, marginBottom: '10px' }}
      />
    </>
  );
};

export default PageHeader;
