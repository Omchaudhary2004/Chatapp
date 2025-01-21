// src/services/cometChatServices.js
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { COMETCHAT_CONSTANTS } from '../constants';

export const initializeCometChat = async () => {
    try {
        const appSetting = new CometChat.AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion(COMETCHAT_CONSTANTS.REGION)
            .build();

        await CometChat.init(COMETCHAT_CONSTANTS.APP_ID, appSetting);
        console.log("CometChat initialization successful");
        return true;
    } catch (error) {
        console.error("CometChat initialization failed:", error);
        return false;
    }
};