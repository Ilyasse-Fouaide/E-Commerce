const canIUpdateReview = (request, response) => {
  return (
    request.user.role === "admin" ||
    request.user.userId === response.toString()
  )
}

module.exports = canIUpdateReview;
