import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../../icons';

export default function BackButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };

  return (
    <IconButton onClick={onClick}>
      <AppIcon icon="back" size="20px" color="white" />
    </IconButton>
  );
}
