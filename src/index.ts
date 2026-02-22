// File: src/index.ts  
import { DNSServer } from './dns/server';  
import { Config } from './config/config';  
import { FakeAdServer } from './sinkhole/fakeAdServer';  
  
async function main(): Promise<void> {  
  const config = Config.getInstance();  
    
  console.log('RevengeDNS v2.0 - Defensive DNS Security System');  
  console.log('================================================');  
  console.log(`DNS Server: ${config.getDNSBindAddress()}:${config.getDNSPort()}`);  
  console.log(`Ad Sinkhole HTTP: ${config.getAdServerBindAddress()}:${config.getAdServerPort()}`);  
  console.log('');  
  
  const fakeAdServer = new FakeAdServer(  
    config.getAdServerPort(),  
    config.getAdServerBindAddress()  
  );  
  await fakeAdServer.start();  
  
  const dnsServer = new DNSServer(  
    config.getDNSPort(),  
    config.getDNSBindAddress()  
  );  
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