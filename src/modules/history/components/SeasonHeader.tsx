import React, { ReactElement } from 'react';
import {SectionContainer} from "../../../components/containers";

type Props = {
  title: string;
  children: ReactElement;
};

const SeasonHeader: React.FC<Props> = ({ children, title }) => {
  return <SectionContainer title={title}>{children}</SectionContainer>;
};

export default SeasonHeader;
