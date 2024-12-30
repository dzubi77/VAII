import { useState } from "react";

function FormValidation(initialFormData, validateForm) {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async(e, submitForm) => {
        e.preventDefault();
        const isValid = await validateForm(formData, setError);
        if (isValid) {
            await submitForm(formData);
        }
    };

    return {
        formData, setFormData, error, handleChange, handleSubmit
    };
}

export default FormValidation;