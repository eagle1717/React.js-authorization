import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export default function FormContainer(props) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [btnWasClicked, setClick] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const inputsArray = {
    email: {
      controlId: "formBasicEmail",
      name: "email",
      type: "email",
      label: "E-mail",
      placeholder: "E-mail",
    },
    password: {
      controlId: "formBasicPassword",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
    },
  };

  const findFormErrors = () => {
    const newErrors = {};
    if (props.form.includes("email")) {
      if (!form.email || form.email.trim().length === 0)
        newErrors.email = "The field is empty.";
    }
    if (props.form.includes("password")) {
      if (!form.password || form.password.trim().length === 0) {
        newErrors.password = "The field is empty.";
      } else if (
        form.password &&
        form.password.trim().length > 0 &&
        form.password.trim().length < 8
      )
        newErrors.password = "Password must contain at least 8 characters.";
    }

    return newErrors;
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setClick(true);
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        await props.onSubmit(form);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (btnWasClicked) {
      const newErrors = findFormErrors();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        setErrors({});
      }
    }
  }, [form, btnWasClicked]);

  return (
    <Form onSubmit={onSubmit}>
      <h3 className="text-dark mb-4">{props.title}</h3>
      {props.form.map((f) => {
        return (
          <Form.Group
            className="mb-3"
            key={inputsArray[f].name}
            controlId={inputsArray[f].controlId}
          >
            <Form.Label>{inputsArray[f].label}</Form.Label>
            <Form.Control
              type={inputsArray[f].type}
              placeholder={inputsArray[f].placeholder}
              isInvalid={!!errors[f]}
              onChange={(e) => setField(inputsArray[f].name, e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {errors[f]}
            </Form.Control.Feedback>
          </Form.Group>
        );
      })}
      {props.children}
      <Button
        variant="primary"
        type="submit"
        className="mt-3"
        disabled={isLoading}
      >
        {props.button}
      </Button>
    </Form>
  );
}
