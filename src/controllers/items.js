const Item = require('../models/item');

async function createItem(item) {
  const itemToCreate = await Item.create(item);
  return itemToCreate;
}

async function getItemById(id) {
  const item = Item.findById(id).exec();
  return item;
}

async function listItems({
  from = 0,
  size = 25,
  sortField = 'name',
  sortDir = 'asc',
  isOnSale,
  q,
}) {
  const findParams = {};

  if (q) {
    findParams.$text = { $search: q };
  }
  if (isOnSale) {
    findParams.isOnSale = isOnSale;
  }

  // Get the paginated items
  const items = await Item.find(findParams)
    .sort({ [sortField]: sortDir })
    .skip(from)
    .limit(size)
    .exec();
  // Make another query to get the total count of all the items under the search params
  const total = await Item.find(findParams).count();
  const hasMore = from + size < total;
  const next = hasMore ? from + size + 1 : null;

  return { items, total, hasMore, next };
}

module.exports = {
  createItem,
  getItemById,
  listItems,
};
