const mongoose = require('mongoose');



const ngarkesaSchema = new mongoose.Schema(
    {
        vitiakademik: {
            type: String,
            required: [true, 'Duhet emri'],
           
            trim: true,
    
          },
          norma: {
            type: Number,
            required: [true, 'Duhet mbiemri'],
           
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
    
          }
           
        
    },
    { timestamps: true },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }



       
    );
    
    ngarkesaSchema.virtual('ngarkesepermbajtja', {
      
      ref: 'Ngarkesepermbajtja', //The Model to use
      localField: '_id', //Find in Model, where localField 
      foreignField: 'ngarkesa' // is equal to foreignField

   }
   );

 
  


   ngarkesaSchema.set('toObject', { virtuals: true });
ngarkesaSchema.set('toJSON', { virtuals: true });


   /*   ngarkesaSchema.pre(/^find/, function(next) {
  

      this.populate([{
           path:'programi', select: '-__v -fakulteti  ' ,
           populate : {path:'fakulteti' ,select: '-__v -departamenti '},
           populate : {path:'departamenti' , select: '-__v -createdAt -updatedAt'}
           
           
       }]) 
       /* this.populate(
          {
           path: 'pedagogu',
           select: 'emri mbiemri titulli ',
           
           populate: {path: 'departamenti', select:'emertimi'}
          }

         

           ) 

           this.populate
           (
              {path: 'pedagogu',select: '-__v',
             populate: [
                  { path: 'fakulteti', select: 'emertimi' },
                  { path: 'departamenti', select: 'emertimi -fakulteti' }
                ]

               

        // populate :{path: 'fakulteti', select: 'emertimi'}
        
         
      }

      ); 
      
       
      
   
     
       next();
     });
  
    /*  ngarkesaSchema.post(/^find/, function(docs, next) {
     ngarkesepermbajtja2.aggregate([
      {"$lookup":{
        "from":"ngarkesepermbajtja", // name of the foreign collection
        "localField":"ngarkesa",
        "foreignField":"_id",
        "as":"lookup-data"
      }},
      {"$addFields":{
        "score":{
          "$sum":"$lookup-data"
        }
      }},
      {$project:{"lookup-data":0}}
    ]).exec((err,data) =>
    { 
      console.log(data);
    });
    next();
  }); */
      
    

   

  
    const Ngarkesa = mongoose.model( 'Ngarkesa', ngarkesaSchema);
  
  module.exports = Ngarkesa;