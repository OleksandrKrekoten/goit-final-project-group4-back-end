const { Transactions } = require("../../schema/transactionsMongooseSchema");
// const { mothsResultsSchema } = require("../../schema/joiSchemas");

const expensesMonths = async (req, res) => {
  // const { currentMonth, year } = req.body;
  // const{_id:userId}=req.user
  const userId = "63f09d03f2f85fb05e29c4as";
  const year = 2023;
  const currentMonth = 02;

  const yearStarts = new Date(`Wed, 01 Jan ${year} 00:00:00 GMT`);
  const yearEnds = new Date(`Thu, 31 Dec ${year} 00:00:00 GMT`);

  const array = await Transactions.aggregate([
    {
      $match: {
        userId,
        income: false,
        dateTransaction: {
          $gte: yearStarts,
          $lte: yearEnds,
        },
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$dateTransaction",
          },
        },
        total: {
          $sum: "$sum",
        },
      },
    },
    {
      $addFields: {
        month: "$_id.month",
      },
    },
    {
      $unset: "_id",
    },
    {
      $sort: {
        month: 1,
      },
    },
  ]);
  if (array.length === 0) {
    return res
      .status(400)
      .json({ message: "There aren`t expenses in this year" });
  }
  const result = array.filter(({ month }) => month >= currentMonth);
  const length = result.length;

  if (length < 6) {
    for (
      let index = 0;
      index < 6 - array.length && result.length < array.length;
      index++
    ) {
      if (array[index]) {
        result.push(array[index]);
      }
    }
  }
  result.sort((a, b) => a.month - b.month);
  res.status(200).json(result);
};
module.exports = expensesMonths;
