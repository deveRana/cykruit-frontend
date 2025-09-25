// utils/broadcastAuth.ts
export const authChannel = new BroadcastChannel("auth");

// Broadcast login event
export const broadcastLogin = (userId: string) => {
  authChannel.postMessage({ type: "login", userId });
};

// Broadcast logout event
export const broadcastLogout = () => {
  authChannel.postMessage({ type: "logout", timestamp: Date.now() });
};
