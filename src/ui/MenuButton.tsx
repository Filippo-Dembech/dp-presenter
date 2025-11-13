import type { ButtonHTMLAttributes } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function MenuButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className="cursor-pointer text-slate-400" {...props}><RxHamburgerMenu /></button>
    )
}