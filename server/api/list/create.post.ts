export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    console.log('create list ', body)
    return await new ListSchema(body).save()
  } catch (error) {
    console.error('here', error)
    return error
  }
})
