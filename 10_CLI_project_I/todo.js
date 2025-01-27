
import readline from "readline";
import chalk from "chalk";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const todos = [];

const addTodo = () => {
    rl.question(chalk.magenta("Enter your task: "), (todo) => {
        todos.push(todo);
        console.log(chalk.green("\nTodo added successfully!"));

        console.log(chalk.blue('Do you want to add another todo? (y/n)'));
        rl.question(chalk.magenta("Enter your choice: "), (choice) => {
            if (choice.toLowerCase() === 'y') {
                addTodo();
            }
            else {
                setTimeout(() => {
                    showMenu();
                }, 1200);
            }
        })
    });
}

const viewTodos = () => {
    if (todos.length === 0) {
        console.log(chalk.red("\nNo todos found. Please add a todo."));
        showMenu();
        return;
    }
    console.log(chalk.cyanBright("\nYour TODO Lists:"));
    todos.forEach((todo, index) => {
        console.log(chalk.green(`${index + 1}. ${todo}`));
    });
    setTimeout(() => {
        showMenu();
    }, 1200);
}

const handleInput = (choice) => {
    switch (choice) {
        case "1":
            addTodo();
            break;
        case "2":
            viewTodos();
            break;
        case "3":
            console.log("Exiting...");
            setTimeout(() => {
                rl.close();
                console.log(chalk.redBright('Goodbye!'));
            }, 1200);
            break;
        default:
            console.log(chalk.redBright("Invalid choice. Please try again."));
            break;
    }
}

const showMenu = () => {
    console.log(chalk.blue("\nWelcome to the Todo App!"));
    setTimeout(() => {
        console.log(chalk.yellow("\n1. Add a todo"));
        console.log(chalk.green("2. View todos"));
        console.log(chalk.red("3. Exit"));
    }, 1300);
    setTimeout(() => {
        rl.question(chalk.magenta("Enter your choice: "), handleInput);
    }, 1600);
}

showMenu();