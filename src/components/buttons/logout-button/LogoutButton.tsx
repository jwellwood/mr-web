import { Button } from '@mui/material';
import { link_text } from '../../../i18n';

interface Props {
  onClick: () => void;
}

export default function LogoutButton({ onClick }: Props) {
  return (
    <Button variant="text" color="tertiary" onClick={onClick}>
      {link_text.sign_out}
    </Button>
  );
}
