import { Link, type LinkProps } from "react-router-dom";

interface PatternLinkProps {
    patternName: string;
}

export default function PatternLink({
    patternName,
    className,
    ...rest
}: PatternLinkProps & LinkProps) {
    return (
        <Link
            className={`transition-all duration-200 hover:text-slate-500 ${className || ""}`}
            {...rest}
        >
            {patternName}
        </Link>
    );
}
