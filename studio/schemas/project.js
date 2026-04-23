import { defineType, defineField } from 'sanity'

export default defineType({
  name:  'project',
  title: 'Project',
  type:  'document',

  fields: [
    defineField({
      name: 'title', title: 'Title',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'slug', title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: R => R.required(),
    }),
    defineField({
      name: 'order', title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first. Wide cards should be 1st and 4th.',
    }),
    defineField({
      name: 'wide', title: 'Full-width card?',
      type: 'boolean',
      initialValue: false,
      description: 'Spans the full grid row instead of half.',
    }),
    defineField({
      name: 'location', title: 'Location',
      type: 'string', description: 'e.g. "Maasai Mara, Kenya"',
    }),
    defineField({
      name: 'year', title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'projectType', title: 'Type label',
      type: 'string', description: 'e.g. "Short Film", "Hospitality Film"',
    }),
    defineField({
      name: 'client', title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'types', title: 'Filter types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Film',         value: 'film' },
          { title: 'Photography',  value: 'photography' },
          { title: 'Hospitality',  value: 'hospitality' },
          { title: 'Personal',     value: 'personal' },
        ],
        layout: 'tags',
      },
      description: 'Controls which filter tab shows this project.',
    }),
    defineField({
      name: 'description', title: 'Short description (card)',
      type: 'text', rows: 2,
      description: 'Shown on the work grid card.',
    }),
    defineField({
      name: 'coverImage', title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      validation: R => R.required(),
    }),
    defineField({
      name: 'lead', title: 'Lead paragraph (case study)',
      type: 'text', rows: 3,
    }),
    defineField({
      name: 'challenge', title: 'The Story',
      type: 'array', of: [{ type: 'block' }],
    }),
    defineField({
      name: 'approach', title: 'How it Was Made',
      type: 'array', of: [{ type: 'block' }],
    }),
    defineField({
      name: 'outcome', title: 'The Result',
      type: 'array', of: [{ type: 'block' }],
    }),
    defineField({
      name: 'gallery', title: 'Gallery images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
      }],
      description: 'First two appear side-by-side; third appears full-width.',
      validation: R => R.max(3),
    }),
  ],

  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'title', subtitle: 'location', media: 'coverImage' },
  },
})
