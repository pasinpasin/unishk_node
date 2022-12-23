const mongoose = require('mongoose');
const ngarkesepermbajtjaSchema = new mongoose.Schema(
    {
       
         

          lendet: [{
                
            emertimi:{type:String },
            dega:{type:String },
            niveli:{type:String },
            titullari:{type:String  },
            leksione:{type:Number, default:0 },
            seminare:{type:Number, default:0 },
            grupseminare:{type:Number, default:0 },
            laboratore:{type:Number , default:0},
            gruplaboratore:{type:Number , default:0},
            praktika:{type:Number, default:0 },
            koef:{type:Number, default:1 },
            shuma: {
              type: Number,
              default: function() {
                return this.leksione + this.seminare * this.grupseminare + this.laboratore * this.gruplaboratore + this.praktika * this.koef;
              } } 
           
            
         
                     
        }],
        diploma1: {type:Number, default:0  },
        diploma2: {type:Number, default:0  },
        diploma3: {type:Number, default:0  },
        udhehqjedoktorate: {type:Number , default:0 },
        tezedoktorate: {type:Number, default:0  },
        juridoktorate: {type:Number, default:0  },


          
          ngarkesa:{
            type:mongoose.Schema.ObjectId,
            ref: 'Ngarkesa',
            required: [true, "Duhe te kete ngarkese"],
           // select: false
    
           }
           
        
    },
    { timestamps: true },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }



       
    );

  

    
    


    ngarkesepermbajtjaSchema.set('toObject', { virtuals: true });
    ngarkesepermbajtjaSchema.set('toJSON', { virtuals: true });
    ngarkesepermbajtjaSchema.pre(/^find/, function(next) {
  

      /*  this.populate([{
           path:'programi', select: '-__v -fakulteti  ' ,
           populate : {path:'fakulteti' ,select: '-__v -departamenti '},
           populate : {path:'departamenti' , select: '-__v -createdAt -updatedAt'}
           
           
       }]) 
       this.populate({
           path: 'ngarkesa',
         })
         
      ;
      
       */
      
   
     
       next();
     });
 
     ngarkesepermbajtjaSchema.post(/^find/, function(docs, next) {
      console.log(`Query took ${Date.now() - this.start} milliseconds!`);
      next();
    });

   
  


    const Ngarkesepermbajtja = mongoose.model( 'Ngarkesepermbajtja', ngarkesepermbajtjaSchema);
  
    module.exports = Ngarkesepermbajtja;