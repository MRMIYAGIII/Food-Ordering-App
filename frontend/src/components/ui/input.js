export const Input = ({ value, onChange, placeholder }) => {
    return (
      <input
        className="border px-4 py-2 rounded"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  };
  