const { Transactions } = require("../schema/transactionsMongooseSchema");
const createError = require("http-errors");

const getTransactionById = async (transactionId, owner) => {
  const transaction = await Transactions.findOne({
    _id: transactionId,
    userId: owner,
  });
  return transaction;
};

const addTransaction = async (
  { dateTransaction, income, sum, category, description },
  owner
) => {
  const transaction = new Transactions({
    userId: owner,
    dateTransaction,
    income,
    sum,
    category,
    description,
  });
  transaction.markModified("dateTransaction");
  await transaction.save();
  return transaction;
};

const deleteTransaction = async (transactionId, owner, next) => {
  const transaction = await getTransactionById(transactionId, owner);
  if (!transaction) return next(createError(404, "No transactions found"));
  await Transactions.findByIdAndRemove(transactionId);
  if (!(await getTransactionById(transactionId))) return true;
};

module.exports = {
  addTransaction,
  deleteTransaction,
};
