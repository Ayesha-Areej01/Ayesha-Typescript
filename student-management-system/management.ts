import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  studentID: string;
  name: string;
  coursesEnrolled: string[];
  balance: number;

  constructor(name: string) {
    this.name = name;
    this.studentID = this.generateUniqueID();
    this.coursesEnrolled = [];
    this.balance = 0.0;
  }

  private generateUniqueID(): string {
    const alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 5 }, () =>
      alphanumeric[Math.floor(Math.random() * alphanumeric.length)]
    ).join("");
  }

  enrollInCourse(course: string): void {
    this.coursesEnrolled.push(course);
    console.log(chalk.green(`${this.name} enrolled in ${course}`));
  }

  payTuitionFees(amount: number): void {
    this.balance -= amount;
    console.log(chalk.green(`${this.name} paid ${amount} tuition fees. Remaining balance: ${this.balance}`));
  }

  viewBalance(): void {
    console.log(chalk.blue(`${this.name}'s current balance: ${this.balance}`));
  }

  showStatus(): void {
    console.log(chalk.yellow(`Student Details:
      Name: ${this.name}
      Student ID: ${this.studentID}
      Courses Enrolled: ${this.coursesEnrolled.join(", ")}
      Balance: ${this.balance}`));
  }
}

async function main(): Promise<void> {
  const students: Student[] = [];

  while (true) {
    const menuOptions = [
      { name: "Add New Student", value: "1" },
      { name: "Enroll Student in Course", value: "2" },
      { name: "Pay Tuition Fees", value: "3" },
      { name: "View Balance", value: "4" },
      { name: "Show Student Status", value: "5" },
      { name: "Quit", value: "6" },
    ];

    const { choice } = await inquirer.prompt({
      name: "choice",
      message: "Enter your choice:",
      type: "list",
      choices: menuOptions,
    });

    if (choice === "1") {
      const { name } = await inquirer.prompt({
        name: "name",
        message: "Enter student name:",
      });

      const student: Student = new Student(name);
      students.push(student);
      console.log(chalk.green(`Student ${student.name} added with ID ${student.studentID}`));
    } else if (choice === "2") {
      const { name, course } = await inquirer.prompt([
        { name: "name", message: "Enter student name:" },
        { name: "course", message: "Enter course name to enroll in:" },
      ]);

      const selectedStudent: Student | undefined = students.find(student => student.name === name);

      if (!selectedStudent) {
        console.log(chalk.red(`Student with name ${name} not found.`));
      } else {
        selectedStudent.enrollInCourse(course);
      }
    } else if (choice === "3") {
      const { name, tuitionAmount } = await inquirer.prompt([
        { name: "name", message: "Enter student name:" },
        { name: "tuitionAmount", message: "Enter tuition fees amount:" },
      ]);

      const selectedStudent: Student | undefined = students.find(student => student.name === name);

      if (!selectedStudent) {
        console.log(chalk.red(`Student with name ${name} not found.`));
      } else {
        selectedStudent.payTuitionFees(parseFloat(tuitionAmount));
      }
    } else if (choice === "4") {
      const { name } = await inquirer.prompt({
        name: "name",
        message: "Enter student name:",
      });

      const selectedStudent: Student | undefined = students.find(student => student.name === name);

      if (!selectedStudent) {
        console.log(chalk.red(`Student with name ${name} not found.`));
      } else {
        selectedStudent.viewBalance();
      }
    } else if (choice === "5") {
      const { name } = await inquirer.prompt({
        name: "name",
        message: "Enter student name:",
      });

      const selectedStudent: Student | undefined = students.find(student => student.name === name);

      if (!selectedStudent) {
        console.log(chalk.red(`Student with name ${name} not found.`));
      } else {
        selectedStudent.showStatus();
      }
    } else if (choice === "6") {
      break;
    }
  }
}

main();

