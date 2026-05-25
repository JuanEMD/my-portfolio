const Modal = ({ title, onClose, children }) => (
    <div
        className="fixed inset-0 bg-black/60 [backdrop-filter:blur(6px)] z-[100] flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={title}
    >
        <div
            className="bg-background border border-[#3F5F7B] rounded-2xl w-full max-w-[580px] max-h-[78vh] overflow-hidden flex flex-col animate-scale-in shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#3F5F7B]/20 shrink-0">
                <span className="text-[0.95rem] font-bold text-primary tracking-[0.02em]">{title}</span>
                <button
                    className="w-7 h-7 rounded-full border border-[#3F5F7B]/30 bg-transparent text-primary cursor-pointer flex items-center justify-center transition-colors duration-150 hover:bg-[#3F5F7B]/[0.12]"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
            <div className="overflow-y-auto px-6 py-5">{children}</div>
        </div>
    </div>
);

export default Modal;
