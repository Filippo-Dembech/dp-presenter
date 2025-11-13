interface BackdropProps {
    isOpen: boolean;
    onClick: () => void;
}

export default function Backdrop({ isOpen, onClick }: BackdropProps) {
    return (
            <div
                className={`absolute inset-0 bg-black transition-all duration-400 ${
                    isOpen
                        ? "opacity-30 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={onClick}
            ></div>
    )
}