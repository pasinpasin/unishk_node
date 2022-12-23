const mongoose = require('mongoose');

//const moment=require("moment");

//let postDate = moment().locale("sq").toDate();



const planetmesimoreSchema = new mongoose.Schema(
    {
      
      vitiakademik: {
        type: String,
        required: [true, 'Duhet viti'],
       
        trim: true,

      },

      cikli: {
        type: String,
        required: [true, 'Duhet cikli'],
       
        trim: true,

      },

      statusi: {
        type: String,
        default: "Draft",
        required: [true, 'Statusi eshte i detyruar'],
        enum: {
          values: ['Draft', 'Per miratim', 'Miratuar'],
          message: 'Statusi duhet: Draft ose Per miratim ose Miratuar'
        }
      },


      
         fakulteti:{
        type:mongoose.Schema.ObjectId,
        ref: 'Fakulteti',
        required: [true, "Duhe te perkasin nje fakulteti"],
       // select: false

       },
       
       departamenti:{
        type:mongoose.Schema.ObjectId,
        ref: 'Departamenti',
        required: [true, "Duhe te perkasin nje departamenti"],
        //select: false

       },
       programi:{
        type:mongoose.Schema.ObjectId,
        ref: 'Programi',
        required: [true, "Duhe te perkasin nje programi"],
       // select: false

       }
     
     
      
    },
    { timestamps: true },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );


  planetmesimoreSchema.pre(/^find/, function(next) {
  

   /*  this.populate([{
        path:'programi', select: '-__v -fakulteti  ' ,
        populate : {path:'fakulteti' ,select: '-__v -departamenti '},
        populate : {path:'departamenti' , select: '-__v -createdAt -updatedAt'}
        
        
    }]) */
    this.populate({
        path: 'programi',
        select: 'emertimi'
     }).populate({
      path: 'fakulteti',
        select: 'emertimi'
      }).populate({
       path: 'departamenti',
         select: 'emertimi -fakulteti'
       })
      
   ;
   
    
   

  
    next();
  });
  

  const Planetmesimore = mongoose.model( 'Planetmesimore', planetmesimoreSchema);

module.exports = Planetmesimore;