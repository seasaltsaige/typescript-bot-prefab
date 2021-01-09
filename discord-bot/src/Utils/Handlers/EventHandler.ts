import BaseClient from "../Base/BaseClient";
import readdir from "readdir-plus";
import BaseEvent from "../Base/BaseEvent";

export default function (client: BaseClient, path: string) {
    readdir(path, async (err, files) => {
        for (const file of files) {
            if (err) throw err;

            try {
                // Import the event
                const { default: Event } = await import(file.path);

                // Make a new instance of that event.
                const event = <BaseEvent>new Event()

                // Set the client to listen to that event.
                client.on(event.event, event.run.bind(null, client));
                console.log(`Discord Bot > Successfully loaded: ` + `${event.event}`);
            } catch (err) {
                console.log(err);
            }
        }
    });
}