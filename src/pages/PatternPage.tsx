import { useParams } from "react-router-dom";
import { patterns } from "../patterns";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { CodeBlock } from "react-code-block";
import "react-tabs/style/react-tabs.css";

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

    return (
        <div>
            <h1 className="text-3xl font-bold md:text-5xl mb-8">
                {capitalize(patternName)} Pattern
            </h1>
            <div className="flex flex-col gap-6 text-xs sm:text-sm md:text-lg">
                {roles.reverse().map((role) => (
                    <section>
                        <h2 className="text-2xl md:text-4xl mb-3">{role}</h2>
                        <Tabs>
                            <TabList>
                                {patternData?.elements
                                    .filter((element) => element.role === role)
                                    .map((element) => (
                                        <Tab>
                                            <code>
                                                {element.fileName + `.ts`}
                                            </code>
                                        </Tab>
                                    ))}
                            </TabList>
                        {patternData?.elements
                            .filter((element) => element.role === role)
                            .map((element) => (
                                <TabPanel>
                                    <CodeBlock
                                        code={element.code}
                                        language="ts"
                                    >
                                        <CodeBlock.Code className="bg-black p-8 overflow-auto rounded-xl">
                                            <CodeBlock.LineContent>
                                                <CodeBlock.Token />
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
