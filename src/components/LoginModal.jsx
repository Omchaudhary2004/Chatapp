import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { COMETCHAT_CONSTANTS } from '../constants';
import { initializeCometChat } from '../services/cometChatServices';

export const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [uid, setUid] = useState("");
    const [name, setName] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const init = async () => {
            const initialized = await initializeCometChat();
            setIsInitialized(initialized);
        };
        init();
    }, []);

    const handleCreateUser = async () => {
        if (!isInitialized) {
            alert("CometChat is still initializing. Please try again in a moment.");
            return;
        }

        if (!uid || !name) {
            alert("Please provide both User ID and Name.");
            return;
        }

        try {
            const user = new CometChat.User(uid);
            user.setName(name);
            await CometChat.createUser(user, COMETCHAT_CONSTANTS.AUTH_KEY);
            alert("User created successfully! You can now login.");
            setIsRegistering(false);
            setUid("");
            setName("");
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user. Please try again.");
        }
    };

    const handleLogin = async () => {
        if (!isInitialized) {
            alert("CometChat is still initializing. Please try again in a moment.");
            return;
        }

        if (!uid) {
            alert("Please provide a User ID.");
            return;
        }

        try {
            const user = await CometChat.login(uid, COMETCHAT_CONSTANTS.AUTH_KEY);
            if (user) {
                onLogin(user);
                onClose();
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 relative">
                <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-4">
                    {isRegistering ? "Create Account" : "Login"}
                </h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                {isRegistering && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                    />
                )}
                <button
                    onClick={isRegistering ? handleCreateUser : handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded mb-2"
                    disabled={!isInitialized}
                >
                    {isRegistering ? "Create Account" : "Login"}
                </button>
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="w-full text-blue-500 p-2"
                >
                    {isRegistering ? "Already have an account? Login" : "Create new account"}
                </button>
            </div>
        </div>
    );
};