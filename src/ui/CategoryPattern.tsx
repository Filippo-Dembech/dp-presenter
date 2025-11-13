import PatternLink from "./PatternLink";

interface CategoryPatternProps {
    name: string;
    patterns: string[];
}

function format(str: string) {
    return str.toLowerCase().split(" ").join("-");
}

export default function CategoryPattern({
    name,
    patterns,
}: CategoryPatternProps) {
    return (
        <section className="mt-4">
            <h2 className="text-2xl text-slate-700">{name}</h2>
            <ul className="pl-4 mt-4">
                {patterns.map((pattern) => (
                    <li>
                        <PatternLink
                            className="inline-block hover:-rotate-3 hover:scale-140 hover:skew-y-6"
                            patternName={pattern}
                            to={`${format(name)}/${format(pattern)}`}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}
