const net = require("net");
const fs = require("fs");

const SOCKETFILE = "./tandem.sock";

if (!fs.existsSync(SOCKETFILE)) {
    console.error("Socket not found.");
    process.exit(1);
}

async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function createSocketClient(name) {
    return await new Promise((r) => {
        const netSocket = net.createConnection(SOCKETFILE)
            .on("connect", () => {
                console.log(`${name} connected`);
                r(netSocket);
            })
            .on("data", function (data) {
                console.log(`Server msg for ${name}: `, data.toString());
            })
            .on("error", function (data) {
                console.error(`Server error [${name}]: `, data);
            });
    });
}

(async () => {
    const client1 = await createSocketClient("client 1");
    const client2 = await createSocketClient("client 2");

    client2.write("Init message from client 2");
    client1.write("Init message from client 1");

    client2.end();

    client1.write(" boo");
    client1.write(" foo");
    client1.write(" goo");

    client1.write(" ###############");

    client1.end();
})();

(async function () {
    console.log("Waiting 6 seconds...");
    await sleep(6000);
})()
