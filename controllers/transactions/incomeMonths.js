const { Transactions } = require("../../schema/transactionsMongooseSchema");
const { mothsResultsSchema } = require("../../schema/joiSchemas");

const incomeMonths = async (req, res) => {
  const { error } = mothsResultsSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.message });
  }
  // const { month,year } = req.body;
  // const{_id:userId}=req.user
  const userId = "1";
  const year = 2020;
  const currentMonth = 5;

  const yearStarts = new Date(`Wed, 01 Jan ${year} 00:00:00 GMT`);
  const yearEnds = new Date(`Thu, 31 Dec ${year} 00:00:00 GMT`);

  const array = await Transactions.aggregate([
    {
      $match: {
        userId,
        income: true,
        date: {
          $gte: yearStarts,
          $lte: yearEnds,
        },
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$date",
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
module.exports = incomeMonths;
