import { TApolloError } from '../../../types/apollo';
import { CustomAlert } from '../../alerts';

interface Props {
  error: TApolloError;
}

export default function MutationError({ error }: Props) {
  const defaultErrorMessage = 'Something went wrong. Please try again later.';
  return <CustomAlert type="error" text={error.message || defaultErrorMessage} />;
}
