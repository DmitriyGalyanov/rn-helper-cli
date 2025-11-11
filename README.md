# rn-helper-cli
Provides simple scripts helping with React Native development

## Setup
1. Run `yarn add -D rn-helper-cli`
2. Add needed Scripts to Project's package.json using following Format: `"[yoursScriptName]": "[libsScriptName]"`, eg: `"startMetro": "startMetroWithCustomPort"`
3. Use running `yarn [yoursScriptName] [args if required]`, eg: `yarn startMetro 8800`

## Scripts
### `startMetroWithCustomPort [PORT]`
1. (Connects)[https://www.reddit.com/r/reactnative/comments/ryrntz/what_does_adb_reverse_tcp8081_tcp8081_command_do/] all found ADB Devices to provided Port
2. [Requests React Native Dev Menu](#requestRnDevMenu) on ADB Devices
    1. You have to change Bundle Location for App to connect
        1. On Android
            1. Open Dev Menu (opened via Script in this Scenario)
            2. Click "Change Bundle Location"
            3. Insert `localhost:[PORT]` (where `[PORT]` is replaced with used Port, eg: `8800`)
            4. Click "OK"
        2. On iOS
            1. Open Dev Menu (shaking the Device)
            2. Click "Configure Bundler"
            3. Insert Machine's IP (which might be obtained running `ipconfig getifaddr en0` in Terminal; eg: `192.168.0.125`) in first Field
            4. Insert used Port (eg: `8800`) in second Field
            5. Click "Apply Changes"
4. Starts Metro on provided Port

<h3 id="requestRnDevMenu"><code>requestRnDevMenu</code></h3>
Requests (React Native Dev Menu)[https://reactnative.dev/docs/debugging#opening-the-dev-menu] on all found ADB Devices (RN App should be focused for this to work)
