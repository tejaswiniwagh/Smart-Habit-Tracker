export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all ${className}`}
    >
      {children}
    </div>
  );
}
