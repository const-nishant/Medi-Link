function checkIsDoctor(req, res, next) {
  try {
    if (req.userRole !== "doctor") {
      return res.status(403).json({
        success: false,
        message: "Only doctors can access this route",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default checkIsDoctor;
