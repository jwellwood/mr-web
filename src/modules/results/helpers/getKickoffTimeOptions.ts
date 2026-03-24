import { ISelectOptions } from '../../../components';

export const getKickoffTimeOptions = (): ISelectOptions[] => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      times.push({ label, value: label });
    }
  }
  return times;
};
