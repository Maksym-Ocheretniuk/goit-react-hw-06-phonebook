import React from 'react';

import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

import css from './App.module.css';

const App = () => {
  return (
    <div className={css.mainContainer}>
      <h1 className={css.title}>Phonebook</h1>

      <ContactForm />

      <h2 className={css.title}>Contacts</h2>

      <Filter />

      <ContactList />
    </div>
  );
};

export default App;
