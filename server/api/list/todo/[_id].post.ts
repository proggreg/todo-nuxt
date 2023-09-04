export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    if (!event.context.params || !event.context.params._id) {
      throw new Error('no id')
    }
    body.list_id = event.context.params._id
    return await new TodoSchema(body).save()
  } catch (e) {
    console.error(e)
    return e
  }
})
