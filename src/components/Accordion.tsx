import { createContext, useContext, useEffect, useRef, useState } from "react";
import accordionArrow from '/accordion-arrow.svg'

interface AccordionContextType {
    currentHeader?: string;
    setHeader: (header?: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
    undefined
);

function useAccordion() {
    const context = useContext(AccordionContext);
    if (!context)
        throw new Error(
            "'useAccordion()' hook used outside 'AccordionContext'."
        );
    return context;
}

function Accordion({ children }: { children: React.ReactNode }) {
    const [currentHeader, setCurrentHeader] = useState<string | undefined>(
        undefined
    );

    function setHeader(header?: string) {
        setCurrentHeader(() => (currentHeader === header ? undefined : header));
    }

    return (
        <AccordionContext.Provider value={{ currentHeader, setHeader }}>
            {children}
        </AccordionContext.Provider>
    );
}

interface ItemProps {
    header: string;
    children: React.ReactNode;
}

function Item({ header, children }: ItemProps) {
    const { currentHeader, setHeader } = useAccordion();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent | TouchEvent) {
            if (!currentHeader) return;
            if (currentHeader !== header) return;
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setHeader(header)
            }
        }

        document.addEventListener("mouseup", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [currentHeader, setHeader, header]);

    const isCurrent = currentHeader === header;

    return (
        <div className="md:relative" ref={ref}>
            <button
                className="flex items-center w-full px-2 py-1 justify-between cursor-pointer"
                onClick={() => setHeader(header)}
            >
                <span>{header}</span>
                <img
                    src={accordionArrow}
                    className={`w-4 transition-transform duration-300 ml-1 ${
                        isCurrent ? "rotate-180" : "rotate-0"
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden rounded-xl text-sm transition-all duration-300 bg-slate-100 pl-4 md:absolute md:left-0 md:right-0 ${
                    isCurrent ? "max-h-96 py-2" : "max-h-0 py-0"
                }`}
            >
                {children}
            </div>
        </div>
    );
}

Accordion.Item = Item;

export default Accordion;
