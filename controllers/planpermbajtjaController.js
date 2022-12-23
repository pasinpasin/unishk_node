const APIFeatures=require("../utils/APIFeatures");
const Planpermbajtja=require("../models/planpermbajtjaModel");
const path= require("path");



exports.checkBody = (req, res, next) => {
  if (!req.body.emertimi || !req.body.fakulteti || !req.body.departamenti) {
    return res.status(400).json({
      status: 'fail',
      message: 'Mungon emertimi i  Departamentit ose i fakultetit ose departamentit'
    });
  }
  next();
};
/*   exports.getAllPlanpermbajtja = async (req, res) => {
    try {
      // EXECUTE QUERY
      
      //const filter = { planpermbajtje: req.params.planetmesimore }
      const planpermbajta = await Planpermbajtja.find().select(req.params.planetmesimore);
      //.populate('fakulteti')
      ;
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: planpermbajta.length,
        data: {
          planpermbajta
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  }; */
  
  exports.getPlanpermbajtja = async (req, res) => {
    try {
      
      const planpermbajtja = await Planpermbajtja.findById(req.params.id);
      // Tour.findOne({ _id: req.params.id })
  
      res.status(200).json({
        status: 'success',
        data: {
          planpermbajtja
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };

  exports.getAllPlanpermbajtja= async (req, res) => {
    try {
     // query={req.params['planetmesimore']};
     // query={planetmesimore: "6346837dc54eb97b565da297"};
      const features= new APIFeatures(Planpermbajtja.find(),req.query).filter();
     // const planpermbajtja = await Planpermbajtja.find({planetmesimore: req.params.planetmesimore});
      // Tour.findOne({ _id: req.params.id })
      const planpermbajtja = await features.query;
      let totkredite=0;
      let totaliSeminare=0;

      planpermbajtja.forEach(element => {
        
        totkredite= totkredite+element.kredite;
        totaliSeminare+= element.totSeminare;
      });

     /*  const obj=
      {
        planpermbajtja,
        totkredite,
        totaliSeminare

      } */
      const obj= planpermbajtja.reduce(function (r, a) {
       // console.log('r', r);
       //console.log("a", a);
 
        r[a.viti] = r[a.viti] || [];
        r[a.viti].totKrediteVit = r[a.viti].totKrediteVit || 0 ;
        r[a.viti].totLeksioneSem1 = r[a.viti].totLeksioneSem1 || 0 ;
        r[a.viti].NgarkesaJavoreSem1 = r[a.viti].NgarkesaJavoreSem1 || 0 ;
        r[a.viti].NgarkesaJavoreSem2 = r[a.viti].NgarkesaJavoreSem2 || 0 ;

        if (a.tipiveprimtarise !="m")

        {
          
        r[a.viti].totKrediteVit = r[a.viti].totKrediteVit +a.kredite;
        r[a.viti].totLeksioneSem1 = r[a.viti].totLeksioneSem1 +a.semestri[0].leksione;
        
        r[a.viti].NgarkesaJavoreSem1 = r[a.viti].NgarkesaJavoreSem1 + a.semestri[0].leksione +  a.semestri[0].seminare + a.semestri[0].laboratore + a.semestri[0].praktika;
        r[a.viti].NgarkesaJavoreSem2 = r[a.viti].NgarkesaJavoreSem2 + a.semestri[1].leksione +  a.semestri[1].seminare + a.semestri[1].laboratore + a.semestri[1].praktika;
      }
        r[a.viti].push(a);
        
        // console.log("--------------------------");
        return r;
       
    }, {});

    const obj2= planpermbajtja.reduce(function (r, a) {
 

       r[a.tipiveprimtarise] = r[a.tipiveprimtarise] || [];
       
       r[a.tipiveprimtarise].totKrediteVeprimtari = r[a.tipiveprimtarise].totKrediteVeprimtari || 0 ;
     

       if (a.tipiveprimtarise !="m")

       {
         
       r[a.tipiveprimtarise].totKrediteVeprimtari = r[a.tipiveprimtarise].totKrediteVeprimtari +a.kredite;
      
      }
       r[a.tipiveprimtarise].push(a);
      
       
       // console.log("--------------------------");
       return r;
      
   }, {});

   

   const sum = planpermbajtja.reduce(function(a, b){
    if (b.tipiveprimtarise != "m")
    a = a + b.kredite ;
    return a;
}, 0);

console.log(sum);

    

      /*  res.status(201).json({
        status: 'success',
        data: {
          obj
        }
      });   */

    res.status(201).render('pdfTemplate', {"obj" :obj, "obj2":obj2 , "sum":sum});
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };





      exports.getAllPlanpermbajtja2= async () => {
        try {
          query={planetmesimore: "6346837dc54eb97b565da297"};
          const features= new APIFeatures(Planpermbajtja.find(),query).filter();
         // const planpermbajtja = await Planpermbajtja.find({planetmesimore: req.params.planetmesimore});
          // Tour.findOne({ _id: req.params.id })
          const planpermbajtja = await features.query;
          let totkredite=0;
          let totaliSeminare=0;
    
          planpermbajtja.forEach(element => {
            
            totkredite= totkredite+element.kredite;
            totaliSeminare+= element.totSeminare;
          });
    
          const obj=
          {
            planpermbajtja,
            totkredite,
            totaliSeminare
    
          }
          console.log(obj.entries)
      
  
    } catch (err) {
     console.log(err.message);
    }
    return obj;
  };

 
  
  exports.createPlanpermbajtja = async (req, res) => {
    try {
      // const newTour = new Tour({})
      // newTour.save()

      if (req.params.viti)
      req.body.viti=req.params.viti;
      
  
      const newPlanpermbajtja = await Planpermbajtja.create(req.body);
  
      res.status(201).json({
        status: 'success',
        data: {
          planpermbajtja: newPlanpermbajtja
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.updatePlanpermbajtja = async (req, res) => {
    try {

      const planpermbajtja = await Planpermbajtja.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
       
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          planpermbajtja
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.deletePlanpermbajtja = async (req, res) => {
    try {
      await Planpermbajtja.findByIdAndDelete(req.params.id);
  
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };


