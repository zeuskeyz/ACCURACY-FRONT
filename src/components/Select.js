
const Select = ({options, value, onChange, placeholder, selectCls}) => {
    return (
        <div>
            <select className={selectCls} value={value} onChange={onChange} >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select
