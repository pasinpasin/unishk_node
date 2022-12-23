const Ngarkesa = require("../../models/ngarkesat/ngarkesaModel");
const Departamenti = require("../../models/departamentiModel");
const Ngarkesepermbajtja = require("../../models/ngarkesepermbajtja/ngarkesepermbajtjaModel");
const User = require("../../models/users/userModel");
const generatePDF2 = require("../../utils/generatePDF");
const PDFUtil= require("../../utils/generatePDF")





exports.getAllNgarkesa2 = async (req, res) => {
    try {
     
       let pedagogu= {};
       let depmertimi= {};
       let departamenti= {};
      // EXECUTE QUERY
      let filter = {}
     
      if (req.params.pedagoguID) 
      filter= {pedagogu: req.params.pedagoguID}
      else
      if (req.params.dep && req.params.vitiakademik)
      {
        departamenti=await Departamenti.find({"_id": req.params.dep});
        depmertimi= departamenti[0].emertimi;
      //pedagogu= await User.find({departamenti: req.params.dep}) ;
       //
       //console.log(pedagogu);
       //filter= {vitiakademik: req.params.vitiakademik, pedagogu: pedagogu};
       //console.log(filter);
       filter= {vitiakademik: req.params.vitiakademik, departamenti: depmertimi};
      }
      else   if (req.params.fakulteti && req.params.vitiakademik)
      {
        departamenti=await Departamenti.find({"_id": req.params.dep});
        depmertimi= departamenti[0].emertimi;
         //pedagogu= await User.find({fakulteti: req.params.fakulteti}) ;
         //console.log(pedagogu);
         //filter= {vitiakademik: req.params.vitiakademik, pedagogu: pedagogu};
         filter= {vitiakademik: req.params.vitiakademik, departamenti: depmertimi};
         //console.log(filter);
        }

      //console.log(pedagogu);

     
     let pipeline = [
      
      
     // {$match:{"vitiakademik":req.params.vitiakademik, "pedagogu":{"$in": pedagogu.map(x => x._id)}
     {$match:{"vitiakademik":req.params.vitiakademik, "departamenti":depmertimi
        }
    } ,
     

        {
      "$lookup": {
          "from": "ngarkesepermbajtjas",
          "localField": "_id",
          "foreignField": "ngarkesa",
          "as": "alookup"
      }
  }, {
      "$unwind": {
          "path": "$alookup"
      }
  }, {
      "$addFields": {
          "alookup.lendet": {
              "$map": {
                  "input": "$alookup.lendet",
                  "as": "ngarkesepermbajtjas1",
                  "in": {
                      "$mergeObjects": ["$$ngarkesepermbajtjas1", {
                              total: {
                                  $add: ["$$ngarkesepermbajtjas1.leksione", {
                                          $multiply: ["$$ngarkesepermbajtjas1.seminare", "$$ngarkesepermbajtjas1.grupseminare"]
                                      }, {
                                          $multiply: ["$$ngarkesepermbajtjas1.laboratore", "$$ngarkesepermbajtjas1.gruplaboratore"]
                                      }, {
                                          $multiply: ["$$ngarkesepermbajtjas1.praktika", "$$ngarkesepermbajtjas1.koef"]
                                      }
                                  ]
                              }
                          }
                      ]
                  }
              }
          }
      }
  }, {
      $addFields: {
          totneAuditor: {

              "$reduce": {
                  "input": "$alookup.lendet",
                  "initialValue": 0,
                  "in": {
                      $sum: [
                          "$$value",
                          "$$this.total"
                      ]
                  }

              }

          }
      }
  }, {
      $addFields: {
          totjashteAuditor: {
    $add: [{
                      $multiply: ["$alookup.diploma1", 10]
                  }, {
                      $multiply: ["$alookup.diploma2", 20]
                  }, {
                      $multiply: ["$alookup.diploma3", 30]
                  }, {
                      $multiply: ["$alookup.udhehqjedoktorate", 25]
                  }, {
                      $multiply: ["$alookup.tezedoktorate", 80]
                  }, {
                      $multiply: ["$alookup.juridoktorate", 15]
                  }

              ]

          }
      }
  },
{
      $addFields: {
          planifikimi: {
    $add: [ "$totneAuditor","$totjashteAuditor"]

          }
      }
  }]
;

//console.log(filter);

//let ngarkesa =  await Ngarkesa.find(filter).populate({ path: 'ngarkesepermbajtja'}, );
let ngarkesa =  await Ngarkesa.aggregate(pipeline);
/* await Ngarkesa.populate(ngarkesa, {path: "pedagogu",
populate: [
  { path: 'fakulteti', select: 'emertimi' },
  { path: 'departamenti', select: 'emertimi -fakulteti' }
]}

); */
//Ngarkesa.populate(result, {path: "pedagogu"}, callback);

     //console.log(ngarkesa);

     //let ngarkesa= await Ngarkesa.aggregate
    
    
   
    //console.log(ngarkesa);
   /*  ngarkesa= ngarkesa.map(ngarkese => {

      const ngarkesepermbajtja= Ngarkesepermbajtja.find({ngarkesa: ngarkesa});
      ngarkese

    })
     */
  
    
  
      //res.status(201).render('pdfNgarkesa', {"ngarkesa" :ngarkesa});
      res.status(200).json({
        status: 'success',
        results: ngarkesa.length,
        data: {
          ngarkesa
        }
      }); 
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };

  exports.getAllNgarkesa = async (req, res) => {
    try {
      let pedagogu= {};
      let depmertimi= {};
      let fakemertimi= {};
      let departamenti= {};
     // EXECUTE QUERY
     let filter = {}
    
     if (req.params.pedagoguID) 
     filter= {pedagogu: req.params.pedagoguID}
     else
     if (req.params.dep && req.params.vitiakademik)
     {
       departamenti=await Departamenti.find({"_id": req.params.dep}).populate('fakulteti');
       depmertimi= departamenti[0].emertimi;
       fakemertimi= departamenti[0].fakulteti.emertimi;
     //pedagogu= await User.find({departamenti: req.params.dep}) ;
      //
      //console.log(pedagogu);
      //filter= {vitiakademik: req.params.vitiakademik, pedagogu: pedagogu};
      //console.log(filter);
      filter= {vitiakademik: req.params.vitiakademik, departamenti: depmertimi};
     }
     else   if (req.params.fakulteti && req.params.vitiakademik)
     {
       departamenti=await Departamenti.find({"_id": req.params.dep}).populate('fakulteti');
       depmertimi= departamenti[0].emertimi;
       fakemertimi= departamenti[0].fakulteti.emertimi;
        //pedagogu= await User.find({fakulteti: req.params.fakulteti}) ;
        //console.log(pedagogu);
        //filter= {vitiakademik: req.params.vitiakademik, pedagogu: pedagogu};
        filter= {vitiakademik: req.params.vitiakademik, departamenti: depmertimi};
        //console.log(filter);
       }

     //console.log(pedagogu);

    
    let pipeline = [
     
     
    // {$match:{"vitiakademik":req.params.vitiakademik, "pedagogu":{"$in": pedagogu.map(x => x._id)}
    {$match:{"vitiakademik":req.params.vitiakademik, "departamenti":depmertimi
       }
   } ,
    

       {
     "$lookup": {
         "from": "ngarkesepermbajtjas",
         "localField": "_id",
         "foreignField": "ngarkesa",
         "as": "alookup"
     }
 }, {
     "$unwind": {
         "path": "$alookup"
     }
 }, {
     "$addFields": {
         "alookup.lendet": {
             "$map": {
                 "input": "$alookup.lendet",
                 "as": "ngarkesepermbajtjas1",
                 "in": {
                     "$mergeObjects": ["$$ngarkesepermbajtjas1", {
                             total: {
                                 $add: ["$$ngarkesepermbajtjas1.leksione", {
                                         $multiply: ["$$ngarkesepermbajtjas1.seminare", "$$ngarkesepermbajtjas1.grupseminare"]
                                     }, {
                                         $multiply: ["$$ngarkesepermbajtjas1.laboratore", "$$ngarkesepermbajtjas1.gruplaboratore"]
                                     }, {
                                         $multiply: ["$$ngarkesepermbajtjas1.praktika", "$$ngarkesepermbajtjas1.koef"]
                                     }
                                 ]
                             }
                         }
                     ]
                 }
             }
         }
     }
 }, {
     $addFields: {
         totneAuditor: {

             "$reduce": {
                 "input": "$alookup.lendet",
                 "initialValue": 0,
                 "in": {
                     $sum: [
                         "$$value",
                         "$$this.total"
                     ]
                 }

             }

         }
     }
 }, {
     $addFields: {
         totjashteAuditor: {
   $add: [{
                     $multiply: ["$alookup.diploma1", 10]
                 }, {
                     $multiply: ["$alookup.diploma2", 20]
                 }, {
                     $multiply: ["$alookup.diploma3", 30]
                 }, {
                     $multiply: ["$alookup.udhehqjedoktorate", 25]
                 }, {
                     $multiply: ["$alookup.tezedoktorate", 80]
                 }, {
                     $multiply: ["$alookup.juridoktorate", 15]
                 }

             ]

         }
     }
 },
{
     $addFields: {
         planifikimi: {
   $add: [ "$totneAuditor","$totjashteAuditor"]

         }
     }
 }]
;

//console.log(filter);

//let ngarkesa =  await Ngarkesa.find(filter).populate({ path: 'ngarkesepermbajtja'}, );
let ngarkesa =  await Ngarkesa.aggregate(pipeline);
/* await Ngarkesa.populate(ngarkesa, {path: "pedagogu",
populate: [
 { path: 'fakulteti', select: 'emertimi' },
 { path: 'departamenti', select: 'emertimi -fakulteti' }
]}

); */
//Ngarkesa.populate(result, {path: "pedagogu"}, callback);

    console.log(ngarkesa);

    //let ngarkesa= await Ngarkesa.aggregate
   
   
  
   //console.log(ngarkesa);
  /*  ngarkesa= ngarkesa.map(ngarkese => {

     const ngarkesepermbajtja= Ngarkesepermbajtja.find({ngarkesa: ngarkesa});
     ngarkese

   })
    */
 
   
 
     res.status(201).render('pdfNgarkesa', {"ngarkesa" :ngarkesa, "fak":fakemertimi,"dep":depmertimi, "viti":req.params.vitiakademik});
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.getNgarkesa = async (req, res) => {
    try {
      const Ngarkesa = await Ngarkesa.findById(req.params.id);
      // Tour.findOne({ _id: req.params.id })
  
      res.status(200).json({
        status: 'success',
        data: {
          Ngarkesa 
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };



  
  
  exports.createNgarkesa = async (req, res) => {
    try {
      // const newTour = new Tour({})
      // newTour.save()
      //if (!req.body.pedagogu) req.body.pedagogu=req.params.pedagoguID
      
     const ped= await User.find({'_id':req.params.pedagoguID}).populate('fakulteti departamenti');
      //const fakulteti= await Pedagogu.findById(req.body.pedagogu).project({emertimi: 1});
if (ped.length> 0) {

  req.body.emerpedagogu=ped[0].emri;
  req.body.mbiemerpedagogu=ped[0].mbiemri;
  req.body.titullpedagogu=ped[0].titulli;
req.body.departamenti=ped[0].departamenti.emertimi;
req.body.fakulteti=ped[0].fakulteti.emertimi;
console.log(req.body);

  
}  
//console.log(JSON.stringify(req));
const newNgarkesa = await Ngarkesa.create(req.body);   
  
      res.status(201).json({
        status: 'success',
        data: {
          ngarkesa: newNgarkesa
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };
  
  exports.updateNgarkesa = async (req, res) => {
    try {

      const ngarkesa = await Ngarkesa.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
       
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          ngarkesa
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message
      });
    }
  };
  
  exports.deleteNgarkesa = async (req, res) => {
    try {
      await Ngarkesa.findByIdAndDelete(req.params.id);
  
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

  exports.krijoPDF = async (req, res) => {
    try {

      console.log("jam te krijo pdf");
      //await Planpermbajtja.findByIdAndDelete(req.params.id);

      //const templateData = await this.getAllPlanpermbajtja();
     // res.render('template.html', templateData)
     //var url = "/clients/"+req.params.id+"/reports/monthlyreport/"+req.params.marketplace+"/"+req.params.month
     //const url = `${baseUrl}/orders/${req.params.id}/view`;
     const url = "http://localhost:3000/api/v1/departamenti/" + req.params.dep +"/" + req.params.vitiakademik + "/ngarkesa";
   
     console.log(url);
     //const filename = await pdfDoc(url);
     //res.contentType("application/pdf");
     //res.sendFile(filename);
  
      //res.status(204).render('template.html', templateData);
      const filename =await generatePDF2(url);
      res.contentType("application/pdf");
      res.sendFile(filename);
      

    
    } catch (err) {
      res.status(404).json({
        status: 'fail 2',
        message: err.message
      });
    }
  };