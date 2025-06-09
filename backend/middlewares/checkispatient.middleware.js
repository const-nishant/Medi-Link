function checkIsPatient(req, res, next) {
 try {
   if (req.userRole !== "patient") {
     return res.status(403).json({
       success: false,
       message: "Only patients can access this route",
     });
   }
   next();
 } catch (error) {
    next(error);
 }
}

export default checkIsPatient;