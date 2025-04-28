import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Specify test files in each folder
    specPattern: [
      // Client folder test files
      "src/client/api/users/**/*.cy.{ts,tsx}",
      "src/client/api/applications/**/*.cy.{js,jsx,ts,tsx}",
      "src/client/api/breed/**/*.cy.{js,jsx,ts,tsx}",
      "src/client/api/contact/**/*.cy.{js,jsx,ts,tsx}",
      "src/client/api/donation/**/*.cy.{js,jsx,ts,tsx}",
      "src/client/api/notification/**/*.cy.{js,jsx,ts,tsx}",
      "src/client/api/pet/**/*.cy.{js,jsx,ts,tsx}",
      "src/client/api/rescueStory/**/*.cy.{js,jsx,ts,tsx}",
      "src/client/api/successStory/**/*.cy.{js,jsx,ts,tsx}",
      "src/client/api/wishlist/**/*.cy.{js,jsx,ts,tsx}",

      // Dashboard folder test files
      "src/dashboard/api/application/**/*.cy.{js,jsx,ts,tsx}",
      "src/dashboard/api/dashboard/**/*.cy.{js,jsx,ts,tsx}",
      "src/dashboard/api/donation/**/*.cy.{js,jsx,ts,tsx}",
      "src/dashboard/api/pet/**/*.cy.{js,jsx,ts,tsx}",
      "src/dashboard/api/rescueStory/**/*.cy.{js,jsx,ts,tsx}",
      "src/dashboard/api/successStory/**/*.cy.{js,jsx,ts,tsx}",
    ],

    setupNodeEvents(on, config) {
      // Node events if needed later
    },
  },
});
