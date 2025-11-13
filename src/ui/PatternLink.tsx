import { Link, type LinkProps } from "react-router-dom";

interface PatternLinkProps {
    patternName: string;
}

export default function PatternLink({
    patternName,
    ...rest
}: PatternLinkProps & LinkProps) {
    return (
        <Link
            className="hover:text-slate-600"
            {...rest}
        >
            {patternName}
        </Link>
    );
}
