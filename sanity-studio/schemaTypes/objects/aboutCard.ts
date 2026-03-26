import {defineField, defineType} from 'sanity'

export const aboutCardType = defineType({
  name: 'aboutCard',
  title: 'Karta "O kavárně"',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Nadpis',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(80),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(12).max(260),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'text'},
    prepare(selection) {
      const subtitle = selection.subtitle
        ? selection.subtitle.slice(0, 80)
        : 'Bez textu'
      return {
        title: selection.title || 'Bez názvu',
        subtitle,
      }
    },
  },
})
