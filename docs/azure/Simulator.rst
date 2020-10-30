================================================================================
Connect using the simulator
================================================================================

Set up the UI
================================================================================

The `device-ui <https://github.com/bifravst/device-ui>`_ provides a
browser-based UI to control the simulated device. Set it up on your
Azure account:

    git clone <https://github.com/bifravst/device-ui> cd device-ui npm ci
    export EXTEND_ESLINT=true npm run build ================================================================================
Upload it to the storage
================================================================================
    account created for bifravst az storage blob upload-batch -s build -d
    \$web \--account-name bifravstdeviceui

Connect
================================================================================

Run this script to connect to the broker using the previously generated
certificate:

    cd ../bifravst-azure ================================================================================
FIXME: move this to the connect command once
================================================================================
    <https://github.com/Azure/azure-sdk-for-js/issues/6361> is fixed
    export DEVICE_UI_LOCATION=\`az storage account show -n
    bifravstdeviceui -g bifravst \--query \"primaryEndpoints.web\"
    \--output tsv\` node cli connect \<id of your device\>
