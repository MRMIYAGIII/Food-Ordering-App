export const Button = ({ children, variant = 'default', size = 'md', ...props }) => {
    const baseStyles = 'px-4 py-2 rounded';
    const variantStyles = variant === 'outline' ? 'border border-gray-300' : 'bg-blue-500 text-white';
    const sizeStyles = size === 'sm' ? 'text-sm' : 'text-lg';
  
    return (
      <button className={`${baseStyles} ${variantStyles} ${sizeStyles}`} {...props}>
        {children}
      </button>
    );
  };
  