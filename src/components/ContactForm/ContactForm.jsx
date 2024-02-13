import { useState } from 'react';
import './ContactForm.module.css';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from '../../redux/contactSlice';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const { data: contacts } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const contact = { name, phone };
    const isExists = contacts.some(
      i => i.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExists) {
      alert(`${name} or ${phone} is already in contacts`);
    } else {
      addContact(contact);
    }
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Назва може містити лише літери, апостроф, тире та пробіли. Наприклад Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <input
        type="tel"
        name="number"
        value={phone}
        onChange={handleChange}
        placeholder="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефону має складатися з цифр і може містити пробіли, тире, круглі дужки та може починатися з +"
        required
      />

      <button type="submit">Add contact</button>
    </form>
  );
};
