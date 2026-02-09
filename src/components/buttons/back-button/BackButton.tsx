import { IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../../icons';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  return (
    <IconButton onClick={onClick}>
      <AppIcon icon="back" size="20px" color="white" />
    </IconButton>
  );
};

export default BackButton;
