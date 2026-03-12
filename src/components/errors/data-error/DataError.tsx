import { TApolloError } from '../../../types/apollo';
import { CustomAlert } from '../../alerts';

interface Props {
  error: TApolloError;
}

export default function DataError({ error }: Props) {
  return <CustomAlert type="error" title="Something went wrong" text={error.message} />;
}
