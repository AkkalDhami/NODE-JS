
import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const todos = [];

const addTodo = () => {
    rl.question("Enter your task: ", (todo) => {
        todos.push(todo);
        console.log("\nTodo added successfully!");

        console.log('Do you want to add another todo? (y/n)');
        rl.question("Enter your choice: ", (choice) => {
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
        console.log("\nNo todos found. Please add a todo.");
        showMenu();
        return;
    }
    console.log("\nYour TODO Lists:");
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo}`);
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
                console.log('Goodbye!');
            }, 1200);
            break;
        default:
            console.log("Invalid choice. Please try again.");
            break;
    }
}

const showMenu = () => {
    console.log("\nWelcome to the Todo App!");
    setTimeout(() => {
        console.log("\n1. Add a todo");
        console.log("2. View todos");
        console.log("3. Exit");
    }, 1300);
    setTimeout(() => {
        rl.question("Enter your choice: ", handleInput);
    }, 1600);
}

showMenu();