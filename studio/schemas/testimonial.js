import { defineType, defineField } from 'sanity'

export default defineType({
  name:  'testimonial',
  title: 'Testimonial',
  type:  'document',

  fields: [
    defineField({
      name: 'quote', title: 'Quote',
      type: 'text', rows: 4,
      description: 'Include the surrounding quote marks.',
      validation: R => R.required(),
    }),
    defineField({
      name: 'author', title: 'Author / Role',
      type: 'string', description: 'e.g. "Marketing Director"',
      validation: R => R.required(),
    }),
    defineField({
      name: 'company', title: 'Company',
      type: 'string', description: 'e.g. "Fairmont Hotels & Resorts"',
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
    select: { title: 'author', subtitle: 'company' },
  },
})
