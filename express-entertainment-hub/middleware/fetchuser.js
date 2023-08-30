const jwt = require("jsonwebtoken");

const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please Authenticate using Valid Token" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    admin.auth().getUser(decodedToken.uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched user data: ${userRecord}`);
      req.user = userRecord;
      next();
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
    } catch (error) {
    console.log(error);
    res.json(error.errorInfo);
  }
};

module.exports = fetchUser;
