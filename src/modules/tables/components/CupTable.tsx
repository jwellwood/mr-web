/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoDataText } from '../../../components';
import { Spinner } from '../../../components/loaders';

interface Props {
  data: any;
  competitionConfig: any;
  loading: boolean;
}

export default function CupTable({ competitionConfig, loading }: Props) {
  if (loading) return <Spinner />;

  if (competitionConfig.type !== 'Cup') return null;
  return <NoDataText>Cup table not yet available</NoDataText>;
}
