import { defineType, defineField } from 'sanity'

export default defineType({
  name:  'journalPost',
  title: 'Journal Post',
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
      name: 'date', title: 'Published date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
    }),
    defineField({
      name: 'category', title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Filmmaking',        value: 'Filmmaking' },
          { title: 'Travel',            value: 'Travel' },
          { title: 'Behind the scenes', value: 'Behind the scenes' },
          { title: 'Gear',              value: 'Gear' },
          { title: 'Personal',          value: 'Personal' },
        ],
      },
    }),
    defineField({
      name: 'excerpt', title: 'Excerpt',
      type: 'text', rows: 2,
      description: 'One or two lines shown on the card.',
    }),
    defineField({
      name: 'coverImage', title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      validation: R => R.required(),
    }),
    defineField({
      name: 'body', title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
            defineField({ name: 'alt',     type: 'string', title: 'Alt text' }),
          ],
        },
      ],
    }),
  ],

  orderings: [
    { title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],

  preview: {
    select: { title: 'title', subtitle: 'date', media: 'coverImage' },
  },
})
