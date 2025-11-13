import { useParams } from "react-router-dom"

export default function PatternPage() {
    const { pattern } = useParams();

    return (
        <div>{pattern}</div>
    )
}