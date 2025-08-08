// src/LoginForm.jsx
import { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";

const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
  accepted: false,
};

const errorMessages = {
  ad: "Ad en az 3 karakter olmalı.",
  soyad: "Soyad en az 3 karakter olmalı.",
  email: "Geçerli bir eposta adresi giriniz.",
  password:
    "Şifre en az 8 karakter olmalı ve en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.",
  accepted: "Şartları kabul etmelisiniz.",
};

export default function LoginForm() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  useEffect(() => {
    const newErrors = {};

    if (formData.ad.trim().length < 3) newErrors.ad = errorMessages.ad;
    if (formData.soyad.trim().length < 3)
      newErrors.soyad = errorMessages.soyad;
    if (!emailRegex.test(formData.email))
      newErrors.email = errorMessages.email;
    if (!passwordRegex.test(formData.password))
      newErrors.password = errorMessages.password;
    if (!formData.accepted) newErrors.accepted = errorMessages.accepted;

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      alert("Giriş başarılı");
    }
  };

  return (
    <Form onSubmit={handleSubmit} data-testid="login-form">
      <FormGroup>
        <Label for="ad">Ad</Label>
        <Input
          id="ad"
          name="ad"
          value={formData.ad}
          onChange={handleChange}
          invalid={!!errors.ad}
        />
        <FormFeedback>{errors.ad}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="soyad">Soyad</Label>
        <Input
          id="soyad"
          name="soyad"
          value={formData.soyad}
          onChange={handleChange}
          invalid={!!errors.soyad}
        />
        <FormFeedback>{errors.soyad}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          invalid={!!errors.email}
        />
        <FormFeedback>{errors.email}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="password">Şifre</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          invalid={!!errors.password}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>

      <FormGroup check>
        <Input
          id="accepted"
          name="accepted"
          type="checkbox"
          checked={formData.accepted}
          onChange={handleChange}
        />
        <Label for="accepted" check>
          Şartları kabul ediyorum
        </Label>
        {errors.accepted && (
          <div style={{ color: "red", fontSize: "0.8rem", marginTop: "0.25rem" }}>
            {errors.accepted}
          </div>
        )}
      </FormGroup>

      <Button
        type="submit"
        color="primary"
        disabled={!isValid}
        style={{ marginTop: "1rem" }}
      >
        Giriş Yap
      </Button>
    </Form>
  );
}
