import React from 'react';
import Header from '../Header';

interface IMainProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IMainProps) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
