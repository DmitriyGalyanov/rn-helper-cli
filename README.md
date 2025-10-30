# rn-helper-cli
Provides simple scripts helping with React Native development

## Setup
1. Run `yarn add -D rn-helper-cli`
2. Add needed Scripts to Project's package.json using following Format: `"[yoursScriptName]": "[libsScriptName]"`, eg: `"startMetro": "startMetroWithCustomPort"`
3. Use running `yarn [yoursScriptName] [args if required]`, eg: `yarn startMetro 8800`

## Scripts
### `startMetroWithCustomPort [PORT]`
1. (Connects)[https://www.reddit.com/r/reactnative/comments/ryrntz/what_does_adb_reverse_tcp8081_tcp8081_command_do/] all found ADB Devices to provided Port
2. [Requests React Native Dev Menu](#requestRnDevMenu) (since you have to change Bundle Location to `localhost:${port}` for App to connect)
3. Starts Metro on provided Port

<h3 id="requestRnDevMenu"><code>requestRnDevMenu</code></h3>
Requests (React Native Dev Menu)[https://reactnative.dev/docs/debugging#opening-the-dev-menu] on all found ADB Devices (RN App should be focused for this to work)
