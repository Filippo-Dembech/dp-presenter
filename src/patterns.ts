export interface PatternElement {
    role: string;
    fileName: string;
    code: string;
    isInterface: boolean;
}

interface PatternExample {
    name: string;
    description: string;
    elements: PatternElement[];
}

interface Pattern {
    name: string;
    examples: PatternExample[];
}

export const patterns: Pattern[] = [
    {
        name: "Factory Method",
        examples: [
            {
                name: "Notifications",
                description:
                    "Creates different types of notifications (email, SMS, etc.) without the client depending on which one is used.",
                elements: [
                    {
                        role: "Product",
                        fileName: "Notification",
                        isInterface: true,
                        code: `interface Notification {
  send(message: string): void;
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "EmailNotification",
                        isInterface: false,
                        code: `class EmailNotification implements Notification {
  send(message: string) {
    console.log(\`Sending email with message: "\${message}"\`);
  }
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "SMSNotification",
                        isInterface: false,
                        code: `class SMSNotification implements Notification {
  send(message: string) {
    console.log(\`Sending SMS with message: "\${message}"\`);
  }
}`,
                    },
                    {
                        role: "Creator",
                        fileName: "NotificationFactory",
                        isInterface: true,
                        code: `abstract class NotificationFactory {
  abstract createNotification(): Notification;

  // optional: common logic using the product
  notify(message: string) {
    const notification = this.createNotification();
    notification.send(message);
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "EmailNotificationFactory",
                        isInterface: false,
                        code: `class EmailNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new EmailNotification();
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "SMSNotificationFactory",
                        isInterface: false,
                        code: `class SMSNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new SMSNotification();
  }
}`,
                    },
                    {
                        role: "Usage",
                        fileName: "main",
                        isInterface: false,
                        code: `const factories: NotificationFactory[] = [
  new EmailNotificationFactory(),
  new SMSNotificationFactory(),
];

factories.forEach(factory => factory.notify("Hello Factory Method!"));`,
                    },
                ],
            },
            {
                name: "Loggers",
                description:
                    "Create different logger implementations without the client knowing the concrete type.",
                elements: [
                    {
                        role: "Product",
                        fileName: "Logger",
                        isInterface: true,
                        code: `interface Logger {
  log(msg: string): void;
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "ConsoleLogger",
                        isInterface: false,
                        code: `class ConsoleLogger implements Logger {
  log(msg: string) {
    console.log("[Console]", msg);
  }
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "FileLogger",
                        isInterface: false,
                        code: `class FileLogger implements Logger {
  log(msg: string) {
    console.log("[File] Writing:", msg);
  }
}`,
                    },
                    {
                        role: "Creator",
                        fileName: "LoggerFactory",
                        isInterface: true,
                        code: `abstract class LoggerFactory {
  abstract createLogger(): Logger;

  write(msg: string) {
    const logger = this.createLogger();
    logger.log(msg);
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "ConsoleLoggerFactory",
                        isInterface: false,
                        code: `class ConsoleLoggerFactory extends LoggerFactory {
  createLogger(): Logger {
    return new ConsoleLogger();
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "FileLoggerFactory",
                        isInterface: false,
                        code: `class FileLoggerFactory extends LoggerFactory {
  createLogger(): Logger {
    return new FileLogger();
  }
}`,
                    },
                    {
                        role: "Usage",
                        fileName: "main",
                        isInterface: false,
                        code: `const loggers: LoggerFactory[] = [
  new ConsoleLoggerFactory(),
  new FileLoggerFactory(),
];

loggers.forEach(l => l.write("Factory Method FTW!"));`,
                    },
                ],
            },
            {
                name: "Shapes",
                description:
                    "Produce different shapes without exposing the concrete implementations to the client.",
                elements: [
                    {
                        role: "Product",
                        fileName: "Shape",
                        isInterface: true,
                        code: `interface Shape {
  draw(): void;
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "Circle",
                        isInterface: false,
                        code: `class Circle implements Shape {
  draw() {
    console.log("Drawing a Circle");
  }
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "Square",
                        isInterface: false,
                        code: `class Square implements Shape {
  draw() {
    console.log("Drawing a Square");
  }
}`,
                    },
                    {
                        role: "Creator",
                        fileName: "ShapeFactory",
                        isInterface: true,
                        code: `abstract class ShapeFactory {
  abstract createShape(): Shape;

  render() {
    const shape = this.createShape();
    shape.draw();
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "CircleFactory",
                        isInterface: false,
                        code: `class CircleFactory extends ShapeFactory {
  createShape(): Shape {
    return new Circle();
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "SquareFactory",
                        isInterface: false,
                        code: `class SquareFactory extends ShapeFactory {
  createShape(): Shape {
    return new Square();
  }
}`,
                    },
                    {
                        role: "Usage",
                        fileName: "main",
                        isInterface: false,
                        code: `const factories: ShapeFactory[] = [
  new CircleFactory(),
  new SquareFactory(),
];

factories.forEach(f => f.render());`,
                    },
                ],
            },
            {
                name: "SQL Query Builder",
                description:
                    "Creates different SQL builders depending on the database engine without the client caring about the specific implementation.",
                elements: [
                    {
                        role: "Product",
                        fileName: "QueryBuilder",
                        isInterface: true,
                        code: `export interface QueryBuilder {
  select(table: string): string;
  insert(table: string, data: Record<string, any>): string;
  update(table: string, data: Record<string, any>, where: string): string;
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "MySQLQueryBuilder",
                        isInterface: false,
                        code: `import { QueryBuilder } from "./QueryBuilder";

export class MySQLQueryBuilder implements QueryBuilder {
  constructor(private config: { host: string; user: string }) {}

  select(table: string) {
    return \`SELECT * FROM \\\`\${table}\\\`;\`;
  }

  insert(table: string, data: Record<string, any>) {
    const cols = Object.keys(data).map(k => \`\\\`\${k}\\\`\`).join(", ");
    const vals = Object.values(data).map(v => \`'\${v}'\`).join(", ");
    return \`INSERT INTO \\\`\${table}\\\` (\${cols}) VALUES (\${vals});\`;
  }

  update(table: string, data: Record<string, any>, where: string) {
    const pairs = Object.entries(data)
      .map(([k, v]) => \`\\\`\${k}\\\`='\${v}'\`)
      .join(", ");
    return \`UPDATE \\\`\${table}\\\` SET \${pairs} WHERE \${where};\`;
  }
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "PostgresQueryBuilder",
                        isInterface: false,
                        code: `import { QueryBuilder } from "./QueryBuilder";

export class PostgresQueryBuilder implements QueryBuilder {
  constructor(private config: { ssl: boolean }) {}

  select(table: string) {
    return \`SELECT * FROM "\${table}";\`;
  }

  insert(table: string, data: Record<string, any>) {
    const cols = Object.keys(data).map(k => \`"\${k}"\`).join(", ");
    const vals = Object.values(data).map(v => \`'\${v}'\`).join(", ");
    return \`INSERT INTO "\${table}" (\${cols}) VALUES (\${vals});\`;
  }

  update(table: string, data: Record<string, any>, where: string) {
    const pairs = Object.entries(data)
      .map(([k, v]) => \`"\${k}"='\${v}'\`)
      .join(", ");
    return \`UPDATE "\${table}" SET \${pairs} WHERE \${where};\`;
  }
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "SQLiteQueryBuilder",
                        isInterface: false,
                        code: `import { QueryBuilder } from "./QueryBuilder";

export class SQLiteQueryBuilder implements QueryBuilder {
  select(table: string) {
    return \`SELECT * FROM \${table};\`;
  }

  insert(table: string, data: Record<string, any>) {
    const cols = Object.keys(data).join(", ");
    const vals = Object.values(data).map(v => \`'\${v}'\`).join(", ");
    return \`INSERT INTO \${table} (\${cols}) VALUES (\${vals});\`;
  }

  update(table: string, data: Record<string, any>, where: string) {
    const pairs = Object.entries(data)
      .map(([k, v]) => \`\${k}='\${v}'\`)
      .join(", ");
    return \`UPDATE \${table} SET \${pairs} WHERE \${where};\`;
  }
}`,
                    },
                    {
                        role: "Creator",
                        fileName: "QueryBuilderFactory",
                        isInterface: true,
                        code: `import { QueryBuilder } from "./QueryBuilder";

export abstract class QueryBuilderFactory {
  abstract create(): QueryBuilder;

  buildSelect(table: string) {
    return this.create().select(table);
  }

  buildInsert(table: string, data: Record<string, any>) {
    return this.create().insert(table, data);
  }

  buildUpdate(table: string, data: Record<string, any>, where: string) {
    return this.create().update(table, data, where);
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "MySQLFactory",
                        isInterface: false,
                        code: `import { QueryBuilderFactory } from "./QueryBuilderFactory";
import { MySQLQueryBuilder } from "./MySQLQueryBuilder";

export class MySQLFactory extends QueryBuilderFactory {
  constructor(private config: { host: string; user: string }) {
    super();
  }

  create() {
    if (!this.config.host) throw new Error("Missing MySQL host");
    return new MySQLQueryBuilder(this.config);
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "PostgresFactory",
                        isInterface: false,
                        code: `import { QueryBuilderFactory } from "./QueryBuilderFactory";
import { PostgresQueryBuilder } from "./PostgresQueryBuilder";

export class PostgresFactory extends QueryBuilderFactory {
  constructor(private config: { ssl: boolean }) {
    super();
  }

  create() {
    return new PostgresQueryBuilder(this.config);
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "SQLiteFactory",
                        isInterface: false,
                        code: `import { QueryBuilderFactory } from "./QueryBuilderFactory";
import { SQLiteQueryBuilder } from "./SQLiteQueryBuilder";

export class SQLiteFactory extends QueryBuilderFactory {
  create() {
    return new SQLiteQueryBuilder();
  }
}`,
                    },
                    {
                        role: "Usage",
                        fileName: "main",
                        isInterface: false,
                        code: `import { QueryBuilderFactory } from "./QueryBuilderFactory";
import { MySQLFactory } from "./MySQLFactory";
import { PostgresFactory } from "./PostgresFactory";
import { SQLiteFactory } from "./SQLiteFactory";

const factories: QueryBuilderFactory[] = [
  new MySQLFactory({ host: "localhost", user: "root" }),
  new PostgresFactory({ ssl: true }),
  new SQLiteFactory()
];

factories.forEach(f => {
  console.log(f.buildSelect("users"));
  console.log(f.buildInsert("users", { name: "Phil", age: 33 }));
  console.log(f.buildUpdate("users", { age: 34 }, "id=1"));
  console.log("---");
});`,
                    },
                ],
            },
            {
                name: "File Parser",
                description:
                    "Creates the correct parser depending on the file format, without the client knowing which one is instantiated.",
                elements: [
                    {
                        role: "Product",
                        fileName: "FileParser",
                        isInterface: true,
                        code: `export interface FileParser {
  parse(content: string): any;
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "JsonParser",
                        isInterface: false,
                        code: `import { FileParser } from "./FileParser";

export class JsonParser implements FileParser {
  parse(content: string) {
    return JSON.parse(content);
  }
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "XmlParser",
                        isInterface: false,
                        code: `import { FileParser } from "./FileParser";

export class XmlParser implements FileParser {
  parse(content: string) {
    // example of simple fake XML parsing
    return { xml: content };
  }
}`,
                    },
                    {
                        role: "Concrete Product",
                        fileName: "CsvParser",
                        isInterface: false,
                        code: `import { FileParser } from "./FileParser";

export class CsvParser implements FileParser {
  parse(content: string) {
    return content.split("\\n").map(line => line.split(","));
  }
}`,
                    },
                    {
                        role: "Creator",
                        fileName: "FileParserFactory",
                        isInterface: false,
                        code: `import { FileParser } from "./FileParser";

export abstract class FileParserFactory {
  abstract create(): FileParser;

  loadAndParse(content: string) {
    const parser = this.create();
    return parser.parse(content);
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "JsonParserFactory",
                        isInterface: false,
                        code: `import { FileParserFactory } from "./FileParserFactory";
import { JsonParser } from "./JsonParser";

export class JsonParserFactory extends FileParserFactory {
  create() {
    return new JsonParser();
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "XmlParserFactory",
                        isInterface: false,
                        code: `import { FileParserFactory } from "./FileParserFactory";
import { XmlParser } from "./XmlParser";

export class XmlParserFactory extends FileParserFactory {
  create() {
    return new XmlParser();
  }
}`,
                    },
                    {
                        role: "Concrete Creator",
                        fileName: "CsvParserFactory",
                        isInterface: false,
                        code: `import { FileParserFactory } from "./FileParserFactory";
import { CsvParser } from "./CsvParser";

export class CsvParserFactory extends FileParserFactory {
  create() {
    return new CsvParser();
  }
}`,
                    },
                    {
                        role: "Usage",
                        fileName: "main",
                        isInterface: false,
                        code: `const factories: FileParserFactory[] = [
  new JsonParserFactory(),
  new XmlParserFactory(),
  new CsvParserFactory()
];

factories.forEach(factory => {
  const result = factory.loadAndParse("name,age\\nPhil,33");
  console.log(result);
});`,
                    },
                ],
            },
        ],
    },
];

export function getElementsByRole(elements: PatternElement[], role: string) {
    function normalize(str: string) {
        return str.toLowerCase().split(" ").join("-");
    }

    return elements.filter(
        (element) => normalize(element.role) === normalize(role)
    );
}

export function getRoles(elements?: PatternElement[]) {
    if (!elements) return [];
    return [...new Set(elements.map((element) => element.role))];
}

export function findElementByFilename(
    elements: PatternElement[],
    filename: string
) {
    return elements?.find((element) => element.fileName === filename);
}
