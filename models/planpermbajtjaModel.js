const mongoose = require('mongoose');

const planpermbajtjaSchema = new mongoose.Schema(
    {
        
              

             nr: {type:Number},
             viti: {type:String, required:true },
             
              emertimilendes: {type:String },
              titullari: {type:String },
              tipiveprimtarise: {type:String },
              kredite:{type:Number },
              semestri: [{
                
                sem:{type:String },
                ngarkesajavore:{type:Number  },
                numrijaveve:{type:Number, default:0 },
                leksione:{type:Number, default:0 },
                seminare:{type:Number, default:0 },
                laboratore:{type:Number , default:0},
                praktika:{type:Number, default:0 },
                provimapofirme:{type:String }
                         
            }],
            lendemezgjedhje: [{
                
              emertimi:{type:String }
              
                       
          }],


                   
        
    
     
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
       ,programi:{
        type:mongoose.Schema.ObjectId,
        ref: 'Programi',
        required: [true, "Duhe te kete program"]

       }
       ,planetmesimore:{
        type:mongoose.Schema.ObjectId,
        ref: 'Planetmesimore',
        required: [true, "Duhe te kete plan mesimor"]

       }
     
     
      
     
    },
    
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );
  planpermbajtjaSchema.virtual('totLeksione').get(function() {
    return this.semestri[0].numrijaveve * this.semestri[0].leksione + this.semestri[1].numrijaveve * this.semestri[1].leksione ;
  });
  planpermbajtjaSchema.virtual('totSeminare').get(function() {
    return this.semestri[0].numrijaveve * this.semestri[0].seminare + this.semestri[1].numrijaveve * this.semestri[1].seminare ;
  });
  planpermbajtjaSchema.virtual('totLaboratore').get(function() {
    return this.semestri[0].numrijaveve * this.semestri[0].laboratore + this.semestri[1].numrijaveve * this.semestri[1].laboratore ;
  });
  planpermbajtjaSchema.virtual('totPraktika').get(function() {
    return this.semestri[0].numrijaveve * this.semestri[0].praktika + this.semestri[1].numrijaveve * this.semestri[1].praktika ;
  });

  planpermbajtjaSchema.pre(/^find/, function(next) {
  

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
        }).populate({
          path: 'planetmesimore',
            select: 'vitiakademik cikli -fakulteti -departamenti -programi'
          })
       
    ;
    
     
    
 
   
     next();
   });

  const Planpermbajtja = mongoose.model('Planpermbajtja', planpermbajtjaSchema);

module.exports = Planpermbajtja;