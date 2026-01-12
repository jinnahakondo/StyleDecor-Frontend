const FormInput = ({
    label,
    name,
    type = "text",
    register,
    rules,
    error,
    placeholder,
}) => {

    return (
        <div>
            {/* Label */}
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 dark:text-white"
            >
                {label}
            </label>

            {/* Input */}
            <div className="mt-1">
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    {...register(name, rules)}
                    className={`block w-full appearance-none rounded-md border px-3 py-2 shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm
            dark:bg-gray-800 dark:text-white dark:placeholder-gray-300 
            ${error
                            ? "border-error focus:ring-error"
                            : "border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                        }
          `}
                />

                {/* Error */}
                {error && (
                    <p className="mt-1 text-sm text-error">
                        {error.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FormInput;
