import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Shuaray's Portfolio \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('About me')} 
    As a second-year student with hands-on experience in full-stack web development, 
    I am eager to join a team where I can continue learning and grow under the guidance of experienced professionals. 
    I bring project experience where I have successfully executed various web development initiatives. 
  `);
}

async function handler(answer) {
  const spinner = createSpinner("Getting what you're looking for...").start();
  await sleep();

  if (answer === 'PROJECTS') {  
    spinner.success({ text: `Medium Clone` });
    await sleep();
  } else if (answer === 'EDUCATION') {
    spinner.success({ text: `Punjab Engineering College, BTech` });
    await sleep();
  } else if (answer === 'SKILLS') {
    spinner.success({ text: `JavaScript (React),\n HTML/ CSS,\n Next.js,\n NoSQL (MongoDB),\n SQL (PostgreSQL),\n Tailwind CSS,\n REST APIsGit`});
    await sleep();
  } else if (answer === 'Relevant courses') {
    spinner.success({ text: `0-100 Full Stack Web Development Course \n Data Science Methodology, IBM` });
    await sleep();
  } else if (answer === 'Exit') {
    spinner.stop();
    thanksForVisiting();
    return;
  } else {
    spinner.error({ text: `Option not recognized.` });
    process.exit(1);
  }

  await resume(); // Ask the question again after handling the option
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

function thanksForVisiting() {
  console.clear();
  figlet(`Thanks For Visiting, ${playerName}! `, (err, data) => {
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
    name: 'question_1',
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

  await handler(answers.question_1);
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await resume();
