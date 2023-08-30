import { defineMongooseModel } from '#nuxt/mongoose'

export const ListSchema = defineMongooseModel({
  name: 'List',
  schema: {
    name: {
      type: 'string',
      required: true
    },
    descriptions: {
      type: 'string'
    },
    todos: {
      type: 'array'
    }
  }
})
