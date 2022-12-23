const Ngarkesa = require("../../models/ngarkesat/ngarkesaModel");
const User = require("../../models/users/userModel");
const Ngarkesepermbajtja = require("../../models/ngarkesepermbajtja/ngarkesepermbajtjaModel");



exports.getAllNgarkesepermbajtja = async (req, res) => {
    try {
        
      // EXECUTE QUERY
      let filter = {}
      
      if (req.params.ngid )  filter= {ngarkesa: req.params.ngid};
      //const pedagogu= await Ngarkespermbajtja.find({ngarkesa: req.params.ngid}) ;
      
    // console.log(filter);
      
      
      

    const ngarkesepermbajtja =  await Ngarkesepermbajtja.find(filter)
      
       /*  const ngarkesa = await Ngarkesa.aggregate([ 
          { "$unwind": "$pedagogu" },
    
          {
            $lookup: {
              from: "pedagog",
              localField: "pedagogu",
              foreignField: "_id",
              as: "pedagog",
            },
          },
          {
            $match: {
              "pedagog.emri": "Medjon",
            },
          }
    
    ])  */
      
      ;
   
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: ngarkesepermbajtja.length,
        data: {
          ngarkesepermbajtja
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.getNgarkespermbajtja = async (req, res) => {
    try {
      const Ngarkespermbajtja = await Ngarkespermbajtja.findById(req.params.id);
      // Tour.findOne({ _id: req.params.id })
  
      res.status(200).json({
        status: 'success',
        data: {
            Ngarkespermbajtja
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };



  
  
  exports.createNgarkesepermbajtja = async (req, res) => {
    try {
      // const newTour = new Tour({})
      // newTour.save()
      if (!req.body.ngid) req.body.ngarkesa=req.params.ngid
      let kangarkese= await Ngarkesa.find({'_id':req.params.ngid})
      //console.log(kangarkese);
      if(kangarkese.length != 1)

  {
    res.status(400).json({
      status: 'fail',
      message:'Ngarkesa nuk ekziston'
    });
    return;

  }
      const newNgarkesepermbajtja = await Ngarkesepermbajtja.create(req.body);
    
      res.status(201).json({
        status: 'success',
        data: {
          ngarkesepermbajtja: newNgarkesepermbajtja
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };
  
  exports.updateNgarkesepermabjtja = async (req, res) => {
    try {

      const ngarkesepermbajtja = await Ngarkesepermbajtja.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
       
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          ngarkesepermbajtja
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.deleteNgarkesepermbajtja = async (req, res) => {
    try {
      await Ngarkesepermbajtja.findByIdAndDelete(req.params.id);
  
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

  exports.generatePDF = async (req, res) => {
    try {
      //await Planpermbajtja.findByIdAndDelete(req.params.id);

      //const templateData = await this.getAllPlanpermbajtja();
     // res.render('template.html', templateData)
     //var url = "/clients/"+req.params.id+"/reports/monthlyreport/"+req.params.marketplace+"/"+req.params.month
     //const url = `${baseUrl}/orders/${req.params.id}/view`;
     const url = "http://localhost:3000/api/v1/planpermbajtja?planetmesimore=" + req.params.id;
     console.log(url);
     const filename = await pdfDoc(url);
     res.contentType("application/pdf");
     res.sendFile(filename);
  
      //res.status(204).render('template.html', templateData);
      //await pdfDoc();

    
    } catch (err) {
      res.status(404).json({
        status: 'fail 2',
        message: err.message
      });
    }
  };