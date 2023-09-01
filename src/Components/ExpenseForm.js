import { useEffect, useState } from 'react';
import classes from './ExpenseForm.module.css'

const ExpenseForm = ({ onActivatePremium })=> {

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'food',
  });
  const [expenses, setExpenses] = useState([]);
  
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isPremiumActive, setIsPremiumActive] = useState(false);

  const handleActivatePremium = () => {
    setIsPremiumActive(true);
    onActivatePremium();
  };

  useEffect(() => {
    setTotalExpenses(
      expenses.reduce((total, expense) => total + Number(expense.amount), 0)
    );
  }, [expenses]);

  useEffect(  () => {
    const fetchdata = async ()=>{
      let url;
      url ="https://expensetracker-b01cb-default-rtdb.firebaseio.com/expenses.json";
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          console.log('FETCHED DATA',data);
          setExpenses(Object.entries(data).map(([id, expense]) => ({ ...expense, id })));
        } else {
          const data = await res.json();
          throw new Error(data.error.message);
        }
      } catch (err) {
        alert(err.message);
      }
    }
    fetchdata();
    
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let url;
      url ="https://expensetracker-b01cb-default-rtdb.firebaseio.com/expenses.json";

      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
        
          const data = await res.json();
          console.log('added to db',data);
          setExpenses((prevState) => [...prevState,  {...formData, id: data.name}]);
          setFormData({
            amount: '',
            description: '',
            category: 'food',
          });

        } else {
          const data = await res.json();
          throw new Error(data.error.message);
        }
      } catch (err) {
        alert(err.message);
      }
  }; 

      
  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const handleDelete = async (id) => {
    console.log('delete id',id);
    let url;
    url = `https://expensetracker-b01cb-default-rtdb.firebaseio.com/expenses/${id}.json`;

    try {
      const res = await fetch(url, {
        method: 'DELETE',
      });
      if (res.ok) {
        console.log('Expense successfully deleted');
        setExpenses((prevState) =>
          prevState.filter((expense) => expense.id !== id)
        );
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };


  const handleEdit = (id) => {
    setEditMode(true);
    setEditId(id);
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setFormData(expenseToEdit);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    let url;
    url = `https://expensetracker-b01cb-default-rtdb.firebaseio.com/expenses/${editId}.json`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        console.log('Expense successfully updated');
        setExpenses((prevState) =>
          prevState.map((expense) =>
            expense.id === editId ? { ...formData, id: editId } : expense
          )
        );
        setEditMode(false);
        setEditId(null);
        setFormData({
          amount: '',
          description: '',
          category: 'food',
        });
      } else {
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const handleDownloadExpenses = () => {
    // Generate the CSV data

  let csvContent = 'Amount,Description,Category\n'; // Header row

  expenses.forEach(expense => {
    csvContent += `${expense.amount},${expense.description},${expense.category}\n`;
  });

  // Create a Blob object from the CSV data
  const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create a download link for the Blob object
  const csvUrl = URL.createObjectURL(csvBlob);

  // Trigger the download
  const link = document.createElement('a');
  link.href = csvUrl;
  link.setAttribute('download', 'expenses.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  };

    return(
        <>
    <form className={classes.form} onSubmit={editMode ? handleUpdate : handleSubmit}>
      <div >
        <label htmlFor="amount" >Amount</label>
        <input type="number" className={classes.input}  onChange={handleChange} value={formData.amount} id='amount' required />
      </div>
      <div >
        <label htmlFor="description" >Description</label>
        <input type="text"  id="description"  onChange={handleChange} value={formData.description} required className={classes.input}/>
      </div>
      <div >
        <label htmlFor="category" >Category</label>
        <select id="category" required className={classes.select} onChange={handleChange} value={formData.category} >
          <option value="food">Food</option>
          <option value="groceries">Groceries</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit">{editMode ? 'Update' : 'Add'}  Expense</button>
    </form>
    {expenses !== null && (
        <> {totalExpenses > 10000 && (
          <button className={classes.premiumbutton} onClick={handleActivatePremium}>Activate Premium</button>
        )}
        
    {isPremiumActive && <button onClick={handleDownloadExpenses}>Download Expenses</button>}
          <h2>Expenses:</h2>
          {expenses.map((expense, index) => (
            <div key={index}>
              <p>Amount: {expense.amount}</p>
              <p>Description: {expense.description}</p>
              <p>Category: {expense.category}</p>
              <button onClick={() => handleDelete(expense.id)}>Delete</button>
              {!editMode && (
                <button onClick={() => handleEdit(expense.id)}>Edit</button>
              )}
              <hr />
            </div>
          ))}
        </>
      )}
    </>
    );

};
export default ExpenseForm;