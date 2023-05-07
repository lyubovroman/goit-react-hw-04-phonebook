import React, {useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import  ContactForm  from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { AppContainer, ContactSection, ContactTitle } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts'))??[]);
  const [filter, setFilter] = useState('');
  // const [visibleContacts, setVisibleContacts] = useState(0);


  // state = {
  //   contacts: [
  //     { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  //     { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  //     { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  //   componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState);
  //   console.log(this.state);
  //   if (prevState.contacts !== this.state.contacts) {
  //     console.log('Обновилось поле contacts');
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

    useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

const formSubmitHandler = data => {
    setContacts(prevState => [
      ...prevState,
      { ...data, id: nanoid() }
    ]);
  };

 const onFilter = event => {
  setFilter(event.currentTarget.value)
  };

  const visibleContacts = (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

 const deleteContact = contactId => {
  setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
};



    return (
      <AppContainer>
        <ContactForm onSubmit={formSubmitHandler} contacts={contacts} />
        <ContactSection>
          <ContactTitle>Contacts</ContactTitle>
          <Filter value={filter} onFilter={onFilter} />
         <ContactList contacts={visibleContacts(contacts, filter)} onDeleteContact={deleteContact} />
        </ContactSection>
      </AppContainer>
    );
  }
