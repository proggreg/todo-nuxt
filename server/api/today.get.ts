export default defineEventHandler(async () => {
  try {
    const date = new Date()
    console.log(date)
    const today = date.toLocaleString('en-GB')
    const startOfToday = new Date().setHours(0, 0, 0, 0)
    const endOfToday = new Date().setHours(23, 59, 59, 999)

    console.log(new Date(startOfToday), new Date(endOfToday))

    return await TodoSchema.find({ dueDate: { $gte: startOfToday, $lte: endOfToday } })
  } catch (error) {
    return []
  }
})
