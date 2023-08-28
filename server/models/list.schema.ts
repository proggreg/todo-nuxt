import { defineMongooseModel } from '#nuxt/mongoose'

export const ListSchema = defineMongooseModel({
  name: 'List',
  schema: {
    name: {
      type: 'string'
    },
    descriptions: {
      type: 'string'
    },
    todos: {
      type: 'array'
    }
  }
})
