import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let yourName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Shauray's Portfolio \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('Instructions')} 
    As a third-year student with hands-on experience in full-stack web development, 
    I am eager to join a team where I can continue learning and grow under the guidance of experienced professionals. 
    I bring project experience where I have successfully executed various web development initiatives. 
  `);
}

async function handler(answer) {
  const spinner = createSpinner("Getting what you're looking for...").start();
  await sleep();

  if (answer === 'PROJECTS') {  
    spinner.success({ text: chalk.blueBright('Medium Clone') });
    await sleep();
  } else if (answer === 'EDUCATION') {
    spinner.success({ text: chalk.magentaBright('Punjab Engineering College\n') + chalk.yellow('Bachelor of Technology') });
    await sleep();
  } else if (answer === 'SKILLS') {
    spinner.success({ 
      text: chalk.greenBright('Skills:\n') +
      chalk.cyan('- JavaScript (React)\n') +
      chalk.cyan('- HTML/CSS\n') +
      chalk.cyan('- Next.js\n') +
      chalk.cyan('- NoSQL (MongoDB)\n') +
      chalk.cyan('- SQL (PostgreSQL)\n') +
      chalk.cyan('- Tailwind CSS\n') +
      chalk.cyan('- REST APIs\n') +
      chalk.cyan('- Git')
    });
    await sleep();
  } else if (answer === 'Relevant courses') {
    spinner.success({ 
      text: chalk.blueBright('Courses:\n') + 
      chalk.cyan('- 0-100 Full Stack Web Development Course\n') +
      chalk.cyan('- Data Science Methodology, IBM')
    });
    await sleep();
  } else if (answer === 'Exit') {
    spinner.stop();
    thanksForVisiting();
    return;
  } else {
    spinner.error({ text: chalk.red('Option not recognized.') });
    process.exit(1);
  }

  await resume(); // Ask the question again after handling the option
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Guy';
    },
  });

  yourName = answers.name;
}

function thanksForVisiting() {
  console.clear();
  figlet(`Thanks For Visiting, \n ${yourName}! `, (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
      chalk.green(
        `Programming isn't about what you know; it's about making the command line look cool`
      )
    );
    process.exit(0);
  });
}

async function resume() {
  const answers = await inquirer.prompt({
    name: 'stuff',
    type: 'list',
    message: 'What do you want to look at?',
    choices: [
      'PROJECTS',
      'EDUCATION',
      'SKILLS',
      'Relevant courses',
      'Exit', // Add Exit option here
    ],
  });

  await handler(answers.stuff);
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await resume();
