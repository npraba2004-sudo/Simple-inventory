// inventory.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// In-memory inventory
let inventory = [];
let nextId = 1;

// Create a new item
app.post('/api/items', (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || quantity == undefined || price == undefined) {
    return res.status(400).json({ message: 'Name, quantity, and price are required' });
  }
  const item = { id: nextId++, name, quantity, price };
  inventory.push(item);
  res.status(201).json(item);
});

// Get all items
app.get('/api/items', (req, res) => {
  res.json(inventory);
});

// Get single item by ID
app.get('/api/items/:id', (req, res) => {
  const item = inventory.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
});

// Update item
app.put('/api/items/:id', (req, res) => {
  const item = inventory.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  const { name, quantity, price } = req.body;
  if (name !== undefined) item.name = name;
  if (quantity !== undefined) item.quantity = quantity;
  if (price !== undefined) item.price = price;
  res.json(item);
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  const index = inventory.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  const deleted = inventory.splice(index, 1);
  res.json({ message: 'Item deleted', deleted: deleted[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(Inventory API running on http://localhost:${PORT});
});