export default function AppFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="text-gray-800 font-medium font-mono text-sm bg-white bg-opacity-60 border-t
    "
    >
      <div className="flex justify-center items-center py-4 px-4 max-w-7xl mx-auto backdrop-blur">
        <p>Abeydev©. {currentYear}</p>
      </div>
    </footer>
  );
}
