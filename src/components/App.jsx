import { GlobalStyle } from 'components/GlobalStyle';
import { useState } from 'react';
import { Box } from './Box';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { MainTitle, SecondTitle } from './App.styled';
import { useLocalStorage } from 'hooks/useLocalStorage';
  
export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    if (contacts.find(contact =>
      contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`Sorry, but ${name} is already in contacts!`)
      return;
    }
    const newContact = {
        id: nanoid(),
        name,
        number,
    };
    
    setContacts(prevState => [newContact, ...prevState]);
  }

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  }

    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter)
    })

    return <Box margin="50px auto 50px" padding="30px" width="500px" height="100%" border="normal" boxShadow="0px 4px 24px -1px rgba(0,0,0,0.75)" borderRadius="15px" backgroundColor="bgTable">
      <GlobalStyle/>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSubmit={addContact}/>
      <SecondTitle>Contacts</SecondTitle>
      <Filter text="Find contacts by name" onChange={changeFilter} />
      {contacts.length === 0 ? <div style={{ display: 'flex', justifyContent: 'center', padding: '20px'}}><h2>Add your first friend!</h2></div>
        : <ContactList visibleContacts={visibleContacts} deleteContact={deleteContact} />}
    </Box>

};