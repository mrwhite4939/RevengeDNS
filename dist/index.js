"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// File: src/index.ts  
const server_1 = require("./dns/server");
const config_1 = require("./config/config");
const fakeAdServer_1 = require("./sinkhole/fakeAdServer");
async function main() {
    const config = config_1.Config.getInstance();
    console.log('RevengeDNS v2.0 - Defensive DNS Security System');
    console.log('================================================');
    console.log(`DNS Server: ${config.getDNSBindAddress()}:${config.getDNSPort()}`);
    console.log(`Ad Sinkhole HTTP: ${config.getAdServerBindAddress()}:${config.getAdServerPort()}`);
    console.log('');
    const fakeAdServer = new fakeAdServer_1.FakeAdServer(config.getAdServerPort(), config.getAdServerBindAddress());
    await fakeAdServer.start();
    const dnsServer = new server_1.DNSServer(config.getDNSPort(), config.getDNSBindAddress());
    await dnsServer.start();
    console.log('RevengeDNS is running. Press Ctrl+C to stop.');
    const shutdown = async () => {
        console.log('\nShutting down gracefully...');
        await dnsServer.stop();
        await fakeAdServer.stop();
        process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map