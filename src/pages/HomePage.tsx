import CategoryPattern from "../ui/CategoryPattern";

export default function HomePage() {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-wide md:text-5xl">Design Patterns Presenter</h1>
            <CategoryPattern
                name="Creational Patterns"
                patterns={[
                    "Factory Method",
                    "Abstract Factory",
                    "Builder",
                    "Prototype",
                    "Singleton"
                ]}
            />
            <CategoryPattern
                name="Structural Patterns"
                patterns={[
                    "Adapter",
                    "Bridge",
                    "Composite",
                    "Decorator",
                    "Facade",
                    "Flyweight",
                    "Proxy",
                ]}
            />
            <CategoryPattern
                name="Behavioral Patterns"
                patterns={[
                    "Chain of Responsibility",
                    "Command",
                    "Iterator",
                    "Mediator",
                    "Memento",
                    "Observer",
                    "State",
                    "Strategy",
                    "Template Method",
                    "Visitor"
                ]}
            />
        </div>
    )
}