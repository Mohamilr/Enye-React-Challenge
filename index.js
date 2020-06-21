const express = require("express");
const expressGraphql = require("express-graphql");
const { buildSchema } = require("graphql");
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccount.config');
require ('dotenv').config();

const app = express();

const port = process.env.PORT || 4000;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

const schema = buildSchema(`
    type Query {
        result(userId: String): [Values]
    }

    type Values {
        searchString: String
        location: String
        userId: String
    }
    
`);

const get = (args) => {
  const userId = args.userId;
 return db.collection('searchHistory').get().then(snapshot => {
    // console.log(snapshot.docs)
    const strings = []
    snapshot.docs.map(data => {
      if (data.data().userId === userId) {
        const values = data.data()
        strings.push({
            searchString: values.searchString,
            location: values.location
        })
    }
        // if (data.data().userId === userId) {
        //     const values: any = data.data()
        //     strings.push({
        //         searchString: values.searchString,
        //         location: values.location
        //     })
        // }
        return strings[0];

    })
// console.log(strings)


  })
  .catch(e => console.error(e));
};

const root = {
    result: get
};

app.use(
  "/",
  expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
