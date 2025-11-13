import { Link } from "react-router-dom";

interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <Link to={"/"}>
            <img
                className={`w-30 cursor-pointer ${className}`}
                src="./logo.png"
                alt="logo"
            />
        </Link>
    );
}
