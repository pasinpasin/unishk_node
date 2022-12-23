const Departamenti = require("../models/departamentiModel");
//const moment=require("moment");

exports.checkBody = (req, res, next) => {
    if (!req.body.emertimi || !req.body.fakulteti) {
      return res.status(400).json({
        status: 'fail',
        message: 'Mungon emertimi i  Departamentit ose i fakultetit'
      });
    }
    next();
  };
  exports.getAllDepartamenti = async (req, res) => {
    try {
      // EXECUTE QUERY
      
        
      const departamentet = await Departamenti.find();
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: departamentet.length,
        data: {
          departamentet
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
  
  exports.getDepartamenti = async (req, res) => {
    try {
      const departamenti = await Departamenti.findById(req.params.id);
      // Tour.findOne({ _id: req.params.id })
  
      res.status(200).json({
        status: 'success',
        data: {
          departamenti
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.createDepartamenti = async (req, res) => {
    try {
      // const newTour = new Tour({})
      // newTour.save()
  
      const newDepartamenti = await Departamenti.create(req.body);
  
      res.status(201).json({
        status: 'success',
        data: {
          departamenti: newDepartamenti
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };
  
  exports.updateDepartamenti = async (req, res) => {
    try {

      const departamenti = await Departamenti.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
       
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          departamenti
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.deleteDepartamenti = async (req, res) => {
    try {
      await Departamenti.findByIdAndDelete(req.params.id);
  
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

  