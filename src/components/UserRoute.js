import { observer } from 'mobx-react-lite';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStore } from '../stores';

const UserRoute = ({ component: Component, path, ...rest }) => {
  const store = useStore();
  const { userStore } = store;

  return (
    userStore.user?.user ? (
    <Route
      path={path}
      {...rest}
    />
    ) : (
      <Redirect to={{ pathname: `/login`, search:`?redirect=${path}` }} />
    )
  )
}

export default observer(UserRoute);