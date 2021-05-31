;(function () {
    'use strict'
    var crypto_api = {

            /*aes_ecb解密*/
            aes_decrypt_ecb: function (encryptedStr, keyStr) {
                console.log("++++++++++++++");
                var key = CryptoJS.enc.Utf8.parse(keyStr);
                var encryptedHexStr = CryptoJS.enc.Base64.parse(encryptedStr);
                var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                console.log("encryptedBase64Str = " + encryptedBase64Str);
                var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
               // return decryptedData.toString();
                 return decryptedData.toString(CryptoJS.enc.Utf8);
            },
            /*aes_cbc解密*/
            aes_decrypt_cbc: function (encryptedStr, keyStr) {
                var iv = CryptoJS.enc.Utf8.parse('1234567890123456');   //十六位十六进制数作为密钥偏移量
                var key = CryptoJS.enc.Utf8.parse(keyStr);
                var encryptedHexStr = CryptoJS.enc.Base64.parse(encryptedStr);
                console.log("encryptedHexStr  = " + encryptedHexStr );
                var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                console.log("encryptedBase64Str = " + encryptedBase64Str);
                var decrypt = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                return decryptedStr.toString();
            },
            /*aes_cbc加密*/
            aes_encrypt_cbc: function (word, keyStr) {
                var iv = CryptoJS.enc.Utf8.parse('1234567890123456');   //十六位十六进制数作为密钥偏移量
                var key = CryptoJS.enc.Utf8.parse(keyStr);
                var srcs = CryptoJS.enc.Utf8.parse(word);
                var encrypted = CryptoJS.AES.encrypt(srcs, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                //return encrypted.ciphertext.toString().toUpperCase();
                return encrypted.toString();
            },
            /*aes_ecb加密*/
            aes_encrypt_ecb: function (enStr, keyStr) {
                var key = CryptoJS.enc.Utf8.parse(keyStr);
                var encryptedData = CryptoJS.AES.encrypt(enStr, key, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
                return encryptedData.toString();
            },

            /*sm4_ecb加密*/
            sm4_encrypt_ecb: function (word, keytext) {
                var s4 = new SM4Util();
                s4.secretKey = keytext;
                return s4.encryptData_ECB(word);
            },
            /*sm4_ecb解密*/
            sm4_decrypt_ecb: function (word, keytext) {
                var s4 = new SM4Util();
                s4.secretKey = keytext;
                return s4.decryptData_ECB(word);
            },
            /*sm4_cbc加密*/
            sm4_encrypt_cbc: function (word, keytext, ivtext) {
                var s4 = new SM4Util();
                s4.secretKey = keytext;
                s4.iv = ivtext;
                return s4.encryptData_CBC(word);
            },
            /*sm4_cbc解密*/
            sm4_decrypt_cbc: function (word, keytext, ivtext) {
                var s4 = new SM4Util();
                s4.secretKey = keytext;
                s4.iv = ivtext;
                return s4.decryptData_CBC(word);
            }

        }
    ;


    if (typeof exports == "object") {
        module.exports = crypto_api
    } else if (typeof define == "function" && define.amd) {
        define([], function () {
            return crypto_api
        })
    } else if (window) {
        window.crypto_api = crypto_api
    }
})(window, document);


