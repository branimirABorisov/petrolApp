const router = require('express').Router();
const mapErros = require('../utils/mapper');
const mongooseConnect = require('../utils/mongoose');
const multiparty = require('multiparty');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASURMENT_ID
  
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

router.post('/upload', async (req, res) => {


    await mongooseConnect();

    try {

       
        const form = new multiparty.Form();

        const {fields, files} = await new Promise ((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
              if (err) reject(err);
              resolve({fields, files});
            })
          })
          const links = []
          for ( const file of files.file) {
        
          const ext = file.originalFilename.split('.').pop()
          const fileName = file.originalFilename.split('.')[0] + '_' + Date.now() + '.' + ext;
        
          const metadata = {
            contentType: file.headers['content-type'],
          };
        
          const fileBuffer = require('fs').readFileSync(file.path);
          const storageRef = ref(storage, 'fuelImages/' + fileName);
          await uploadBytes(storageRef, fileBuffer, metadata);
          const downloadURL = await getDownloadURL(storageRef);
          links.push(downloadURL)
        }
        
        return res.json({links});
        

        
    } catch (err) {
        console.error(err.message);
        const error = mapErros(err);
        res.status(400).json({ message: error })
    }
})


module.exports = router;