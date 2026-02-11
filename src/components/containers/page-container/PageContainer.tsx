import React from 'react';
import { TLinkType } from '../../../constants';
import { PageHeader } from '../../composed';

interface Props {
  children: React.ReactElement;
  title: string;
  backButton?: boolean;
  links?: { label: string; type: TLinkType; link: string }[];
}

export default function PageContainer({ children, title, backButton = true, links }: Props) {
  return (
    <PageHeader title={title} links={links} backButton={backButton}>
      {children}
    </PageHeader>
  );
}
