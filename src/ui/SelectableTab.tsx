interface Props {
    isSelected: boolean;
    fileName: string;
}

export default function SelectableTab({ isSelected, fileName }: Props) {
    return (
        <code
            id={fileName}
            className="px-3 rounded-t-md"
            style={
                isSelected
                    ? {
                          fontWeight: "bold",
                          backgroundColor: "coral",
                      }
                    : {}
            }
        >
            {fileName + `.ts`}
        </code>
    );
}
