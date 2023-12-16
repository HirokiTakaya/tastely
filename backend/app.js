const express = require("express");
const cors = require('cors');
const app = express();
const admin = require('firebase-admin');


const serviceAccount = require('./auth-5793f-firebase-adminsdk-yi5ey-f7e097fbbe.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require('./models/db');


const router = express.Router();


const LoginRoute = require('./routes/login');
router.use('/login', LoginRoute);

const RegisterRoute = require('./routes/register');
router.use('/register', RegisterRoute);

const CreatePlanRoute = require('./routes/createplan');
router.use('/createplan', authMiddleware, CreatePlanRoute); 


app.use("/api/v1", router);


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), () => console.log('listening on ', app.get('port')));
