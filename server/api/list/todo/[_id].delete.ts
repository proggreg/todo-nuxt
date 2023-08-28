export default defineEventHandler(async (event) => {
  console.log('this one ', event.context)
  const body = await readBody(event)

  try {
    if (!event.context.params || !event.context.params._id) {
      throw new Error('no id')
    }
    await ListSchema.findOneAndUpdate({
      _id: event.context.params._id
    }, {
      $pull: {
        todos: {
          name: body.name
        }
      }
    })
    return await ListSchema.findOne({
      _id: event.context.params._id
    })
  } catch (e) {
    console.error('delete todo', e)
    return e
  }
})
