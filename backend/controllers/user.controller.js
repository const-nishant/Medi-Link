import User from "../models/user.model";

export const getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export const  updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { profile: req.body } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const getDoctor = async (req, res,next) => {
 try {
   const doctorId = req.params.id;
  const doctor = await User.findOne({ _id: doctorId, role: "doctor" });
  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: "Doctor not found",
    });
  }
  res.status(200).json({
    success: true,
    data: doctor,
  });
 } catch (error) {
  next(error);
 }
}


export const getDoctors= async (req, res, next) => {
    try {
      const doctors = await User.find({ role: "doctor" });

      if (!doctors) {
        return res.status(404).json({
          success: false,
          message: "Doctors not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Doctors fetched successfully",
        data: doctors,
      });
    } catch (error) {
      next(error);
    }
  }