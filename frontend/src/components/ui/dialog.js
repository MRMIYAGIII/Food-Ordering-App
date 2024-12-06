export const Dialog = ({ open, children, onClose }) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded">{children}</div>
        <button onClick={onClose} className="absolute top-2 right-2">Close</button>
      </div>
    );
  };
  
  export const DialogContent = ({ children }) => <div>{children}</div>;
  export const DialogHeader = ({ children }) => <div className="text-xl">{children}</div>;
  export const DialogTitle = ({ children }) => <h2>{children}</h2>;
  export const DialogDescription = ({ children }) => <p>{children}</p>;
  export const DialogFooter = ({ children }) => <div>{children}</div>;
  