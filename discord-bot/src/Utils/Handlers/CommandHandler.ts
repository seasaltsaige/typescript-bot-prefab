import BaseClient from "../Base/BaseClient";
import BaseCommand from "../Base/BaseCommand";
import readdir from "readdir-plus";

export default function (client: BaseClient, path: string, sub_paths: string[]) {

    for (const sub_path of sub_paths) {
        readdir(`${path}/${sub_path}`, async (err, files) => {

            if (err) throw err;

            for (const file of files) {
                // Import the command.
                const { default: Command } = await import(file.path);

                const command: BaseCommand = new Command();

                if (command.options.category !== sub_path) throw new ReferenceError("Command category must be the same as file path");

                // Set the client to use that command.
                client.commands.set(command.options.name.toLowerCase(), command);

                if (command.options.aliases) {
                    command.options.aliases.forEach((alias: string) => client.aliases.set(alias, command.options.name.toLowerCase()));
                }
            }
            console.log(`Discord Bot > Successfully loaded ` + `${files.length} ` + "command(s) in the " + sub_path + " category");
        });
    }
}