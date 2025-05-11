import React, { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {GET_ROLES} from "../modules/auth/graphql";
import {useAuth} from "../hooks";
import {setAuth} from "../modules/auth";
import {PageContainer} from "../components/containers";
import {Spinner} from "../components/loaders";
import AlertMessage from "../modules/alerts/components/AlertMessage.tsx";
import AppHead from "../AppHead.tsx";
const AppRoutes = lazy(() => import('./Routes'));


function AppRouter () {
    const dispatch = useDispatch();
    const { data, loading } = useQuery(GET_ROLES);
    const { isAuth } = useAuth();

    useEffect(() => {
        if (data && !loading) {
            dispatch(
                setAuth(data.user?.roles, data.user?.teamIds, data?.user.orgIds)
            );
        } else {
            dispatch(setAuth([''], [], []));
        }
    }, [data, dispatch, loading]);

    return (
        <BrowserRouter>
            <AppHead />
            <PageContainer>
                <React.Suspense fallback={<Spinner />}>
                    {isAuth !== null && !loading && <AppRoutes />}
                </React.Suspense>
                <AlertMessage />
            </PageContainer>
        </BrowserRouter>
    );
};

export default AppRouter;
