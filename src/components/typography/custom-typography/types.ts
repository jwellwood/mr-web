export type ColorToken =
  | 'label'
  | 'data'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | 'white'
  | 'gold'
  | 'silver'
  | 'bronze'
  | (string & {});

export type SizeToken = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {});
