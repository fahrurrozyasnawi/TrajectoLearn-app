import React from 'react';

type MultiProviderProps = {
  children: React.ReactNode;
  providers: React.ReactElement[];
};

const MultiProvider: React.FC<MultiProviderProps> = ({children, providers}) => {
  return (
    <>
      {providers.reduce<React.ReactNode>(
        (prev, current) => React.cloneElement(current, {children: prev}),
        children,
      )}
    </>
  );
};

export default MultiProvider;
