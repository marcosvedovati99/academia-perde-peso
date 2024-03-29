import { Form, Input } from 'antd';
import { useState } from 'react';

function InputText(props) {
  const { label, onChange, validate, required, ...others } = props;

  const [errorMessage, setErrorMessage] = useState(null);
  const [changed, setChanged] = useState(null);

  const validateStatus = errorMessage ? 'error' : 'success';

  const handleValidation = (event) => {
    const { name, value } = event.target;
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
      <Input
        {...others}
        required={required}
        onChange={handleValidation}
        suffix={<span />}
      />
    </Form.Item>
  );
}

export default InputText;
