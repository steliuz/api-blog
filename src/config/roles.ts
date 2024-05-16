const allRoles = {
  user: [],
  lector: ['read'],
  creador: ['create', 'read', 'update'],
  admin: ['create', 'read', 'update', 'getUsers', 'manageUsers', 'delete'],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
