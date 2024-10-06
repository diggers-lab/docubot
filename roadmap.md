# Docubot  

## Introduction  

This is a roadmap for the Docubot project.  

This project aims to provide a automated documentation, in order to help developers to create and maintain their documentation.  
Speficically for Typescript projects, as JavaScript itself doesn't provide types.
it's main purpose is to describe your differents entities ( enums, interfaces, classes, function, ...),  
to generate markdown files along with schema to explain your project purpose.  
It will also be used to describe your api endpoints, or tasks ( such as CronJobs ).  
After a developper did a merge request, this project should be used to generate/update the documentation,  
and then he will be able to review it, and fill the missing parts.

it should be able to run on CommonJs and ESM projects.  
And be able to run on NodeJs 20/+, as CLI tool or as a library.  

This project won't be able to explain what you're doing, but will provide a base to help you to explain it.  
It should be used with documentation project as Mkdoc, Vitepress, Docusaurus, ... to be hosted and shared.  

## Tools  

this project will use some tools provided by the typescript ecosystem, such as:  
- ts-morph: To parse most of the typescript code  
- typescript compiler: When ts-morph is not enough ( such as decorators or dependency injections )  
- node-http-discovery: tool to discover OpenApi endpoints ( features will be added to the project to allow entities generation )  
- mermaidJs/CLI: To generate Diagram and translate them into svg/png/jpeg/...  
- Mocha or Jest: To test the project

## Roadmap  

This roadmap may looks generic, but it provides the basis to create a V1 of the project.  
the first three and the fifth points (excepting the project setup ) can be achieved independently, and will be the first steps to create the project.  
the next steps will require the previous steps to be done.  
As it is a roadmap to V1, this will be updated after the first release.  
thoses steps, when the V1 will be released, could be greatly improved to add more features, or to improve the existing ones.  

No Front-end are planned, but it could be added in the future to allow better management ( specifically for the historic part)

### Project setup  

This project first usage will be with CLI Commands.
Using a configuration file to specify some properties.

this step will be done after:
- Creating the project
- Adding main CLI commands
- Adding a configuration file
- Test setup
- Minimal scripts to run the project ( Windows & *nix )

### Describing Enums  

The first step will be to describe enums, as they are the simplest entities to describe.  
this step will be done after:  
- Creating the interface that will stock the enum type  
- Generating a markdown file describing the enums  
- Being able to generate svg/png/jpeg/... from the interface  

### Describing Interfaces, Basics  

The second step will be to describe interfaces  
this step will be done after:  
- Creating the interface that will stock the interface type  
- Being able to parse its properties or methods  
- Creating a markdown template to describe the interfaces, and fill it with the parsed data  
- Being able to generate svg/png/jpeg/... from the interface  

### Describing Classes, Basics  

The third step will be to describe classes,  
this step will be done after:  
- Creating the interface that will stock the class type  
- Being able to parse its properties or methods  
- Being able to go through the inheritance chain  
- Creating a markdown template to describe the classes, and fill it with the parsed data  
- Being able to generate svg/png/jpeg/... from the interface  

### Describing external stuff  

The fourth step will be to describe external stuff, and where they are used  
this step will be done after:  
- Being able to parse the imports from node_modules  
- Being able to specify where they are used  
- Add to the interfaces and classes interfaces the calls to externals code  

### Managing markdown links  

The fourth step will be to manage the links between the different markdown files  
this step will be done after:  
- Being able to generate a table of content  
- On the script runtime, being able to search from the loaded files specified entities  
- Being able to generate links between the different entities  
- add thoses links to the generated markdown files  

### Describing EndPoints  

The fifth step will be to describe the endpoints of the project  
this step will be done after:  
- From a function name, being able to locate it  
- Step through the functions calls to final return  
- Generating an interface for the endpoints descriptions  
- Generating a markdown template to describe the endpoints, and fill it with the parsed data  
- Being able to generate svg/png/jpeg/... from the interface  

### Discrimation between automately generated doc, and humain written doc  

The sixth step will be to allow human to add handmaded documentation  
this step will be done after:  
- Add to the interfaces types locations to add handmaded documentation  
- Being able to detect updated files  
- Store the previous handmaded documentation -> allow new generation while keeping the old descriptions  
- Being able to retrieve previous versions of the documentations  