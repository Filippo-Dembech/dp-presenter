interface Props {
    isSelected: boolean;
    children: React.ReactNode;
}

export default function SelectableSection({ isSelected, children }: Props) {
    return (
        <section
            className={`transform-all duration-400 p-4 ${
                isSelected ? "shadow-(--shadow-card) p-4 rounded-xl" : "p-4"
            }`}
        >
            {children}
        </section>
    );
}
