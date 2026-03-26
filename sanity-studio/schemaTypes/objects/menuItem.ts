import {defineField, defineType} from 'sanity'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Položka menu',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Název',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: 'price',
      title: 'Cena',
      type: 'string',
      description: 'Např. 79 Kč nebo 59 / 69 Kč',
      validation: (rule) => rule.required().min(2).max(30),
    }),
    defineField({
      name: 'description',
      title: 'Popis (volitelné)',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivní položka',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'price'},
  },
})
