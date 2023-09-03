export default defineEventHandler(async (event) => {
  try {
    return await ListSchema.findOneAndDelete({ _id: event.context.params?._id })
  } catch (e) {
    console.error('delete todo', e)
    return e
  }
})
