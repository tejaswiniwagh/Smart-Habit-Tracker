export default function Greeting({ name = 'Ravi' }) {
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <h2 className="greeting-message">
      👋 {greet}, {name}! Keep crushing your habits 💪
    </h2>
  );
}
