// utils/broadcastLogout.ts
export const logoutChannel = new BroadcastChannel("auth");

export const broadcastLogout = () => {
    logoutChannel.postMessage("logout");
};
