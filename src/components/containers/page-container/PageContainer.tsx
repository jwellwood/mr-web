import React from 'react';
import { TLinkType } from '../../../constants';
import { PageHeader } from '../../composed';
import { type HelpContent } from '../../modals';

interface Props {
  children: React.ReactElement;
  title: string;
  backButton?: boolean;
  links?: { label: string; type: TLinkType; link: string }[];
  help?: HelpContent;
}

export default function PageContainer({ children, title, backButton = true, links, help }: Props) {
  return (
    <PageHeader title={title} links={links} backButton={backButton} help={help}>
      {children}
    </PageHeader>
  );
}
