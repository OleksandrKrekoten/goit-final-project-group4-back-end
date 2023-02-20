const express = require('express')


const {
expensesMonths,
incomeMonths,
fullStatistics,
} = require("../../controllers/transactions/index");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const router = express.Router()

router.get("/incomeMonths", ctrlWrapper(incomeMonths));

router.get("/expensesMonths", ctrlWrapper(expensesMonths));

router.get("/fullStatistics",ctrlWrapper(fullStatistics))

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
