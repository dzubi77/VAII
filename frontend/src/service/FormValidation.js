import React from "react";
import { useEffect, useState } from "react";

function FormValidation(initialFormData, validateFn) {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async(e, submitFn) => {
        e.preventDefault();
        const isValid = await validateFn(formData, setError);
        if (isValid) {
            await submitFn(formData);
        }
    };

    return {
        formData, setFormData, error, handleChange, handleSubmit
    };
}

export default FormValidation;