import { Link, useParams } from "react-router-dom";
import { patterns } from "../patterns";
import "react-tabs/style/react-tabs.css";

function normalize(str: string) {
    return str.toLowerCase().split(" ").join("-");
}

export default function PatternPage() {
    const { category, pattern: patternName } = useParams();

    console.log(patterns);

    const pattern = patterns.find(
        (pattern) => normalize(pattern.name) === patternName
    );

    return (
        <div className="m-auto max-w-200">
            <h1 className="font-bold text-4xl mb-8 md:text-5xl">
                {pattern?.name} Examples
            </h1>
            <div className="rounded-xl p-5 bg-slate-100">
                {pattern?.examples.map((example) => (
                    <div className="bg-slate-200 p-3  rounded-xl flex flex-col gap-3 mb-3">
                        <h3 className="text-2xl font-semibold font-mono">{example.name}</h3>
                        <p>{example.description}</p>
                        <Link
                            className="transition-all duration-200 hover:text-slate-500 py-1 px-4 italic bg-slate-300 rounded-full self-end"
                            to={`/${category}/${normalize(pattern.name)}/${
                                example.name
                            }`}
                        >
                            Check
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );

    // const { pattern: patternName, exampleName } = useParams();

    // const patternData = patterns.find(
    //     (pattern) =>
    //         pattern.name.toLowerCase().split(" ").join("-") === patternName
    // );

    // const examplePatternData = patternData?.examples.find(example => example.name === exampleName);

    // const roles = [
    //     ...new Set(examplePatternData?.elements.map((element) => element.role)),
    // ];

    // const [currentId, setCurrentId] = useState<string | undefined>(undefined);

    // function scrollTo(elementId: string) {
    //     const el = document.getElementById(elementId);
    //     if (!el) return;

    //     const offset = window.pageYOffset - 100
    //     const y = el.getBoundingClientRect().top + offset;
    //     window.scrollTo({ top: y, behavior: "smooth" });
    // }

    // return (
    //     <div>
    //         <h1 className="text-3xl font-bold md:text-5xl">
    //             {capitalize(patternName)} Pattern
    //         </h1>
    //         <p className="my-8">
    //             <strong>Click on the class/interface name</strong> in the code to be redirected to
    //             its source code.
    //         </p>
    //         <div className="flex flex-col gap-6 text-xs sm:text-sm md:text-lg">
    //             {roles.reverse().map((role) => (
    //                 <section className={`transform-all duration-400 p-4 ${examplePatternData?.elements.filter((element) => element.role === role).some(element => element.fileName === currentId) ? "shadow-(--shadow-card) p-4 rounded-xl" : "p-4"}`}>
    //                     <h2 className="text-2xl md:text-4xl mb-3">{role}</h2>
    //                     <Tabs>
    //                         <TabList>
    //                             {examplePatternData?.elements
    //                                 .filter((element) => element.role === role)
    //                                 .map((element, i) => (
    //                                     <Tab
    //                                         key={`${element.fileName}-${i}`}
    //                                         style={
    //                                             currentId === element.fileName
    //                                                 ? {
    //                                                       fontWeight: "bold",
    //                                                       backgroundColor:
    //                                                           "powderblue",
    //                                                   }
    //                                                 : {}
    //                                         }
    //                                     >
    //                                         <code id={element.fileName}>
    //                                             {element.fileName + `.ts`}
    //                                         </code>
    //                                     </Tab>
    //                                 ))}
    //                         </TabList>
    //                         {examplePatternData?.elements
    //                             .filter((element) => element.role === role)
    //                             .map((element, i) => (
    //                                 <TabPanel key={`${element.code}-${i}`}>
    //                                     <CodeBlock
    //                                         code={element.code}
    //                                         language="ts"
    //                                     >
    //                                         <CodeBlock.Code className="bg-black p-8 overflow-auto rounded-xl">
    //                                             <CodeBlock.LineContent>
    //                                                 <CodeBlock.Token>
    //                                                     {({ children }) => (
    //                                                         <span
    //                                                             className="cursor-pointer inline-block transition-all duration-300 hover:text-red-500 hover:-rotate-2 hover:-skew-x-4"
    //                                                             onClick={() => {
    //                                                                 scrollTo(
    //                                                                     (
    //                                                                         children as string
    //                                                                     ).trim()
    //                                                                 );
    //                                                                 setCurrentId(
    //                                                                     (
    //                                                                         children as string
    //                                                                     ).trim()
    //                                                                 );
    //                                                             }}
    //                                                         >
    //                                                             {children}
    //                                                         </span>
    //                                                     )}
    //                                                 </CodeBlock.Token>
    //                                             </CodeBlock.LineContent>
    //                                         </CodeBlock.Code>
    //                                     </CodeBlock>
    //                                 </TabPanel>
    //                             ))}
    //                     </Tabs>
    //                 </section>
    //             ))}
    //         </div>
    //     </div>
    // );
}
