import { CustomAvatar } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { T_FETCH_ORG_TEAMS } from '../graphql';

interface Props {
  team: T_FETCH_ORG_TEAMS['teams'][number] | null | undefined;
}

export default function KitDisplay({ team }: Props) {
  const kit = (color: string) => (
    <CustomAvatar>
      <div style={{ height: 20, width: 20, background: color || 'transparent' }} />
    </CustomAvatar>
  );

  return (
    <CustomStack direction="row" spacing={0}>
      {kit(team?.homeShirt || 'transparent')}
      {kit(team?.awayShirt || 'transparent')}
    </CustomStack>
  );
}
