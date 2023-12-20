const canIDeleteReview = (req, userId) => {
  return (
    req.user.role === "admin" ||
    req.user.userId === userId.toString()
  )
}

module.exports = canIDeleteReview
