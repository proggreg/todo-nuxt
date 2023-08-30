export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    if (!event.context.params || !event.context.params._id) {
      throw new Error('no id')
    }
    await new TodoSchema(body).save()
    return await TodoSchema.find({ list_id: event.context.params._id })
  } catch (e) {
    console.error(e)
    return e
  }
})
