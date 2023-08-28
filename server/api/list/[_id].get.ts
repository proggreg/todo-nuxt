export default defineEventHandler(async (event) => {
  console.log(event)
  try {
    return await ListSchema.find({
      _id: '64ecbc90173a2c9e50ffc717'
    })
  } catch (error) {
    return error
  }
})
