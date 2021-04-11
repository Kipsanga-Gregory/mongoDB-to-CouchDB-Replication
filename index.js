const express =require('express');
const bodyParser =require('body-parser');
const mongoose =require('mongoose');
const cors = require('cors');
const Nano = require('nano');

const devices = require('./models/device.model')
const cartridgeType = require('./models/cartridgeType.model')
const admins = require('./models/admin.model')
const cartridgeIngredients = require('./models/cartridgeIngredients.model')
const deviceCartridge = require('./models/deviceCartridge.model')
const welnessPrograms = require('./models/wellnessProgram.model')



const LOCAL_DB_URL = 'http://admin:Greg366.@localhost:5984/';
const nano = Nano(LOCAL_DB_URL);


const MONGOOSE_URI = 'mongodb+srv://admin:62vN01oqWnlAZO4X@h2yo-cluster.lzkwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

(async () => {
  try {

    const app = express();
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

      
    const createDB = async (dbName) => {
        try {
    
          await nano.db.create(dbName);
          console.log(`Created DB: ${dbName}`);
      
        } catch (err) {
            if (err == 'Error: The database could not be created, the file already exists.') {
                console.log({
                    'expected': true,
                    'type': 'Database already Exist!'
                })
            } else {
                console.log(`Error in createDB: ${err}`);
            }
        }
    };
    
    const insertDoc = async (dbName, keyValueArray) => {
      const activeDb = nano.use(dbName);
        try {
          
            const body = await activeDb.insert(keyValueArray, keyValueArray._id);
            console.log('New document created: ', body);
            
        } catch (err) {
            if (err == 'Error: Database does not exist.') {
    
                await createDB(dbName)
    
                const body = await activeDb.insert(keyValueArray, keyValueArray._id);
                console.log('New Database and document created: ', body);
                
            } else if (err == 'Error: Document update conflict.') {
                try {
                    const doc = await activeDb.get(keyValueArray._id, { revs_info: true })
     
                    const body = await activeDb.insert({ _id: keyValueArray._id, _rev: doc._rev, keyValueArray })
                    console.log('New document Updated: ', body);
                } catch (error) {
                    if (error == 'Error: No DB shards could be opened.') {
                        console.log({
                            'expected': true,
                            'type': 'No DB shards could be opened.!',
                            'status': 'Unknown'
                        })
                    }
                    console.log(error)
                }
            } else {
                console.log(`${err}`);
          }
      }
    };

    const getColletionData = async (colName) => {
        switch (colName) {
            case 'devices':
            const allDevices = await devices.find({})
            if (allDevices[0]) {
                allDevices.forEach((device) => {
                    insertDoc(colName, device)
                    })
            }
            console.log(allDevices)
                break;
            case 'cartridgetypes':
            const allCartridgetypes = await cartridgeType.find({})
            if (allCartridgetypes[0]) {
                allCartridgetypes.forEach((cartridgetype) => {
                    insertDoc(colName, cartridgetype)
                    })
            }
            console.log(allCartridgetypes)
                break;
            case 'admins':
            const allAdmins = await admins.find({})
            if (allAdmins[0]) {
                allAdmins.forEach((admin) => {
                    insertDoc(colName, admin)
                    })
            }
            console.log(allAdmins)
                break;
            case 'cartridgeingredients':
            const allCartridgeIngredients = await cartridgeIngredients.find({})
            if (allCartridgeIngredients[0]) {
                allCartridgeIngredients.forEach((cartridgeIngredient) => {
                    insertDoc(colName, cartridgeIngredient)
                    })
            }
            console.log(allCartridgeIngredients)
                break;
            case 'devicecartridges':
            const allDeviceCartridge = await deviceCartridge.find({})
            if (allDeviceCartridge[0]) {
                allDeviceCartridge.forEach((deviceCartridge) => {
                    insertDoc(colName, deviceCartridge)
                    })
            }
            console.log(allDeviceCartridge)
                break;
            case 'welnessprograms':
            const allWelnessPrograms = await welnessPrograms.find({})
            if (allWelnessPrograms[0]) {
                allWelnessPrograms.forEach((welnessProgram) => {
                    insertDoc(colName, welnessProgram)
                    })
            }
            console.log(allWelnessPrograms)
                break;
            case 'pumplogs':
                //This is Directly written to Couch and replicated to Mongo
                break;
        }
    }
      const getCollections = async () => {
          let collectionList = []
          await mongoose.connections[0].db.listCollections().toArray((error, collections) => {
              if (error) {
                  console.log(error)
              } else {
                  collections.forEach((col) => {
                      collectionList.push(col.name)
                  })
                  console.log(collectionList)

                  //Map each dbName to be updated
                  collectionList.forEach((colName) => {
                    getColletionData(colName)
                  })
              }
          })
        }

      app.get('/', (req, res) => getCollections())

    await mongoose.connect(MONGOOSE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });


    app.listen(process.env.PORT || 4000, () =>

        console.log(`App listening on port ${4000}`)
        
    );
  } catch (error) {

        console.error('Server could not start: ', error);

    }
    
})();
