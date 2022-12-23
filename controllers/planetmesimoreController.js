const Planetmesimore = require("../models/planetmesimoreModel");
const Planpermbajtja = require("../models/planpermbajtjaModel");
const pdfDoc = require("../utils/generatePDF");
//const moment=require("moment");

exports.checkBody = (req, res, next) => {
    if (!req.body.programi || !req.body.fakulteti || !req.body.departamenti || !req.body.vitiakademik) {
      return res.status(400).json({
        status: 'fail',
        message: 'Duhen plotesuar te gjitha te dhenat'
      });
    }
    next();
  };
  exports.getAllPlanetmesimore = async (req, res) => {
    try {
      // EXECUTE QUERY
      
        
      const planet = await Planetmesimore.find()
      .populate()
      ;
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: planet.length,
        data: {
          planet
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.getPlanetmesimore = async (req, res) => {
    try {
      const Planetmesimore = await Planetmesimore.findById(req.params.id);
      // Tour.findOne({ _id: req.params.id })
  
      res.status(200).json({
        status: 'success',
        data: {
          Planetmesimore
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };



  
  
  exports.createPlanetmesimore = async (req, res) => {
    try {
      // const newTour = new Tour({})
      // newTour.save()
  
      const newPlanetmesimore = await Planetmesimore.create(req.body);
  
      res.status(201).json({
        status: 'success',
        data: {
          Planetmesimore: newPlanetmesimore
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };
  
  exports.updatePlanetmesimore = async (req, res) => {
    try {

      const planetmesimore = await Planetmesimore.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
       
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          planetmesimore
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.deletePlanetmesimore = async (req, res) => {
    try {
      await Planetmesimore.findByIdAndDelete(req.params.id);
  
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

  


