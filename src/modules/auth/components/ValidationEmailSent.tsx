import { InfoAlert } from '../../../components/alerts';

interface Props {
  email: string;
}

export default function ValidationEmailSent({ email }: Props) {
  return (
    <InfoAlert>
      An email has been sent to {email}. Click the link to validate your account
    </InfoAlert>
  );
}
