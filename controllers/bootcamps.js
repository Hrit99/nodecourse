const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

//@desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
  try {
      const bootcamps = await Bootcamp.find();

      res.status(200).json({
          success: true,
          count: bootcamps.length,
          data: bootcamps
      })
  } catch (error) {
    next(error);
  }
}

//@desc get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
   try {
       const bootcamp = await Bootcamp.findById(req.params.id);

       if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
       }

       res.status(200).json({
           success: true,
           data: bootcamp
       });
   } catch (error) {
    // res.status(400).json({
    //     success: false,
    //     data: error.message
    // });
    next(error);
   }
}

//@desc create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
    
        res.status(201).json({
            success:true,
            data: bootcamp
        });
    } catch (error) {
        next(error);
    }
}

//@desc update single bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
           }
        res.status(200).json({
            success: true,
            data: bootcamp
        })
        
    } catch (error) {
        next(error);
    }
}

//@desc delete single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
           }
        res.status(200).json({
            success: true,
            data: {}
        })
        
    } catch (error) {
        next(error);
    }
}
