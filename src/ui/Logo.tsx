interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <img
            className={`w-30 ${className}`}
            src="./logo.png"
            alt="logo"
        />
    );
}
