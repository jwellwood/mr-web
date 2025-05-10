import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AppIcon from '../icons/AppIcon';
import { IIconType } from '../icons/types';
import CustomTypography from '../typography/CustomTypography';

type Props = {
  link?: string;
  icon: IIconType;
  current?: string;
  value: string;
  label: string;
  onClick?: () => void;
};

const CustomNavigationButton: React.FC<Props> = ({
  link,
  current,
  value,
  icon,
  label,
  onClick,
}) => {
  return (
    <BottomNavigationAction
      key={link}
      component={Link}
      to={link as string}
      onClick={onClick}
      showLabel={true}
      label={
        <CustomTypography
          size="xs"
          bold
          color={current === value ? 'data' : 'label'}
        >
          {label}
        </CustomTypography>
      }
      value={value}
      icon={
        <AppIcon
          size={current === value ? '1.4rem' : '1.2rem'}
          icon={icon}
          color="primary"
        />
      }
    />
  );
};

export default CustomNavigationButton;
