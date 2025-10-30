import { exec, spawn } from 'child_process';
import { getAdbDevicesIdsList } from '../getAndroidDevicesIdsList.js';
import { requestRnDevMenuOnAndroidDevices } from '../requestRnDevMenuOnAndroidDevices.js';

const SCRIPT_NAME = 'startMetroWithCustomPort';

const port = process.argv[2];
if (!port) {
  throw `${SCRIPT_NAME} must receive port as first Argument (eg: \`yarn runStartMetroWithCustomPort [PORT]\`)`;
}
console.log(`${SCRIPT_NAME}(port: ${port})`);

const devicesIds = await getAdbDevicesIdsList();
await Promise.all(
  devicesIds.map(
    async (deviceId) =>
      new Promise((resolve) => {
        console.log(`Connecting ${deviceId}`);
        exec(
          `adb -s ${deviceId} reverse tcp:${port} tcp:${port}`,
          (
            portsConnectExecError,
            portsConnectExecStdOut,
            portsConnectExecStdErr
          ) => {
            if (portsConnectExecError || portsConnectExecStdErr) {
              throw (
                `Couldn't connect ${deviceId}`,
                {
                  error: portsConnectExecError,
                  stdOut: portsConnectExecStdOut,
                  stdErr: portsConnectExecStdErr,
                }
              );
            }

            console.log(`Connected ${deviceId}`, {
              error: portsConnectExecError,
              stdOut: portsConnectExecStdOut,
              stdErr: portsConnectExecStdErr,
            });
            resolve();
          }
        );
      })
  )
);

console.log(
  `All found devices (amount: ${devicesIds.length}) are successfully connected to port ${port}`
);

console.log(
  `Don't forget to configure your devices to use appropriate (${port}) port using Dev Menu (https://reactnative.dev/docs/debugging) -> Bundle Location -> localhost:${port}\nRequesting Dev Menu on connected devices`
);
await requestRnDevMenuOnAndroidDevices();

console.log(`Starting Metro using provided port (${port})`);
// using `"type": "module"` in package.json breaks this
spawn('npx', ['react-native', 'start', '--port', port], {
  stdio: 'inherit',
});
