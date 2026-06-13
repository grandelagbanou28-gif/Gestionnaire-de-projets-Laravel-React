import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, icon: Icon, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="relative">
            {Icon && (
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
            )}
            <input
                {...props}
                type={type}
                className={`input-field ${Icon ? 'pl-10' : 'pl-3'} ${className}`}
                ref={input}
            />
        </div>
    );
});
