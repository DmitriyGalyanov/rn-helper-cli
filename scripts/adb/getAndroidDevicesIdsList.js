import { exec } from 'child_process';

/**
 * @returns {Promise<string[]>} IDs of connected to ADB devices and emulators,
 * might be empty (most likely meaning that there is no connected devices/emulators)
 */
export const getAdbDevicesIdsList = async () =>
  new Promise((resolve, reject) =>
    exec(
      'adb devices',
      async (
        adbDevicesExecError,
        adbDevicesExecStdOut,
        adbDevicesExecStdErr
      ) => {
        if (adbDevicesExecError || adbDevicesExecStdErr) {
          console.warn('`adb devices` exec returned an error', {
            err: adbDevicesExecError,
            stderr: adbDevicesExecStdErr,
            stdout: adbDevicesExecStdOut,
          });
        }

        try {
          const devicesIds = adbDevicesExecStdOut
            .split('\n')
            .filter((line) => /\tdevice$/.test(line))
            .map((line) => line.split('\t')[0]);

          if (!devicesIds.length) {
            console.log("couldn't find any connected devices/emulators")
            resolve([])
            return;
          }

          resolve(devicesIds);
        } catch (error) {
          reject('`adb devices` caught an error', error)
        }
      }
    )
  );
