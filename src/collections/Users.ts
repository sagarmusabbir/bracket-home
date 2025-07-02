import type { CollectionConfig } from 'payload'

// Define our custom user type with the role and name fields
type UserWithRole = {
  role?: 'admin' | 'user'
  name?: string
}

import { afterLogin } from '../hooks/afterLogin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterLogin,
  },
  auth: true,
  access: {
    // Define access control functions here
    create: ({ req }) => {
      // Only allow admins to create new users
      return (req.user as UserWithRole)?.role === 'admin';
    },
    read: ({ req: { user } }) => {
      // Allow admins to read all users, and users to read their own profile
      if ((user as UserWithRole)?.role === 'admin') {
        return true;
      }
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    update: ({ req: { user } }) => {
      // Allow admins to update any user, and users to update their own profile
      if ((user as UserWithRole)?.role === 'admin') {
        return true;
      }
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    delete: ({ req }) => {
      // Only allow admins to delete users
      return (req.user as UserWithRole)?.role === 'admin';
    },
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
      label: 'Name',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
      // Only admins can change roles
      access: {
        update: ({ req }) => (req.user as UserWithRole)?.role === 'admin',
      },
    },
  ],
}