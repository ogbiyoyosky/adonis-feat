const ace = require("@adonisjs/ace");
ace.command(
    "make:feature",
    "Generate a new feature",
    function ({
        name
    }) {
        console.log(`Generating a new feature`);
    }
);

// Boot ace to execute commands
ace.wireUpWithCommander();
ace.invoke();