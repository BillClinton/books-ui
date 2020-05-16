import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import ErrorMessage from './ErrorMessage';

/**
 * Change the API keynames to the keynames used react-select
 *
 * @param {array} options array of objects [{id: int, name: string}]
 * @returns {array} array of objects [{value: int, label: string}]
 */
const mapValuesToFormOptions = (values) => {
  return (
    values &&
    values.map(({ id: value, name: label }) => ({
      value,
      label,
    }))
  );
};

/**
 * Change the react-select keynames to the keynames used by the API READ
 *
 * @param {array} options array of objects [{value: int, label: string}]
 * @returns {array} array of objects [{id: int, name: string}]
 */
const mapFormOptionsToValues = (options) => {
  return (
    options &&
    options.map(({ value: id, label: name }) => ({
      id,
      name,
    }))
  );
};

/**
 * Change the react-select objects into the format used by the API post and patch.
 *
 * Existing authors will be represented by a string IRI and new authors will be
 * represented as an object eg. { name: string }
 *
 * @param {array} options array of objects [{value: int, label: string}]
 * @returns {array} array of authors
 */
const mapFormOptionsToFormValue = (options) => {
  if (!options) {
    return [];
  }
  return options.map(({ value: id }) => {
    // existing author
    if (Number.isInteger(id)) {
      return `/api/authors/${id}`;
    }
    // new author to be created
    return { name: id };
  });
};

const AuthorSelectInput = ({ form, label, options, values = [] }) => {
  const [valuesSelected, setValuesSelected] = useState(values);

  // convert options and selected options to key names used by react-select
  const selectOptions = mapValuesToFormOptions(options);
  const optionsSelected = mapValuesToFormOptions(valuesSelected);
  // const selectOptions = options;
  // const optionsSelected = valuesSelected;

  const handleMultiChange = (selectedOptions) => {
    // set form value to format used by API post/patch
    form.setValue('authors', mapFormOptionsToFormValue(selectedOptions));

    // update state with currently selected values
    setValuesSelected(mapFormOptionsToValues(selectedOptions));
    // setValuesSelected(selectedOptions);
  };

  useEffect(() => {
    form.register({ name: 'authors' });
    // map current options to form value in case select is never changed
    form.setValue('authors', mapFormOptionsToFormValue(optionsSelected));
  }, [form]);

  // const getOptionValue = (option) => {
  //   console.log(option);
  //   return option.id;
  // };

  // const getOptionLabel = (option) => {
  //   return option.name;
  // };

  // const isValidNewOption = (inputValue, selectValue, selectOptions) => {
  //   console.log('isValidNewOption');
  //   console.log(inputValue);
  //   console.log(selectValue);
  //   console.log(selectOptions);
  //   return true;
  // };

  return selectOptions ? (
    <>
      <label htmlFor="authors">{label}</label>
      <div>
        <CreatableSelect
          name="authors"
          value={optionsSelected}
          options={selectOptions}
          onChange={handleMultiChange}
          // getOptionLabel={getOptionLabel}
          // getOptionValue={getOptionValue}
          // isValidNewOption={isValidNewOption}
          isMulti
        />
        <ErrorMessage errors={form.errors} fieldName="authors" />
      </div>
    </>
  ) : (
    <div>Loading....</div>
  );
};

export default AuthorSelectInput;
