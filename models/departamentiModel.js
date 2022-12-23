const mongoose = require('mongoose');

//const moment=require("moment");

//let postDate = moment().locale("sq").toDate();



const departamentiSchema = new mongoose.Schema(
    {
      
      emertimi: {
        type: String,
        required: [true, 'Duhet emertimi'],
       
        trim: true,

      },

      
      fakulteti:{
        type:mongoose.Schema.ObjectId,
        ref: 'Fakulteti',
        required: [true, "Duhet te perkasin nje fakulteti"]

       }
     
     
      
    },
    { timestamps: true },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );

  departamentiSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'fakulteti',
      select: '-__v -updatedAt'
    });
  
    next();
  });

  // fakultetiSchema.pre('update', function(next) {
  // this.slug = slugify(this.name, { lower: true });
   
  //   next();
  // });

  const Departamenti = mongoose.model('Departamenti', departamentiSchema);

module.exports = Departamenti;