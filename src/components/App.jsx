import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';

import contactsData from '../data/contactsData.json';

import css from './App.module.css';

// ! На ХУКах

export function App() {
  const [filter, setFilter] = useState('');

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [...contactsData];
  });

  // альтернатива componentDidMount(){}
  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    if (JSON.parse(contacts)) setContacts(JSON.parse(contacts));
  }, []);

  // альтернатива componentDidUpdate(_, prevState){}
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const newContact = { id: nanoid(), ...data };
    setContacts([...contacts, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
    setFilter('');
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className={css.mainContainer}>
      <h1 className={css.title}>Phonebook</h1>

      <ContactForm onSubmit={formSubmitHandler} contacts={contacts} />

      <h2 className={css.title}>Contacts</h2>

      <Filter value={filter} onChange={changeFilter} />

      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

// ! На КЛАСових КОМПОНЕНТах

// import { Component } from 'react';

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     if (JSON.parse(localStorage.getItem('contacts'))) {
//       this.setState({
//         contacts: JSON.parse(localStorage.getItem('contacts')),
//       });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   changeFilter = e => {
//     this.setState({ ...this.state, filter: e.target.value });
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//     this.setState({ filter: '' });
//   };

//   formSubmitHandler = data => {
//     const { contacts } = this.state;
//     const newContact = { id: nanoid(), ...data };

//     this.setState({ contacts: [...contacts, newContact] });
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     const visibleContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );

//     return (
//       <div className={css.mainContainer}>
//         <h1 className={css.title}>Phonebook</h1>

//         <ContactForm onSubmit={this.formSubmitHandler} contacts={contacts} />

//         <h2 className={css.title}>Contacts</h2>

//         <Filter value={filter} onChange={this.changeFilter} />

//         <ContactList
//           contacts={visibleContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }

// ! стандартна розмітка

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
