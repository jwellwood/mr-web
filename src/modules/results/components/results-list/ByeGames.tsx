import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../../components';
import { IListItem, LinksList } from '../../../../components/lists';
import { useCustomParams } from '../../../../hooks';
import { T_FETCH_RESULTS } from '../../graphql';

interface Props {
  results: T_FETCH_RESULTS['results'];
}

export default function ByeGames({ results }: Props) {
  const { orgId } = useCustomParams();
  const { t } = useTranslation('results');

  const links: IListItem[] = results.map(res => {
    return {
      label: res.homeTeam?.teamName || '',
      link: `/org/${orgId}/org_season/${res.orgSeasonId._id}/result/${res._id}`,
    };
  });

  return results.length > 0 ? (
    <SectionContainer key={`bye`} title={t('BYE_GAMES')}>
      <LinksList links={links} />
    </SectionContainer>
  ) : null;
}
