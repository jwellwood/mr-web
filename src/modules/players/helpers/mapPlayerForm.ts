import { PlayerFormData } from '../forms/add-player/validation';
import { T_FETCH_PLAYER } from '../types';

export const mapFormToPlayer = (formData: PlayerFormData) => {
  return {
    ...formData,
    position: formData.position,
    squadNumber: String(formData.squadNumber ?? ''),
    dateOfBirth: formData.dateOfBirth
      ? formData.dateOfBirth.toISOString()
      : new Date().toISOString(),
    yearJoined: formData.yearJoined ? formData.yearJoined.toISOString() : new Date().toISOString(),
  };
};

export const mapPlayerToForm = (player: T_FETCH_PLAYER['player']): PlayerFormData => {
  return {
    name: player.name ?? '',
    nationality: player.nationality ?? '',
    dateOfBirth: player.dateOfBirth ? new Date(player.dateOfBirth) : new Date(),
    yearJoined: player.yearJoined ? new Date(player.yearJoined) : new Date(),
    position: (player.position as string) ?? 'DF',
    squadNumber: String(player.squadNumber ?? ''),
    isCaptain: Boolean(player.isCaptain),
    isViceCaptain: Boolean(player.isViceCaptain),
    isHallOfFame: Boolean(player.isHallOfFame),
    description: undefined,
    seasonIds: player.seasonIds ? player.seasonIds.map(s => s._id) : [],
  } as PlayerFormData;
};
