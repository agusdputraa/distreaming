/**
 * FormInput - Reusable form input component for auth forms
 */
function FormInput({ 
    label, 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    required = false,
    autoComplete
}) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {label}
                </label>
            )}
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
                className="w-full px-4 py-3 bg-[#333] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914] transition-colors"
            />
        </div>
    );
}

export default FormInput;
