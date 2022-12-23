const mongoose = require('mongoose');

//const moment=require("moment");

//let postDate = moment().locale("sq").toDate();



const fakultetiSchema = new mongoose.Schema(
    {
      
      emertimi: {
        type: String,
        required: [true, 'Duhet emertimi'],
       
        trim: true,

      },
      
     
     
      
    },
    { timestamps: true },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );

  // fakultetiSchema.pre('update', function(next) {
  // this.slug = slugify(this.name, { lower: true });
   
  //   next();
  // });

  const Fakulteti = mongoose.model('Fakulteti', fakultetiSchema);

module.exports = Fakulteti;