import { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    receiverAccount: "",
    amount: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Unauthorized");
        }

        // Fetch dashboard data
        const response = await axios.get(
          "http://localhost:5000/api/users/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details. Please log in again.");
        setLoading(false);

        // Redirect to login page if unauthorized
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchDashboardData();
  }, [navigate]);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Unauthorized");

        const response = await axios.get(
          "http://localhost:5000/api/transactions/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
        setTransactions(response.data.transactions);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, []);

  const handleNewTransaction = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Unauthorized");

      const response = await axios.post(
        "http://localhost:5000/api/transactions/transfer",
        {
          ...newTransaction,
          status: "completed",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTransactions([...transactions, response.transaction]);
      setNewTransaction({ receiverAccount: "", amount: "", description: "" });
      alert("Transaction created successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to create transaction. Please try again.");
    }
  };

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Welcome, {userDetails?.name}!</h1>
        <div className="profile-details">
          <p>
            <strong>Email:</strong> {userDetails?.email}
          </p>
          <p>
            <strong>Account Number:</strong> {userDetails?.accountNumber}
          </p>
          <p>
            <strong>Balance:</strong> ${userDetails?.balance.toFixed(2)}
          </p>
        </div>
      </div>
      <h1>Transaction History</h1>

      {transactions ? (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li key={transaction._id} className="transaction-item">
              <p>
                <strong>Sender:</strong> {transaction.sender.name || "You"}
              </p>
              <p>
                <strong>Receiver:</strong> {transaction.receiver.name}
              </p>
              <p>
                <strong>Amount:</strong> ${transaction.amount.toFixed(2)}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {transaction.description || "No description"}
              </p>
              <p>
                <strong>Status:</strong> {transaction.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(transaction.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions done...</p>
      )}

      <h2>Create a New Transaction</h2>
      <div className="new-transaction">
        <input
          type="text"
          placeholder="Receiver User ID"
          value={newTransaction.receiverAccount}
          onChange={(e) =>
            setNewTransaction({
              ...newTransaction,
              receiverAccount: e.target.value,
            })
          }
        />
        <input
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={(e) =>
            setNewTransaction({ ...newTransaction, amount: e.target.value })
          }
        />
        <textarea
          placeholder="Description (optional)"
          value={newTransaction.description}
          onChange={(e) =>
            setNewTransaction({
              ...newTransaction,
              description: e.target.value,
            })
          }
        ></textarea>
        <button onClick={handleNewTransaction}>Submit Transaction</button>
      </div>
    </div>
  );
};

export default ProfilePage;
