import React from 'react';

import RouteGuard from '../../../router/RouteGuard';
import { PageHeader } from '../../shared';
import { TLinkType, TAuthRoles } from '../../../constants';

interface Props {
  children: React.ReactElement;
  auth: TAuthRoles;
  title: string;
  backButton?: boolean;
  links?: { label: string; type: TLinkType; link: string }[];
}

export default function PageContainer({ children, auth, title, backButton = true, links }: Props) {
  return (
    <RouteGuard authorization={auth}>
      <PageHeader title={title} links={links} backButton={backButton}>
        {children}
      </PageHeader>
    </RouteGuard>
  );
}
