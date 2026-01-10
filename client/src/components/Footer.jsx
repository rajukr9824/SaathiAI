const Footer = () => {
  return (
    <footer className="h-10 shrink-0 flex items-center justify-center text-[10px] sm:text-xs text-slate-500 bg-slate-950 border-t border-slate-900 pb-[env(safe-area-inset-bottom)]">
      © {new Date().getFullYear()} SaathiAI • POWERED BY AI
    </footer>
  );
};

export default Footer;