export default defineEventHandler(async () => {
  try {
    const startOfToday = new Date().setHours(0, 0, 0, 0)
    const endOfToday = new Date().setHours(23, 59, 59, 999)

    return await TodoSchema.find({ dueDate: { $gte: startOfToday, $lte: endOfToday } })
  } catch (error) {
    return error
  }
})
