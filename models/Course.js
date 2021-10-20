const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
        title: {
          type: String,
          required: [true, "Please enter a title for the course"],
          unique: true,
          trim: true,
          maxlength: [100, "name can not be more than 100 characters"],
        },
        description: {
          type: String,
          required: [true, "Please enter a description for the course"],
          maxlength: [1000, "name can not be more than 1000 characters"],
        },
        weeks: {
          type: Number,
          required: [true, "Please enter a duration(in weeks) for the course"],
          min: [1, "Duration can not be less than one week"]
        },
        tuition: {
          type: Number,
          required: [true, "Please enter a tuition for the course"]
        },
        minimumSkill: {
          type: String,
          enum: [
            'beginner',
            'intermediate',
            'advanced'
          ]
        },
        scholarhipsAvailable: {
          type: Boolean,
          default: false
        },
        createdAt: {
          type: Date,
          default: Date.now()
        },
        bootcamp: { type: mongoose.Schema.ObjectId, ref: 'Bootcamp', required: true },
});

//static method to get avg course tuitions
CourseSchema.statics.getAverageCost = async function(bootcampId) {

  const obj = await this.aggregate([
    {
      $match: {
        bootcamp: bootcampId
      }
    },
      {
        $group: {
          _id: '$bootcamp',
          averageCost: { $avg: '$tuition'}
        }
      }
  ]);
  
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10
    })
  } catch (error) {
    console.error(error.message);
  }
}

// call getAverageCost after save
CourseSchema.post('save', function() {
  this.constructor.getAverageCost(this.bootcamp);
});

// call getAverageCost after save
CourseSchema.pre('remove', function() {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);