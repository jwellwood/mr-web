import React from 'react';
import { Button } from '@mui/material';
import {link_text} from "../../i18n";

interface Props {
  onClick: () => void;
}

const LogoutButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button variant='outlined' color='primary' onClick={onClick}>
      {link_text.sign_out}
    </Button>
  );
};

export default LogoutButton;
