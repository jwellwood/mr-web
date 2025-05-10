import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOME, PROFILE } from './paths';
import { Home, Profile } from '../pages';
import { Layout } from '../components/layout';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={HOME.HOME} element={<Home />} />
          <Route path={PROFILE.PROFILE} element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
