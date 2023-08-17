import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import { nanoid } from '@reduxjs/toolkit';

import css from './ContactForm.module.css';

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const number = formData.get('number');

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));
    e.target.reset();
  };

  return (
    <form className={css.formContainer} onSubmit={handleSubmit}>
      <label className={css.formLabel}>
        Name
        <input
          className={css.formInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.formLabel}>
        Number
        <input
          className={css.formInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
