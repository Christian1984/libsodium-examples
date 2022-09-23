const sodium = require("libsodium-wrappers");

console.log("Hello libsodium");

const init = async () => {
    await sodium.ready;
    console.log("sodium ready!");

    const aliceKeys = sodium.crypto_box_keypair();
    console.log("aliceKeys", aliceKeys);

    const bobKeys = sodium.crypto_box_keypair();
    console.log("bobKeys", bobKeys);

    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
    console.log("nonce", nonce);

    const message = "Yay, this is libsodium!";
    console.log("message", message);

    const encrypted = sodium.crypto_box_easy(message, nonce, bobKeys.publicKey, aliceKeys.privateKey);
    console.log("encrypted", encrypted);

    const encrypted_b64 = btoa(encrypted);
    console.log("encrypted_b64", encrypted_b64);

    const decrypted = sodium.crypto_box_open_easy(encrypted, nonce, aliceKeys.publicKey, bobKeys.privateKey);
    console.log("decrypted", decrypted);
    console.log("decrypted to_string", sodium.to_string(decrypted));
    
    return Promise.resolve();
};

init();
