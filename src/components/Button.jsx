export default function Button({ title, type = "button", onClick, className = "" }) {
    const placeholder = "Click me";
    return (
        <button 
            type={type}
            onClick={onClick}
            className={`btn btn-gradient w-100 py-2 border-0 rounded-3 shadow-sm ${className}`}
        >
            {title ? title : placeholder}
        </button>
    );
}