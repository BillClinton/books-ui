import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BookStore } from '../../contexts/BookStore';
import TextInput from '../form/TextInput';
import SelectInput from '../form/SelectInput';
import history from '../../history';

const EditBookForm = ({ book, authors }) => {
  const form = useForm({ defaultValues: book });
  const { store } = useContext(BookStore);
  // const [authorsSelected, setAuthorsSelected] = useState(book.authors);

  const onCancel = () => history.push('/books');
  const onSubmit = (data, e) => {
    e.preventDefault();
    store.update(book.id, data);
  };
  // const mapValuesToFormOptions = (values) => {
  //   return values.map(({ id: value, name: label }) => ({
  //     value,
  //     label,
  //   }));
  // };
  // const mapFormOptionsToValues = (options) => {
  //   return options.map(({ value: id, label: name }) => ({
  //     id,
  //     name,
  //   }));
  // };

  // const handleMultiChange = (selectedOptions) => {
  //   form.setValue(
  //     'authors',
  //     selectedOptions.map(({ value: id }) => `/api/authors/${id}`)
  //   );
  //   setAuthorsSelected(mapFormOptionsToValues(selectedOptions));
  // };

  // useEffect(() => {
  //   form.register({ name: 'authors' }); // custom register react-select
  // }, [form]);

  // const options = mapValuesToFormOptions(authors);
  // const optionsSelected = mapValuesToFormOptions(authorsSelected);

  return book && authors ? (
    <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
      <h1>Edit book</h1>
      <TextInput
        form={form}
        fieldName="name"
        label="Name"
        validations={{ required: true }}
      />

      <SelectInput
        form={form}
        fieldName="authors"
        label="Author(s)"
        options={authors}
        values={book.authors}
      />

      <div className="buttons">
        <button className="submit">Submit</button>
        <button className="cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <div>Loading....</div>
  );
};

export default EditBookForm;
