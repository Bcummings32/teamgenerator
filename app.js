const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "Output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const Team = []
const idArray = []

function inquirerMenu() {
function makeManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
          },
          {
            type: "input",
            name: "managerId",
            message: "What is your manager's id?",
          },
          {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
          },
          {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?",
          }

    ]).then(function(answers){
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
        Team.push(manager)
        idArray.push(answers.managerId)
            // create team function here 
            makeTeam() 

            }
    )

}
//write intern function and engineer function 


function makeTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "What team member do you want to add?",
            choices: [
                "Intern", "Engineer", "Manager", "I don't want to add members"
             ]

        }

    ]).then(function(userChoice) {
        switch(userChoice.memberChoice) {
        case "Engineer":
          makeEngineer();
          break;
        case "Intern":
          makeIntern();
          break;
          case "Manager":
          makeManager();
        default:
          renderTeam();

        }
      });  
}

function renderTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(Team), "utf-8");
    }
    makeManager();

}    

inquirerMenu();




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
