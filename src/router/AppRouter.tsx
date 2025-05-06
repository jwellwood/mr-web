import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOME, PROFILE, NOT_FOUND } from './paths';
import { Home, Profile } from '../pages';
import { NotFound } from '../components/navigation';
import { Layout } from '../components/layout';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={HOME} element={<Home />} />
          <Route path={PROFILE} element={<Profile />} />
        </Route>
        <Route path={NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
