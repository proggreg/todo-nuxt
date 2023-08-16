export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await new TodoSchema(body).save()
  } catch (error) {
    console.error('here', error)
    return error
  }
})
