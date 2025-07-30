import React from 'react';
import { BackButton } from '../buttons';
import SideDrawer from '../navigation/SideDrawer';
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
    </>
  );
};

export default PageHeader;
