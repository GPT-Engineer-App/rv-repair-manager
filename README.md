# Welcome to your GPT Engineer project

## Project info

**Project**: rv-repair-manager 

**URL**: https://run.gptengineer.app/projects/58634623-ba43-4c51-9fe8-e269ec40dcf7/improve

**Description**: Objective: Develop an application that facilitates the configuration and management of both roof and floor repair jobs for RVs, including detailed job specifications and the generation of estimates. The application will integrate with a backend database hosted on Supabase, ensuring data integrity and efficient data handling. Features: Pre-Configured Jobs: Job Configuration: Allow administrators to pre-configure different roof and floor repair jobs with specific parts, prices, labor hour rates, labor hours, sublet costs, shop supplies, taxes, and job totals. Each job will be assigned a unique job code for easy identification and reference. Database Schema: Utilize the pre_configured_jobs table to store job details, including parts, labor rates, and calculated job prices. Create separate tables for roof and floor jobs to ensure clarity and organization (pre_configured_roof_jobs and pre_configured_floor_jobs). Estimate Builder: User Interface: Provide a user-friendly interface with a dropdown menu to select pre-configured jobs. Auto-populate estimate fields based on the selected job, including parts, labor hours, and total costs. Customer and Unit Details: Allow users to input customer details such as name, address, phone number, and email (optional). Include fields for unit details like year, make, and model. Customer Type and Deductible: Offer a dropdown menu for selecting the customer type (Dealership, Warranty, Extended warranty, Insurance, Customer). Provide a dropdown menu for deductible amounts ranging from 0 to 2000 in $250 increments. Database Integration: Use the estimates table to store estimate details, linking each estimate to a specific job code and customer ID. The estimates table includes fields for advisor, payment type, deductible, estimate date, roof kit, roof membrane, floor materials, roof screws, glue, additional parts, repair description, notes, hours, labor per hour, sublet, extras, labor, shop supplies, and tax. Estimate Management: Save and Print: Provide an option to save the estimate to the local machine in a user-friendly format (e.g., PDF). Include a print button to facilitate direct printing of the estimate. User Interface: Design Principles: Ensure the user interface is intuitive and easy to navigate, with clear labels and organized layouts for all input fields and dropdown menus. Use responsive design principles to ensure compatibility across various devices and screen sizes. Technical Requirements: Backend: Utilize Supabase for backend services, including database management and API endpoints. Implement the provided SQL schema for pre_configured_jobs, customers, and estimates tables. Frontend: Develop a web-based frontend using modern JavaScript frameworks (e.g., React, Vue.js). Integrate with Supabase APIs to fetch and update data in real-time. Security: Ensure data security by implementing proper authentication and authorization mechanisms. Validate user inputs to prevent SQL injection and other common web vulnerabilities. Documentation and Support: Provide comprehensive documentation detailing the setup, configuration, and usage of the application. Offer support channels for users to seek assistance and report issues. Testing and Deployment: Conduct thorough testing to ensure the application's robustness and user-friendliness. Deploy the application on a reliable hosting platform, ensuring high availability and performance. Additional Notes: The application should allow for ad hoc addition of various parts and materials as needed when configuring a new job. Ensure that the application supports both roof and floor estimates, with the ability to save, print, and manage these estimates efficiently. Include the adjustments made to the components and other items in the application's functionality. Supabase Integration: I will supply the Supabase URL and Anon Key for backend integration. DO NOT BUILD ANY SECTION OF THE APPLICATION UNTIL YOU HAVE PROVIDE A RESPONSE AND ASKED FOR THE NEXT SECTION TO BUILD, I WILL THEN PROVIDE THE NEXT SECTION AND YOU CAN PROCEED. 

## Who is the owner of this repository?
By default, GPT Engineer projects are created with public GitHub repositories.

However, you can easily transfer the repository to your own GitHub account by navigating to your [GPT Engineer project](https://run.gptengineer.app/projects/58634623-ba43-4c51-9fe8-e269ec40dcf7/improve) and selecting Settings -> GitHub. 

## How can I edit this code?
There are several ways of editing your application.

**Use GPT Engineer**

Simply visit the GPT Engineer project at [GPT Engineer](https://run.gptengineer.app/projects/58634623-ba43-4c51-9fe8-e269ec40dcf7/improve) and start prompting.

Changes made via gptengineer.app will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in the GPT Engineer UI.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps: 

```sh
git clone https://github.com/GPT-Engineer-App/rv-repair-manager.git
cd rv-repair-manager
npm i

# This will run a dev server with auto reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

All GPT Engineer projects can be deployed directly via the GPT Engineer app. 

Simply visit your project at [GPT Engineer](https://run.gptengineer.app/projects/58634623-ba43-4c51-9fe8-e269ec40dcf7/improve) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain, then we recommend GitHub Pages.

To use GitHub Pages you will need to follow these steps: 
- Deploy your project using GitHub Pages - instructions [here](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site)
- Configure a custom domain for your GitHub Pages site - instructions [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)