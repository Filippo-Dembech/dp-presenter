import { CodeBlock } from "react-code-block";
import type { PatternElement } from "../patterns";

interface Props {
    element: PatternElement;
    onTokenClick: (token: string) => void;
}

export default function ElementCode({ element, onTokenClick }: Props) {
    return (
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
                                onClick={() =>
                                    onTokenClick((children as string).trim())
                                }
                            >
                                {children}
                            </span>
                        )}
                    </CodeBlock.Token>
                </CodeBlock.LineContent>
            </CodeBlock.Code>
        </CodeBlock>
    );
}
