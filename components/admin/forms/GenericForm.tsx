import React, { useState } from 'react';

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'url' | 'datetime-local';
  required?: boolean;
}

interface GenericFormProps {
  fields: Field[];
  initialData?: any | null;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

const InputField: React.FC<{ field: Field; value: any; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; }> = ({ field, value, onChange }) => {
    const commonProps = {
        id: field.name,
        name: field.name,
        value: value || '',
        onChange: onChange,
        required: field.required,
        className: "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm",
    };

    if (field.type === 'textarea') {
        return <textarea {...commonProps} rows={4} />;
    }
    return <input type={field.type} {...commonProps} />;
};


const GenericForm: React.FC<GenericFormProps> = ({ fields, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    const defaultState: any = {};
    fields.forEach(field => {
      defaultState[field.name] = initialData?.[field.name] ?? '';
    });
    return defaultState;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldType = fields.find(f => f.name === name)?.type;

    setFormData(prev => ({
      ...prev,
      [name]: fieldType === 'number' && value !== '' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <InputField 
            field={field} 
            value={formData[field.name]} 
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300"
        >
          Batal
        </button>
        <button
          type="submit"
          className="bg-brand-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-brand-blue-700"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default GenericForm;