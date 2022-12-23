const mongoose = require('mongoose');
const evidencepermbajtjaSchema = new mongoose.Schema(
    {

    
      fakulteti:{type:String },  
      departamenti:{type:String }, 
      programi:{type:String },
      vitiakademik:{type:String },
      lenda:{type:String },
    
      viti:{type:String },
      cikli:{type:String },
      semestri:{type:String },
         

          leksione: [{
                
            data:{type:Date },
            kursi:{type:String },
            studente:{type:Number },
            tema:{type:String },
            ore:{type:Number, default:0  },
             koef:{type:Number, default:1 },
            shuma: {
              type: Number,
              default: function() {
                return  this.ore * this.koef;
              } } 
           
            
         
                     
        }],
        seminare: [{
                
            data:{type:Date },
            kursi:{type:String },
            studente:{type:Number },
            tema:{type:String },
            ore:{type:Number, default:0  },
             koef:{type:Number, default:1 },
            shuma: {
              type: Number,
              default: function() {
                return  this.ore * this.koef;
              } } 
           
            
         
                     
        }],
        laboratore: [{
                
            data:{type:Date },
            kursi:{type:String },
            studente:{type:Number },
            tema:{type:String },
            ore:{type:Number, default:0  },
             koef:{type:Number, default:1 },
            shuma: {
              type: Number,
              default: function() {
                return  this.ore * this.koef;
              } } 
           
            
         
                     
        }],
        praktika: [{
                
            data:{type:Date },
            kursi:{type:String },
            studente:{type:Number },
            tema:{type:String },
            ore:{type:Number, default:0  },
             koef:{type:Number, default:1 },
            shuma: {
              type: Number,
              default: function() {
                return  this.ore * this.koef;
              } } 
           
            
         
                     
        }],
        diploma1: {type:Number, default:0  },
        diploma2: {type:Number, default:0  },
        diploma3: {type:Number, default:0  },
        udhehqjedoktorate: {type:Number , default:0 },
        tezedoktorate: {type:Number, default:0  },
        juridoktorate: {type:Number, default:0  },


          
          evidenca:{
            type:mongoose.Schema.ObjectId,
            ref: 'Evidenca',
            required: [true, "Duhe te kete formular"],
           // select: false
    
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

  

    
    


    evidencepermbajtjaSchema.set('toObject', { virtuals: true });
    evidencepermbajtjaSchema.set('toJSON', { virtuals: true });
    
 
     evidencepermbajtjaSchema.post(/^find/, function(docs, next) {
      console.log(`Query took ${Date.now() - this.start} milliseconds!`);
      next();
    });

   
  


    const Evidencepermbajtja = mongoose.model( 'Evidencepermbajtja', evidencepermbajtjaSchema);
  
    module.exports = Evidencepermbajtja;