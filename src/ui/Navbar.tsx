import Accordion from "../ui/Accordion";
import { useState } from "react";
import MenuButton from "../ui/MenuButton";
import { MdOutlineCancel } from "react-icons/md";
import Backdrop from "./Backdrop";
import Logo from "./Logo";

export default function Navbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    return (
        <div>
            <div className="flex relative justify-between py-3 px-4 shadow-sm md:hidden">
                <Logo />
                <MenuButton onClick={() => setIsNavbarOpen((curr) => !curr)} />
            </div>
            <Backdrop
                isOpen={isNavbarOpen}
                onClick={() => setIsNavbarOpen((curr) => !curr)}
            />
            <nav
                className={`fixed left-0 right-0 top-0 pt-8 pb-4 px-3 rounded-b-2xl shadow-sm transition-transform duration-400 bg-white md:flex md:justify-center md:translate-0 md:static md:rounded-none md:p-2 ${
                    isNavbarOpen ? "translate-y-0" : "-translate-y-200"
                }`}
            >
                <Logo className="hidden md:inline-block md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2"/>
                <button
                    onClick={() => setIsNavbarOpen((curr) => !curr)}
                    className="fixed top-4 right-5 text-slate-400 cursor-pointer md:hidden"
                >
                    <MdOutlineCancel />
                </button>
                <Accordion>
                    <Accordion.Item header="Creational Patterns">
                        <ul>
                            <li>Factory Method</li>
                            <li>Abstract Factory</li>
                            <li>Builder</li>
                            <li>Prototype</li>
                            <li>Singleton</li>
                        </ul>
                    </Accordion.Item>
                    <Accordion.Item header="Structural Patterns">
                        <ul>
                            <li>Adapter</li>
                            <li>Bridge</li>
                            <li>Composite</li>
                            <li>Decorator</li>
                            <li>Facade</li>
                            <li>Flyweight</li>
                            <li>Proxy</li>
                        </ul>
                    </Accordion.Item>
                    <Accordion.Item header="Behavioral Patterns">
                        <ul>
                            <li>Chain of Responsibility</li>
                            <li>Command</li>
                            <li>Iterator</li>
                            <li>Mediator</li>
                            <li>Memento</li>
                            <li>Observer</li>
                            <li>State</li>
                            <li>Strategy</li>
                            <li>Template Method</li>
                            <li>Visitor</li>
                        </ul>
                    </Accordion.Item>
                </Accordion>
            </nav>
        </div>
    );
}
