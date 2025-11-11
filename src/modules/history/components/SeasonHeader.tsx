import { ReactElement } from 'react';
import { SectionContainer } from '../../../components/containers';

type Props = {
  title: string;
  children: ReactElement;
};

export default function SeasonHeader({ children, title }: Props) {
  return <SectionContainer title={title}>{children}</SectionContainer>;
}
