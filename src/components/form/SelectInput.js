import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ErrorMessage from './ErrorMessage';

const mapValuesToFormOptions = (values) => {
  return values.map(({ id: value, name: label }) => ({
    value,
    label,
  }));
};

const mapFormOptionsToValues = (options) => {
  return options.map(({ value: id, label: name }) => ({
    id,
    name,
  }));
};

const SelectInput = ({ form, fieldName, label, options, values }) => {
  const [valuesSelected, setValuesSelected] = useState(values);

  const handleMultiChange = (selectedOptions) => {
    form.setValue(
      'authors',
      selectedOptions.map(({ value: id }) => `/api/authors/${id}`)
    );
    setValuesSelected(mapFormOptionsToValues(selectedOptions));
  };

  useEffect(() => {
    form.register({ name: 'authors' }); // custom register react-select
  }, [form]);

  const selectOptions = mapValuesToFormOptions(options);
  const optionsSelected = mapValuesToFormOptions(valuesSelected);

  return selectOptions ? (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <div>
        <Select
          name={fieldName}
          value={optionsSelected}
          options={selectOptions}
          onChange={handleMultiChange}
          isMulti
        />
        <ErrorMessage errors={form.errors} fieldName={fieldName} />
      </div>
    </>
  ) : (
    <div>Loading....</div>
  );
};

export default SelectInput;
