import { IUser } from '@models';

export const filterUser = (user: IUser) => {
  return {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    active: user.active,
    created: user.created,
    updated: user.updated,
  };
};

export const filterUnauthenticatedUser = (user: IUser) => {
  return {
    id: user._id,
    firstName: user.firstName,
    active: user.active,
    created: user.created,
    updated: user.updated,
  };
};
