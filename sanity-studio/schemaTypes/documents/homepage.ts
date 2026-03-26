import {defineField, defineType} from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero: hlavní text',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(80),
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Hero: zvýrazněný text',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(40),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero: podtext',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(10).max(220),
    }),
    defineField({
      name: 'aboutEyebrow',
      title: 'O kavárně: malý nadpis',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(80),
    }),
    defineField({
      name: 'aboutHeading',
      title: 'O kavárně: hlavní nadpis',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(100),
    }),
    defineField({
      name: 'aboutCards',
      title: 'O kavárně: karty',
      type: 'array',
      of: [{type: 'aboutCard'}],
      validation: (rule) => rule.required().min(3).max(3),
    }),
    defineField({
      name: 'reviewsEyebrow',
      title: 'Recenze: malý nadpis',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(80),
    }),
    defineField({
      name: 'reviewsHeading',
      title: 'Recenze: hlavní nadpis',
      type: 'string',
      validation: (rule) => rule.required().min(4).max(100),
    }),
    defineField({
      name: 'reviewsIntro',
      title: 'Recenze: intro text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(10).max(220),
    }),
    defineField({
      name: 'reviews',
      title: 'Recenze: položky',
      type: 'array',
      of: [{type: 'reviewItem'}],
      validation: (rule) => rule.required().min(3).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'aboutHeading',
    },
  },
})
