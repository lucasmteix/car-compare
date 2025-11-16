const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const carRoutes = require('./routes/carRoutes');
const testDbRouter = require('./routes/testeDb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/cars', carRoutes);
app.use('/api', testDbRouter);
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
  res.json({
    message: "API CarCompare está rodando!",
    endpoints: {
      list: 'GET /api/cars',
      get: 'GET /api/cars/:id',
      create: 'POST /api/cars',
      update: 'PUT /api/cars/:id',
      delete: 'DELETE /api/cars/:id',
      compare: 'GET /api/cars/compare/:id1/:id2',
      brands: 'GET /api/cars/brands'
    }
    });
});

app.listen(PORT, () =>{
  console.log(`Backend rodando em http://localhost:${PORT}`);

});
