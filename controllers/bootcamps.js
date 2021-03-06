const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

//@desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
   
      res.status(200).json(res.advancedResults);
}
);

//@desc get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
       const bootcamp = await Bootcamp.findById(req.params.id);

       if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
       }

       res.status(200).json({
           success: true,
           data: bootcamp
       });
}
);

//@desc create new bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body);
    
        res.status(201).json({
            success:true,
            data: bootcamp
        });
}
);

//@desc update single bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
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
}
);
//@desc delete single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
           }

           bootcamp.remove();
        res.status(200).json({
            success: true,
            data: {}
        })
}
);

//@desc get bootcamps within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
   const {zipcode, distance} = req.params;

   //get latitude and longitude from geocoder
   const loc = await geocoder.geocode(zipcode);
   const lat = loc[0].latitude;
   const lng = loc[0].longitude;

   //calc radius using radians
   // divide distance by radius of earth
   // earth radius = 3963 miles
   const radius = distance / 3963;
   const bootcamps = await Bootcamp.find({
       location: {
           $geoWithin: {
               $centerSphere: [[lng, lat], radius]
           }
       }
   });

   res.status(200).json({
       success: true,
       count: bootcamps.length,
       data: bootcamps
   });
}
);

