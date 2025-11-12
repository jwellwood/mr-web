import { Route } from 'react-router-dom';
import { PLAYER, TEAM } from './paths.ts';
import {
  DeletePlayer,
  EditPlayer,
  EditPlayerPhoto,
  Player,
} from '../../modules/players/routes.tsx';
import { Trophy } from '../../modules/history/routes.tsx';

export const PLAYER_ROUTES = () => (
  <>
    <Route path={PLAYER.PLAYER}>
      <Route index={true} element={<Player />} />
      <Route path={PLAYER.EDIT} element={<EditPlayer />} />
      <Route path={PLAYER.EDIT_PHOTO} element={<EditPlayerPhoto />} />
      <Route path={PLAYER.DELETE} element={<DeletePlayer />} />
      <Route path={TEAM.TROPHY} element={<Trophy />} />
    </Route>
  </>
);
