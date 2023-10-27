import { Fragment, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RoleEnum } from "../../../models/Enums";
import useCurrentUserRole from "../../../hooks/UseCurrentUserRole";
import useCurrentUserIdentifier from "../../../hooks/UseCurrentUserIdentifier";

export function PrivateRoute({
  children,
  roles,
}: {
  children: ReactNode;
  roles: Array<RoleEnum>;
}) {
  const userId = useCurrentUserIdentifier();
  const userRole = useCurrentUserRole();
  const canAccess = userId > 0 && roles.includes(userRole);

  if (canAccess) {
    return <Fragment>{children}</Fragment>;
  }

  return <Navigate to="/"></Navigate>;
}
