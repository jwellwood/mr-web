import { NoDataText } from '../../../components';
import { SectionContainer } from '../../../components/containers';
import LinksList from '../../../components/lists/LinksList';
import { IListItem } from '../../../components/lists/types';
import { ICompetition } from '../types';

type Props = {
  competitions?: ICompetition[];
};

export default function CompetitionsList({ competitions }: Props) {
  const data: IListItem[] =
    competitions?.map(comp => {
      return {
        label: comp.name,
        value: comp.competitionType,
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
