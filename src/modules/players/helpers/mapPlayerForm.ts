import { IPlayer } from '../../../types';

export const mapPlayerForm = (formData: Partial<IPlayer>) => {
  return {
    ...formData,
    squadNumber: String(formData.squadNumber),
    dateOfBirth: formData.dateOfBirth,
  };
};
