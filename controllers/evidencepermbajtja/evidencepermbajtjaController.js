
const User = require("../../models/users/userModel");
const Evidencepermbajtja= require("../../models/evidencepermbajtja/evidencepermbajtjaModel");
const Evidenca = require("../../models/evidencat/evidencaModel");



exports.getAllEvidenca = async (req, res) => {
    try {
        
      // EXECUTE QUERY
      let filter = {}
      
      if (req.params.ngid )  filter= {ngarkesa: req.params.ngid};
      //const pedagogu= await Ngarkespermbajtja.find({ngarkesa: req.params.ngid}) ;
      
    // console.log(filter);
      
      
      

    const evidencepermbajtja =  await Evidencepermbajtja.find(filter)
      
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
        results: evidencepermbajtja.length,
        data: {
            evidencepermbajtja
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.getEvidenca = async (req, res) => {
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



  
  
  exports.createEvidenca = async (req, res) => {
    try {
      // const newTour = new Tour({})
      // newTour.save()
     // if (!req.body.ngid) req.body.ngarkesa=req.params.ngid
      let kaevidence= await Evidenca.find({'_id':req.params.evid})
      
      
      console.log(kaevidence.length);
      if(kaevidence.length != 1)

  {
    res.status(400).json({
      status: 'fail',
      message:'Formulari nuk ekziston'
    });
    return;

  }
  if (!req.body.evid) req.body.evidenca=req.params.evid
  //console.log(kaevidence);
  req.body.vitiakademik=kaevidence[0].vitiakademik;
      const newEvidencepermbajtja = await Evidencepermbajtja.create(req.body);
    
      res.status(201).json({
        status: 'success',
        data: {
          evidencepermbajtja: newEvidencepermbajtja
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };
  
  exports.updateEvidenca = async (req, res) => {
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
  
  exports.deleteEvidenca = async (req, res) => {
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