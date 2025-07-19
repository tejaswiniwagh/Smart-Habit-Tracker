// button.jsx
export default function Button({ children, ...props }) {
  return <button className="px-4 py-2 rounded bg-emerald-500 text-white hover:bg-emerald-600" {...props}>{children}</button>;
}
