export const Card = ({ children, className }) => (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
  
  export const CardHeader = ({ children }) => (
    <div className="px-4 py-2 border-b">{children}</div>
  );
  
  export const CardTitle = ({ children }) => (
    <h3 className="text-xl font-semibold">{children}</h3>
  );
  
  export const CardContent = ({ children }) => (
    <div className="px-4 py-2">{children}</div>
  );
  