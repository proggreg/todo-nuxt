export default defineEventHandler(async (event) => {
  try {
    console.log(event.context)
    return await TodoSchema.findOneAndDelete({ _id: event.context.params?._id })
  } catch (e) {
    console.error('delete todo', e)
    return e
  }
})
