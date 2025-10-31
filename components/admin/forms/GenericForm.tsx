import React, { useState } from 'react';

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'url' | 'datetime-local' | 'checkbox' | 'select';
  required?: boolean;
  rows?: number;
  options?: string[];
}

interface GenericFormProps {
  fields: Field[];
  initialData?: any | null;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

const InputField: React.FC<{ field: Field; value: any; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; }> = ({ field, value, onChange }) => {
    const commonProps = {
        id: field.name,
        name: field.name,
        onChange: onChange,
        required: field.required,
    };

    if (field.type === 'textarea') {
        return <textarea {...commonProps} value={value || ''} rows={field.rows || 4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm" />;
    }
    
    if (field.type === 'checkbox') {
        return (
            <div className="mt-2">
                 <input {...commonProps} type="checkbox" checked={!!value} className="h-4 w-4 text-brand-blue-600 border-gray-300 rounded focus:ring-brand-blue-500" />
            </div>
        );
    }
    
    if (field.type === 'select') {
        return (
             <select {...commonProps} value={value || ''} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm">
                <option value="" disabled>Pilih salah satu</option>
                {field.options?.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
            </select>
        );
    }

    return <input type={field.type} {...commonProps} value={value || ''} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm" />;
};


const GenericForm: React.FC<GenericFormProps> = ({ fields, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    const defaultState: any = {};
    fields.forEach(field => {
        if(field.type === 'checkbox') {
            defaultState[field.name] = initialData?.[field.name] ?? false;
        } else {
            defaultState[field.name] = initialData?.[field.name] ?? '';
        }
    });
    return defaultState;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    const fieldType = fields.find(f => f.name === name)?.type;

    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : (fieldType === 'number' && value !== '' ? Number(value) : value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.name} className={field.type === 'checkbox' ? 'flex items-center' : ''}>
          <label htmlFor={field.name} className={`block text-sm font-medium text-gray-700 ${field.type === 'checkbox' ? 'mr-3' : ''}`}>
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