import classes from './ExpenseForm.module.css'

const ExpenseForm = ()=> {

    return(
        <>
    <form className={classes.form}>
      <div >
        <label htmlFor="amount" >Amount</label>
        <input type="number" className={classes.input} id='amount' required />
      </div>
      <div >
        <label htmlFor="description" >Description</label>
        <input type="text"  id="description" required className={classes.input}/>
      </div>
      <div >
        <label htmlFor="category" >Category</label>
        <select id="category" required className={classes.select}>
          <option value="food">Food</option>
          <option value="groceries">Groceries</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" >Add Expense</button>
    </form></>
    );

};
export default ExpenseForm;