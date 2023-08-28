export default defineEventHandler(async (event) => {
  try {
    return await TodoSchema.find()
  } catch (error) {
    return error
  }
})
