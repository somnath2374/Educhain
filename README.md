# EduChain

EduChain is a platform designed to empower students by helping them build financial literacy and a blockchain-verified financial reputation. It combines gamification, blockchain technology, and automated investment strategies to create an engaging and educational experience.

## Key Features

- **Auto-Invest Spare Change**: Automatically round up transactions and invest the spare change to help students start their financial journey.
- **Blockchain-Verified Financial Reputation**: Build a secure and transparent financial reputation (EduScore) using blockchain technology.
- **Gamified Learning**: Learn essential money management skills through interactive and gamified experiences.

## Technologies Used

EduChain leverages modern technologies to deliver a seamless and secure experience:

- **Frontend**: Built with React, TypeScript, and Tailwind CSS for a responsive and interactive user interface.
- **Backend**: Powered by Supabase for database management and API integrations.
- **Blockchain**: Utilizes blockchain technology to ensure transparency and security.
- **CI/CD**: Automated workflows using GitHub Actions for continuous integration and deployment.

## Continuous Integration Workflow

The project uses GitHub Actions to automate the build, test, and deployment processes. Below is an overview of the CI workflow:

1. **Setup Node.js**: Installs Node.js version 18 and caches npm dependencies for faster builds.
2. **Install Dependencies**: Runs `npm install` to install all required dependencies.
3. **Build**: Executes `npm run build` with environment variables for Supabase configuration.
4. **Run Tests**: Runs tests using `npm run test:ci`. If tests encounter issues, the workflow logs the errors but continues execution.

### CI Workflow Configuration

The CI workflow is defined in `.github/workflows/ci.yml`:

## How to Get Started

1. Clone the repository:

   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Run tests:

   ```sh
   npm run test
   ```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.