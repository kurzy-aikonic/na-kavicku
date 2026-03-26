import {defineField, defineType} from 'sanity'

export const announcementType = defineType({
  name: 'announcement',
  title: 'Aktualita / Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulek',
      type: 'string',
      validation: (rule) => rule.required().min(4).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Krátký text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(10).max(220),
    }),
    defineField({
      name: 'bannerImageUrl',
      title: 'URL banner obrázku',
      type: 'url',
      description:
        'Doporučeno pro minimální spotřebu Sanity úložiště. Použij externí CDN/hostované WebP.',
      validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'bannerImageAlt',
      title: 'Alt text banneru',
      type: 'string',
      validation: (rule) => rule.max(140),
      hidden: ({document}) => !document?.bannerImageUrl,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publikováno',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivní',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Nejnovější',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
    },
  },
})
