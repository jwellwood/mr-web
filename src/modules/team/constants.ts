import type { ISelectOptions } from '../../components';

export const surfaceOptions = [
  { value: '', label: '' },
  { value: 'Grass', label: 'Grass' },
  { value: 'Artificial Grass', label: 'Artificial Grass' },
  { value: 'Astroturf', label: 'Astroturf' },
  { value: 'Concrete', label: 'Concrete' },
  { value: 'Acrylic', label: 'Acrylic' },
  { value: 'Sand', label: 'Sand' },
  { value: 'Other', label: 'Other' },
] as const satisfies ISelectOptions[];
