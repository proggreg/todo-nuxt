export default defineEventHandler(async () => {
  try {
    return await TodoSchema.find({ })
  } catch (error) {
    return []
  }
})
