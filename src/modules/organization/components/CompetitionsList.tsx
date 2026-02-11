import { NoDataText } from '../../../components';
import { SectionContainer } from '../../../components';
import { LinksList, type IListItem } from '../../../components/lists';
import { ICompetition } from '../types';

interface Props {
  competitions?: ICompetition[];
}

export default function CompetitionsList({ competitions }: Props) {
  const data: IListItem[] =
    competitions?.map(comp => {
      return {
        label: comp.competitionType,
        value: comp.name,
        link: `competition/${comp._id}`,
      };
    }) || [];

  const renderContent = competitions?.length ? (
    <LinksList links={data} />
  ) : (
    <NoDataText>No competitions yet</NoDataText>
  );

  return <SectionContainer title="Competitions">{renderContent}</SectionContainer>;
}
