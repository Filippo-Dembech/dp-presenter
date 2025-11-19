import { useParams } from "react-router-dom";
import {
    findElementByFilename,
    getElementsByRole,
    getRoles,
    patterns,
    type PatternElement,
} from "../patterns";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import ElementCode from "../ui/ElementCode";
import SelectableSection from "../ui/SelectableSection";
import SelectableTab from "../ui/SelectableTab";

function capitalize(str?: string) {
    if (!str) return "";
    return str
        .split(" ")
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
}

export default function PatternExamplePage() {
    const { pattern: patternName, exampleName } = useParams();

    const [currentElement, setCurrentElement] = useState<
        PatternElement | undefined
    >(undefined);

    const patternData = patterns.find(
        (pattern) =>
            pattern.name.toLowerCase().split(" ").join("-") === patternName
    );

    const examplePatternData = patternData?.examples.find(
        (example) => example.name === exampleName
    );

    const roles = getRoles(examplePatternData?.elements);

    function scrollTo(elementId: string) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const offset = window.pageYOffset - 100;
        const y = el.getBoundingClientRect().top + offset;
        window.scrollTo({ top: y, behavior: "smooth" });
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3 md:text-5xl">
                {capitalize(patternName)} Pattern
            </h1>
            <h2 className="text-xl text-slate-600">
                {capitalize(exampleName)} Example
            </h2>
            <div className="mt-7 mb-2">
                <p>
                    <strong>Click on the class/interface name</strong> in the
                    code to be redirected to its source code.
                </p>
                <p>
                    The tabs with the blue dot -{" "}
                    <span className="w-3 h-3 inline-block border-5 sm:border-7 rounded-full border-blue-500"></span>{" "}
                    - in the top-left corner are abstract classes or interfaces.
                </p>
            </div>
            <div className="flex flex-col gap-6 text-xs sm:text-sm">
                {roles.reverse().map((role) => (
                    <SelectableSection
                        isSelected={getElementsByRole(
                            examplePatternData!.elements,
                            role
                        ).some(
                            (element) =>
                                element.fileName === currentElement?.fileName
                        )}
                    >
                        <h2 className="text-2xl md:text-4xl mb-3">{role}</h2>
                        <Tabs>
                            <TabList>
                                {getElementsByRole(
                                    examplePatternData!.elements,
                                    role
                                ).map((element, i) => (
                                    <Tab
                                        key={`${element.fileName}-${i}`}
                                        className={`inline-flex rounded-t-md cursor-pointer relative ${
                                            element.isInterface
                                                ? "before:content-[''] before:absolute before:-top-1 before:-left-1  before:border-5 sm:before:border-7 before:rounded-full before:border-blue-500"
                                                : ""
                                        }`}
                                        selectedClassName="bg-blue-200"
                                    >
                                        <SelectableTab
                                            fileName={element.fileName}
                                            isSelected={
                                                element.fileName ===
                                                currentElement?.fileName
                                            }
                                        />
                                    </Tab>
                                ))}
                            </TabList>
                            {getElementsByRole(
                                examplePatternData!.elements,
                                role
                            ).map((element, i) => (
                                <TabPanel key={`${element.code}-${i}`}>
                                    <ElementCode
                                        key={`${element.code}-${i}`}
                                        element={element}
                                        onTokenClick={(token) => {
                                            scrollTo(token);
                                            setCurrentElement(
                                                findElementByFilename(
                                                    examplePatternData!
                                                        .elements,
                                                    token
                                                )
                                            );
                                        }}
                                    />
                                </TabPanel>
                            ))}
                        </Tabs>
                    </SelectableSection>
                ))}
            </div>
        </div>
    );
}
