import { exec } from 'child_process';
import { getAdbDevicesIdsList } from './getAndroidDevicesIdsList.js';

/**
 * @param {string[] | undefined} devicesIds
 */
export const requestRnDevMenuOnAndroidDevices = async (devicesIds) => {
  devicesIds ??= await getAdbDevicesIdsList();
  console.log(
    'requestRnDevMenuOnAndroidDevices() | Note that Device should have RN App focused'
  );

  await Promise.all(
    devicesIds.map(
      async (deviceId) =>
        new Promise((resolve) => {
          console.log(`Requesting RN Dev Menu on ${deviceId}`);
          exec(
            `adb -s ${deviceId} shell input keyevent 82`,
            (
              portsConnectExecError,
              portsConnectExecStdOut,
              portsConnectExecStdErr
            ) => {
              if (portsConnectExecError || portsConnectExecStdErr) {
                throw (
                  `Couldn't request RN Dev Menu on ${deviceId}`,
                  {
                    error: portsConnectExecError,
                    stdOut: portsConnectExecStdOut,
                    stdErr: portsConnectExecStdErr,
                  }
                );
              }

              console.log(`Requested RN Dev Menu on ${deviceId}`, {
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
    `Requested RN Dev Menu on all found devices (amount: ${devicesIds.length})`
  );
};
