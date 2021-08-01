import { useRef , useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() !== '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const [formInputsValidity,setFormInputsValidity] = useState({
      name: true,
      street : true,
      city: true,
      postalcode : true
  })
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredNameIsValid = isEmpty(enteredName);
    const enteredStreetIsvalid = isEmpty(enteredStreet);
    const enteredCityIsValid = isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsvalid,
        city: enteredCityIsValid,
        postalcode: enteredPostalCodeIsValid
    });

    const isFormvalid = enteredNameIsValid && enteredCityIsValid && enteredPostalCodeIsValid && enteredStreetIsvalid;
    if(!isFormvalid){
        return;
    }
    props.onSubmitUserData({
        name: enteredName,
        street: enteredStreet,
        postalcode: enteredPostalCode,
        city:enteredCity
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalcode ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalCodeInputRef} type='text' id='postal' />
        {!formInputsValidity.postalcode && <p>Please enter a valid postal code</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputsValidity.city && <p>Please enter a valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;