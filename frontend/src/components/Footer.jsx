export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 border-t border-white/10 bg-[#1A1A2E] text-center">
      <p className="text-sm text-[#6B7280]">
        &copy; {currentYear}{' '}
        <span className="font-semibold text-[#C4B5FD]">Dhirendra Bhoi</span>
      </p>
    </footer>
  );
}
