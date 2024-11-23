const Transaction = require("../models/Transaction");
const User = require("../models/User");

// Transfer Money
exports.transferMoney = async (req, res) => {
  const { receiverAccount, amount } = req.body;
  try {
    // Log the input for debugging
    console.log(
      "Transfer Request - Receiver Account:",
      receiverAccount,
      "Amount:",
      amount
    );

    const sender = req.user; // Assume middleware has attached the sender's user object
    const receiver = await User.findOne({ accountNumber: receiverAccount });
    // console.log()
    if (!receiver) {
      console.log("Receiver not found for account number:", receiverAccount);
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (sender.balance < amount) {
      console.log(
        "Insufficient balance:",
        sender.balance,
        "Requested:",
        amount
      );
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct and update balances
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    // Log successful updates
    console.log(
      "Balances updated successfully. Sender Balance:",
      sender.balance,
      "Receiver Balance:",
      receiver.balance
    );

    // Record the transaction
    const transaction = new Transaction({
      sender: sender.id,
      receiver: receiver.id,
      amount,
      description: "Money transfer",
    });
    await transaction.save();

    console.log("Transaction recorded:", transaction);
    res.json({ message: "Transfer successful", transaction });
  } catch (error) {
    console.error("Error during money transfer:", error);
    res.status(500).json({ message: "Error transferring money", error });
  }
};

// Get Transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ sender: req.user.id })
      .populate("receiver", "name accountNumber")
      .sort("-createdAt");
    res.json({ transactions: transactions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};
