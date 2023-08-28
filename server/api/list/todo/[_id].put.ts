export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    if (!event.context.params || !event.context.params._id) {
      throw new Error('no id')
    }
    await ListSchema.findOneAndUpdate({
      _id: event.context.params._id
    }, {
      $set: {
        todos: {
          name: body.name,
          done: false
        }
      }
    })
    return await ListSchema.findOne({
      _id: event.context.params._id
    })
  } catch (e) {
    console.error(e)
    return e
  }
})
