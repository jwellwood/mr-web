import { CustomTypography } from '../../../components/typography';

interface Props {
  email: string;
}

export default function ValidationEmailSent({ email }: Props) {
  return (
    <CustomTypography color="data">
      An email has been sent to {email}. Click the link to validate your account
    </CustomTypography>
  );
}
