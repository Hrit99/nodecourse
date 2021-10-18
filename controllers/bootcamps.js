const Bootcamp = require('../models/Bootcamp');

//@desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
  try {
      const bootcamps = await Bootcamp.find();

      res.status(200).json({
          success: true,
          data: bootcamps
      })
  } catch (error) {
      res.status(400).json({
          success: false,
          data: error.message
      })
  }
}

//@desc get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
   try {
       const bootcamp = await Bootcamp.findById(req.params.id);

       if(!bootcamp) {
        return res.status(400).json({
            success: false,
            data: "Document not found"
        });
       }

       res.status(200).json({
           success: true,
           data: bootcamp
       });
   } catch (error) {
    res.status(400).json({
        success: false,
        data: error.message
    });
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
        res.status(400).json({
            success: false,
            data: error.message
        });
    }
}

//@desc update single bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if(!bootcamp) {
       return res.status(400).json({
            success: false,
            data: "Document not found"
        });
       }
    res.status(200).json({
        success: true,
        data: bootcamp
    })
}

//@desc delete single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`
    });
}
