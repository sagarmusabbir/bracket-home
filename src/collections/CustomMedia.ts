import type { CollectionConfig } from 'payload'

export const CustomMedia: CollectionConfig = {
  slug: 'custom-media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'filename',
      type: 'text',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'mimeType',
      type: 'text',
      required: true,
    },
    {
      name: 'filesize',
      type: 'number',
      required: true,
    },
    {
      name: 'width',
      type: 'number',
      required: false,
    },
    {
      name: 'height',
      type: 'number',
      required: false,
    },
    {
      name: 'isVideo',
      type: 'checkbox',
      required: false,
      defaultValue: false,
    },
  ],
  // No upload feature, we'll handle files manually
}