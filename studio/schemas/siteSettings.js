import { defineType, defineField } from 'sanity'

export default defineType({
  name:  'siteSettings',
  title: 'Site Settings',
  type:  'document',

  // Prevent more than one settings document
  __experimental_actions: ['update', 'publish'],

  fields: [
    defineField({
      name: 'heroHeadline', title: 'Hero Headline',
      type: 'string',
      description: 'Wrap a word in *asterisks* to italicise it. e.g. "I film the world the way it *feels*"',
      validation: R => R.required(),
    }),
    defineField({
      name: 'heroSub', title: 'Hero Subheadline',
      type: 'text', rows: 3,
    }),
    defineField({
      name: 'heroCaption', title: 'Hero Caption (bottom-left)',
      type: 'string',
      description: 'e.g. "Osaka, Japan · 2025"',
    }),
    defineField({
      name: 'clients', title: 'Client / Trust Strip',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Names that scroll in the marquee under the hero.',
    }),
    defineField({
      name: 'aboutHeadline', title: 'About — Headline',
      type: 'string',
    }),
    defineField({
      name: 'aboutBody', title: 'About — Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'aboutImage', title: 'About — Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
    }),
    defineField({
      name: 'aboutStats', title: 'About — Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Number', type: 'string', description: 'e.g. "200K"' }),
          defineField({ name: 'label',  title: 'Label',  type: 'string', description: 'e.g. "Instagram followers"' }),
        ],
        preview: { select: { title: 'number', subtitle: 'label' } },
      }],
    }),
    defineField({
      name: 'aboutBrands', title: 'About — Brand tags',
      type: 'array', of: [{ type: 'string' }],
    }),
    defineField({
      name: 'contactAvailability', title: 'Contact — Availability note',
      type: 'string',
      description: 'e.g. "Available for projects from June 2025 onwards."',
    }),
    defineField({
      name: 'contactEmail', title: 'Contact — Email address',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl', title: 'Instagram URL', type: 'url',
    }),
    defineField({
      name: 'youtubeUrl', title: 'YouTube URL', type: 'url',
    }),
  ],

  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
