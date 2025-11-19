interface PatternElement {
    role: string;
    fileName: string;
    code: string;
    isInterface: boolean;
}

interface Pattern {
    name: string;
    elements: PatternElement[]
}

export const patterns: Pattern[] = [
    {
        name: "Factory Method",
        elements: [
            {
                role: "Product",
                fileName: "Notification",
                isInterface: true,
                code: `interface Notification {
  send(message: string): void;
}`
            },
            {
                role: "Concrete Product",
                fileName: "EmailNotification",
                isInterface: false,
                code: `class EmailNotification implements Notification {
  send(message: string) {
    console.log(\`Sending email with message: "\${message}"\`);
  }
}`
            },
            {
                role: "Concrete Product",
                fileName: "SMSNotification",
                isInterface: false,
                code: `class SMSNotification implements Notification {
  send(message: string) {
    console.log(\`Sending SMS with message: "\${message}"\`);
  }
}`
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
}`
            },
            {
                role: "Concrete Creator",
                fileName: "EmailNotificationFactory",
                isInterface: false,
                code: `class EmailNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new EmailNotification();
  }
}`
            },
            {
                role: "Concrete Creator",
                fileName: "SMSNotificationFactory",
                isInterface: false,
                code: `class SMSNotificationFactory extends NotificationFactory {
  createNotification(): Notification {
    return new SMSNotification();
  }
}`
            },
            {
                role: "Usage",
                fileName: "main",
                isInterface: false,
                code: `const factories: NotificationFactory[] = [
  new EmailNotificationFactory(),
  new SMSNotificationFactory(),
];

factories.forEach(factory => factory.notify("Hello Factory Method!"));`
            }
        ]
    }
]