import { Form, Select } from 'antd';
import { useState } from 'react';

function FormSelect(props) {
  const { name, label, onChange, validate, required, options, ...others } = props;

  const [errorMessage, setErrorMessage] = useState(null);
  const [changed, setChanged] = useState(null);

  const validateStatus = errorMessage ? 'error' : 'success';

  const handleValidation = (value) => {
    setChanged(true);
    let isValid = true;

    if (validate) {
      const message = validate(value);
      setErrorMessage(message);
      isValid = !message;
    }

    if (onChange) {
      onChange({
        name,
        input: {
          value,
          valid: isValid,
        },
      });
    }
  };

  return (
    <Form.Item
      validateStatus={validateStatus}
      label={label}
      help={errorMessage}
      hasFeedback={changed}
      required={required}
    >
      <Select
        {...others}
        defaultValue=""
        onChange={handleValidation}
        options={options}
      />
    </Form.Item>
  );
}

export default FormSelect;
