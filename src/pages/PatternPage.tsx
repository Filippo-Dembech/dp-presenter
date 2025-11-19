import { useParams } from "react-router-dom";
import { patterns } from "../patterns";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { CodeBlock } from "react-code-block";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";

function capitalize(str?: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function PatternPage() {
    const { pattern: patternName } = useParams();

    const patternData = patterns.find(
        (pattern) =>
            pattern.name.toLowerCase().split(" ").join("-") === patternName
    );
    const roles = [
        ...new Set(patternData?.elements.map((element) => element.role)),
    ];

    const [currentId, setCurrentId] = useState<string | undefined>(undefined);

    function scrollTo(elementId: string) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const offset = window.pageYOffset - 100
        const y = el.getBoundingClientRect().top + offset;
        window.scrollTo({ top: y, behavior: "smooth" });
    }

    return (
        <div>
            <h1 className="text-3xl font-bold md:text-5xl">
                {capitalize(patternName)} Pattern
            </h1>
            <p className="my-8">
                <strong>Click on the class/interface name</strong> in the code to be redirected to
                its source code.
            </p>
            <div className="flex flex-col gap-6 text-xs sm:text-sm md:text-lg">
                {roles.reverse().map((role) => (
                    <section className={`transform-all duration-400 p-4 ${patternData?.elements.filter((element) => element.role === role).some(element => element.fileName === currentId) ? "shadow-(--shadow-card) p-4 rounded-xl" : "p-4"}`}>
                        <h2 className="text-2xl md:text-4xl mb-3">{role}</h2>
                        <Tabs>
                            <TabList>
                                {patternData?.elements
                                    .filter((element) => element.role === role)
                                    .map((element, i) => (
                                        <Tab
                                            key={`${element.fileName}-${i}`}
                                            style={
                                                currentId === element.fileName
                                                    ? {
                                                          fontWeight: "bold",
                                                          backgroundColor:
                                                              "powderblue",
                                                      }
                                                    : {}
                                            }
                                        >
                                            <code id={element.fileName}>
                                                {element.fileName + `.ts`}
                                            </code>
                                        </Tab>
                                    ))}
                            </TabList>
                            {patternData?.elements
                                .filter((element) => element.role === role)
                                .map((element, i) => (
                                    <TabPanel key={`${element.code}-${i}`}>
                                        <CodeBlock
                                            code={element.code}
                                            language="ts"
                                        >
                                            <CodeBlock.Code className="bg-black p-8 overflow-auto rounded-xl">
                                                <CodeBlock.LineContent>
                                                    <CodeBlock.Token>
                                                        {({ children }) => (
                                                            <span
                                                                className="cursor-pointer inline-block transition-all duration-300 hover:text-red-500 hover:-rotate-2 hover:-skew-x-4"
                                                                onClick={() => {
                                                                    scrollTo(
                                                                        (
                                                                            children as string
                                                                        ).trim()
                                                                    );
                                                                    setCurrentId(
                                                                        (
                                                                            children as string
                                                                        ).trim()
                                                                    );
                                                                }}
                                                            >
                                                                {children}
                                                            </span>
                                                        )}
                                                    </CodeBlock.Token>
                                                </CodeBlock.LineContent>
                                            </CodeBlock.Code>
                                        </CodeBlock>
                                    </TabPanel>
                                ))}
                        </Tabs>
                    </section>
                ))}
            </div>
        </div>
    );
}
