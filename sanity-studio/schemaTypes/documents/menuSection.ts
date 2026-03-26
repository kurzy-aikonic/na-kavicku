import {defineField, defineType} from 'sanity'

export const menuSectionType = defineType({
  name: 'menuSection',
  title: 'Menu sekce',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název sekce',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      description: 'Nižší číslo = výše v menu',
      validation: (rule) => rule.required().integer().min(1).max(999),
    }),
    defineField({
      name: 'items',
      title: 'Položky',
      type: 'array',
      of: [{type: 'menuItem'}],
      validation: (rule) => rule.required().min(1).max(120),
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivní sekce',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Pořadí (vzestupně)',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'order'},
    prepare(selection) {
      return {
        title: selection.title || 'Bez názvu',
        subtitle: `Pořadí: ${selection.subtitle ?? '-'}`,
      }
    },
  },
})
