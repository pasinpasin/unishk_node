const mongoose = require('mongoose');

const programiSchema = new mongoose.Schema(
    {
      emertimi: {
        type: String,
        required: [true, 'Duhet emertimi'],
       
        trim: true,

      },

    
    
     
      fakulteti:{
        type:mongoose.Schema.ObjectId,
        ref: 'Fakulteti',
        required: [true, "Duhe te perkasin nje fakulteti"]

       }
       ,departamenti:{
        type:mongoose.Schema.ObjectId,
        ref: 'Departamenti',
        required: [true, "Duhe te perkasin nje departamenti"]

       }
     
     
      
     
    },
    
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );

  const Programi = mongoose.model('Programi', programiSchema);

module.exports = Programi;