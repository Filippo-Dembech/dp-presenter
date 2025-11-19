import Accordion from "../components/Accordion";
import { useState } from "react";
import MenuButton from "../ui/MenuButton";
import { MdOutlineCancel } from "react-icons/md";
import Backdrop from "../components/Backdrop";
import Logo from "./Logo";
import PatternLink from "./PatternLink";

export default function Navbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    function hideNavbar() {
        setIsNavbarOpen(false);
    }

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
                className={`z-20 fixed left-0 right-0 top-0 pt-8 pb-4 px-3 rounded-b-2xl shadow-sm transition-transform duration-400 bg-white md:flex md:justify-center md:translate-0 md:static md:rounded-none md:p-2 ${
                    isNavbarOpen ? "translate-y-0" : "-translate-y-200"
                }`}
            >
                <Logo className="hidden md:inline-block md:absolute md:left-4 md:top-1/2 md:-translate-y-1/2" />
                <button
                    onClick={() => setIsNavbarOpen((curr) => !curr)}
                    className="fixed top-4 right-5 text-slate-400 cursor-pointer md:hidden"
                >
                    <MdOutlineCancel />
                </button>
                <Accordion>
                    <Accordion.Item header="Creational Patterns">
                        <ul className="flex flex-col">
                            <PatternLink
                                patternName="Factory Method"
                                to={"/creational-patterns/factory-method"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Abstract Factory"
                                to={"/creational-patterns/abstract-factory"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Builder"
                                to={"/creational-patterns/builder"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Prototype"
                                to={"/creational-patterns/prototype"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Singleton"
                                to={"/creational-patterns/singleton"}
                                onClick={hideNavbar}
                            />
                        </ul>
                    </Accordion.Item>
                    <Accordion.Item header="Structural Patterns">
                        <ul className="flex flex-col">
                            <PatternLink
                                patternName="Adapter"
                                to={"/structural-patterns/adapter"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Bridge"
                                to={"/structural-patterns/bridge"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Composite"
                                to={"/structural-patterns/composite"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Decorator"
                                to={"/structural-patterns/decorator"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Facade"
                                to={"/structural-patterns/facade"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Flyweight"
                                to={"/structural-patterns/flyweight"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Proxy"
                                to={"/structural-patterns/proxy"}
                                onClick={hideNavbar}
                            />
                        </ul>
                    </Accordion.Item>

                    <Accordion.Item header="Behavioral Patterns">
                        <ul className="flex flex-col">
                            <PatternLink
                                patternName="Chain of Responsibility"
                                to={
                                    "/behavioral-patterns/chain-of-responsibility"
                                }
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Command"
                                to={"/behavioral-patterns/command"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Iterator"
                                to={"/behavioral-patterns/iterator"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Mediator"
                                to={"/behavioral-patterns/mediator"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Memento"
                                to={"/behavioral-patterns/memento"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Observer"
                                to={"/behavioral-patterns/observer"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="State"
                                to={"/behavioral-patterns/state"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Strategy"
                                to={"/behavioral-patterns/strategy"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Template Method"
                                to={"/behavioral-patterns/template-method"}
                                onClick={hideNavbar}
                            />
                            <PatternLink
                                patternName="Visitor"
                                to={"/behavioral-patterns/visitor"}
                                onClick={hideNavbar}
                            />
                        </ul>
                    </Accordion.Item>
                </Accordion>
            </nav>
        </div>
    );
}
