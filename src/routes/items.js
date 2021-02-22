const itemsController = require('../controllers/items');
const express = require('express');
const router = express.Router();

// Commenting out for now so a bunch of people don't trash the DB

// router.post('/create', async (req, res, next) => {
//   const itemToCreate = req.body;

//   try {
//     const item = await itemsController.createItem(itemToCreate);
//     res.status(201).json(item);
//   } catch (err) {
//     next(err);
//   }
// });

router.get('/list', async (req, res, next) => {
  // Convert 'from' and 'size' to integers because they may be passed as strings.
  let from = parseInt(req.query.from, 10);
  let size = parseInt(req.query.size, 10);
  const sortField = req.query.sortField;
  const sortDir = req.query.sortDir;
  const isOnSale = req.query.isOnSale;
  const q = req.query.q;

  // We don't want to pass bad params to the list items function.
  // Passing undefined will make 'size' and 'from' become the defaults specified in the listItems function.
  if (Number.isNaN(from)) from = undefined;
  if (Number.isNaN(size)) size = undefined;

  try {
    const items = await itemsController.listItems({ from, size, sortField, sortDir, isOnSale, q });
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const itemId = req.params.id;

  try {
    const item = await itemsController.getItemById(itemId);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
