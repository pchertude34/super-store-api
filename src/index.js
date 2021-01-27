const express = require('express');
const morgan = require('morgan');
const connect = require('./utils/connect');
const cors = require('cors');
const itemRouter = require('./routes/items');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-spec.json');

const app = express();

app.use(morgan('dev'));
// Allow all cors so people can actually use this api.
app.use(cors());
// Use json and urlencode to be able to parse the request bodies
app.use(express.json());
app.use(express.urlencoded());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/item', itemRouter);

connect()
  .then(() =>
    app.listen(4000, () => {
      console.log('server on http://localhost:4000');
    })
  )
  .catch((e) => console.error(e));
