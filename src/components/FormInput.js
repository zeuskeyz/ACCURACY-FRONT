
export const FormInput = (
  { label, name, type, value, onChange, required = false, options = [], readOnly = false, placeholder = '' }) => {
  
  const inputClasses = "form-control focus shadow-none";

  const selectCls = `form-select focus shadow-none ${('border')}`

  if (type === 'select') {
    return (
      <div className="form-floating mb-3">
        <select className= {selectCls} name={name} value={value} onChange={onChange} required={required} >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }

  return (
    <div className="form-floating mb-3">
      <input type={type} className={inputClasses} name={name} value={value} onChange={onChange} required={required} readOnly={readOnly} />
      <label htmlFor={name}>{label}</label>
    </div>
  );

};
