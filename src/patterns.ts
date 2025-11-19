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
                description: "Creates different types of notifications (email, SMS, etc.) without the client depending on which one is used.",
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
        ],
    },
];


export function getElementsByRole(elements: PatternElement[], role: string) {

  function normalize(str: string) {
    return str.toLowerCase().split(" ").join("-")
  }

  return elements.filter(element => normalize(element.role) === normalize(role));
}

export function getRoles(elements?: PatternElement[]) {
  if (!elements) return []
  return [...new Set(elements.map((element) => element.role))]
}

export function findElementByFilename(elements: PatternElement[], filename: string) {
  return elements?.find(element => element.fileName === filename);
}