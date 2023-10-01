export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    if (!event.context.params || !event.context.params._id) {
      throw new Error('no id')
    }
    return await TodoSchema.updateOne({
      _id: event.context.params._id
    }, body)
  } catch (e) {
    console.error(e)
    return e
  }
})
