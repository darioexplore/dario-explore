import { defineType, defineField } from 'sanity'

export default defineType({
  name:  'service',
  title: 'Service',
  type:  'document',

  fields: [
    defineField({
      name: 'number', title: 'Number',
      type: 'string', description: 'e.g. "01"',
      validation: R => R.required(),
    }),
    defineField({
      name: 'title', title: 'Title',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'description', title: 'Description',
      type: 'text', rows: 3,
    }),
    defineField({
      name: 'tags', title: 'Tags',
      type: 'array', of: [{ type: 'string' }],
      description: 'Short labels shown on the right of the row.',
    }),
    defineField({
      name: 'order', title: 'Display order',
      type: 'number',
    }),
  ],

  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'title', subtitle: 'number' },
  },
})
