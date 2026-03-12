import { CustomAlert } from '../../../components/alerts';

interface Props {
  email: string;
}

export default function ValidationEmailSent({ email }: Props) {
  return (
    <CustomAlert
      type="info"
      text={`An email has been sent to ${email}. Click the link to validate your account`}
    />
  );
}
