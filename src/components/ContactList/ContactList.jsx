import './ContactList.module.css';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/filterSlice';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactSlice';

export const ContactList = () => {
  const filter = useSelector(getFilter);
  const { data: contacts, isFetching } = useGetContactsQuery();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const findContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = findContacts();

  return (
    <>
      {isFetching && <p>Loading...</p>}
      {contacts && (
        <ul>
          {filteredContacts.map(({ id, name, phone }) => {
            return (
              <li key={id}>
                <p>
                  {name}: {phone}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    deleteContact(id);
                  }}
                >
                  {isLoading ? '...' : 'Delete'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
