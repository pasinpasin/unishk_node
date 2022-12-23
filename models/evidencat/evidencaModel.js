const mongoose = require('mongoose');



const evidencaSchema = new mongoose.Schema(
    {
        vitiakademik: {
            type: String,
            required: [true, 'Duhet emri'],
           
            trim: true,
    
          },
         
          emerpedagogu: {
            type: String,
            required: [true, 'Duhet emri'],
           
            trim: true
    
          },
          mbiemerpedagogu: {
            type: String,
            required: [true, 'Duhet mbiemri'],
           
            trim: true
    
          },
          titullpedagogu: {
            type: String,
            required: [true, 'Duhet titulli'],
           
            trim: true
    
          },


          
          departamenti: {
            type: String,
            required: [true, 'Duhet dep'],
           
            trim: true
    
          },
          fakulteti: {
            type: String,
            required: [true, 'Duhet fakult'],
           
            trim: true
    
          },
          statusi: {
            type: String,
            default: "Draft",
            required: [true, 'Statusi eshte i detyruar'],
            enum: {
              values: ['Draft', 'Per miratim ne njesine baze', 'Miratuar ne njesine baze','Miratuar nga dekani'],
              message: 'Statusi duhet: Draft ose Per miratim ose Miratuar'
            }
          }
           
        
    },
    { timestamps: true },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }



       
    );
    
   

 
  


   evidencaSchema.set('toObject', { virtuals: true });
evidencaSchema.set('toJSON', { virtuals: true });


  
  

    

   

  
    const Evidenca = mongoose.model( 'Evidenca', evidencaSchema);
  
  module.exports = Evidenca;