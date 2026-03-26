import {defineField, defineType} from 'sanity'

export const reviewItemType = defineType({
  name: 'reviewItem',
  title: 'Recenze',
  type: 'object',
  fields: [
    defineField({
      name: 'rating',
      title: 'Hodnocení',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'text',
      title: 'Text recenze',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(12).max(300),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(60),
    }),
    defineField({
      name: 'source',
      title: 'Zdroj',
      type: 'string',
      initialValue: 'Google recenze',
      validation: (rule) => rule.required().min(2).max(50),
    }),
  ],
  preview: {
    select: {title: 'author', subtitle: 'text', rating: 'rating'},
    prepare(selection) {
      const stars = '★'.repeat(Math.max(1, Math.min(5, Number(selection.rating) || 5)))
      return {
        title: `${selection.title || 'Autor'} (${stars})`,
        subtitle: selection.subtitle
          ? selection.subtitle.slice(0, 80)
          : 'Bez textu',
      }
    },
  },
})
