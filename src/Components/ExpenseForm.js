import { useEffect, useState } from 'react';
import classes from './ExpenseForm.module.css'

const ExpenseForm = ()=> {

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'food',
  });
  const [expenses, setExpenses] = useState([]);

  useEffect(  () => {
    const fetchdata = async ()=>{
      let url;
      url ="https://expensetracker-b01cb-default-rtdb.firebaseio.com/expenses.json";
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          console.log('FETCHED DATA',data);
          setExpenses(Object.values(data));
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
    {expenses !== null && (
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