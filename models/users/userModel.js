const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        emri: {
            type: String,
            required: [true, 'Duhet emri'],
           
            trim: true,
    
          },
          mbiemri: {
            type: String,
            required: [true, 'Duhet mbiemri'],
           
            trim: true,
    
          },
          atesia: {
            type: String,
            required: [true, 'Duhet atesia'],
           
            trim: true,
    
          },
          titulli: {
            type: String,
            required: [true, 'Duhet titulli'],
           
            trim: true,
    
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
            required: [true, "Duhe te perkasin nje departamenti"]
        }
    },
    { timestamps: true },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }



       
    );
    userSchema.set('toObject', { virtuals: true });
    userSchema.set('toJSON', { virtuals: true });
    
  
    const User = mongoose.model( 'User', userSchema);
  
  module.exports = User;