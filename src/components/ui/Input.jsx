import './Input.css';

export const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    icon,
    prefix,
    suffix,
    disabled = false,
    required = false,
    name,
    id,
    className = ''
}) => {
    return (
        <div className={`input-group ${error ? 'input-error' : ''} ${className}`}>
            {label && (
                <label className="input-label" htmlFor={id || name}>
                    {label}
                    {required && <span className="input-required">*</span>}
                </label>
            )}
            <div className="input-wrapper">
                {icon && <span className="input-icon">{icon}</span>}
                {prefix && <span className="input-prefix">{prefix}</span>}
                <input
                    type={type}
                    id={id || name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={`input ${icon ? 'has-icon' : ''} ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''}`}
                />
                {suffix && <span className="input-suffix">{suffix}</span>}
            </div>
            {error && <span className="input-error-text">{error}</span>}
        </div>
    );
};
