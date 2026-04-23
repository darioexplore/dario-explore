import { defineConfig } from 'sanity'
import { deskTool }    from 'sanity/desk'
import { visionTool }  from '@sanity/vision'
import { schemaTypes } from './schemas/index.js'

export default defineConfig({
  name:      'dario-explore',
  title:     'Dario Explore',

  projectId: 's3n92mah',
  dataset:   'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.documentTypeListItem('project')    .title('Projects'),
            S.documentTypeListItem('service')    .title('Services'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('journalPost').title('Journal Posts'),
          ]),
    }),
    visionTool(),   // lets you test GROQ queries live inside the studio
  ],

  schema: { types: schemaTypes },
})
