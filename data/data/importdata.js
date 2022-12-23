const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Planpermbajtja = require('./../../models/planpermbajtjaModel');


dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true
    
   
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const planpermbajtja = JSON.parse(fs.readFileSync(`${__dirname}/planpermbajtjas.json`, 'utf-8'));
//const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));


// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Planpermbajtja.create(planpermbajtja);
    //await User.create(users, { validateBeforeSave: false });
    //await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Planpermbajtja.deleteMany();
    //await User.deleteMany();
    //await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
