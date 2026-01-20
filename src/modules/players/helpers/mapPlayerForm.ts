import { PlayerFormData } from '../forms/add-player/validation';

export const mapPlayerForm = (formData: PlayerFormData) => {
  return {
    ...formData,
    squadNumber: String(formData.squadNumber),
    dateOfBirth: formData.dateOfBirth,
  };
};
