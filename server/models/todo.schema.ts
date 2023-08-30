import { defineMongooseModel } from '#nuxt/mongoose'

export const TodoSchema = defineMongooseModel({
  name: 'Todo',
  schema: {
    name: {
      type: 'string',
      required: true
    },
    done: {
      type: 'boolean',
      required: true
    },
    list_id: {
      type: 'string'
    }
  }
})
