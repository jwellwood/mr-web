import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useMediaQuery } from '@mui/material';
import { HOME, PROFILE } from 'router/paths';

export const useInternalNavigation = () => {
  let { pathname } = useLocation();
  const [value, setValue] = useState<string>(pathname);
  const bigScreen = useMediaQuery('(min-width: 769px)');

  const navValues = [HOME.HOME, PROFILE.PROFILE];

  if (!navValues.filter((value) => pathname === value).length)
    pathname = 'Home';

  useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return { value, handleChange, bigScreen };
};
