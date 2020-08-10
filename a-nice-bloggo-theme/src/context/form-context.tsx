import React, { createContext } from "react";

export const ArmadaFormsContext = createContext({
  client: undefined,
});

/* This context is used for the subscription form */
/* TODO: remove or set up a subscription form... */
ArmadaFormsContext.displayName = "Armada Forms";

export const ArmadaFormsProvider = ({ client, children }) => {
  return (
    <ArmadaFormsContext.Provider value={{ client }}>
      {children}
    </ArmadaFormsContext.Provider>
  );
};
