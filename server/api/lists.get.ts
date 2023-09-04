export default defineEventHandler(async () => {
  try {
    return await ListSchema.find()
  } catch (error) {
    return error
  }
})
