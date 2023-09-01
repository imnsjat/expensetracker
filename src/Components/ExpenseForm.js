import { useState } from 'react';
import classes from './ExpenseForm.module.css'

const ExpenseForm = ()=> {

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'food',
  });
  const [expenses, setExpenses] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setExpenses((prevState) => [...prevState, formData]);
    setFormData({
      amount: '',
      description: '',
      category: 'food',
    });
  };
  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

    return(
        <>
    <form className={classes.form} onSubmit={handleSubmit}>
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
      <button type="submit" >Add Expense</button>
    </form>
    {expenses.length > 0 && (
        <>
          <h2>Expenses:</h2>
          {expenses.map((expense, index) => (
            <div key={index}>
              <p>Amount: {expense.amount}</p>
              <p>Description: {expense.description}</p>
              <p>Category: {expense.category}</p>
              <hr />
            </div>
          ))}
        </>
      )}
    </>
    );

};
export default ExpenseForm;