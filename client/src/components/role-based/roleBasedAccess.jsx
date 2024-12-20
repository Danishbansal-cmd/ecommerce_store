import React from 'react';

function RoleBasedAccess({allowedRoles, userRole, children}) {
    if(!allowedRoles.includes(userRole)){
        return null;
    }
  return (
    <>{children}</>
  );
};

export default RoleBasedAccess;