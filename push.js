var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BMN6ztYdlcrGRzOkCSdlOwv0okg43c4bG3Chp2XoYkpuS_krRyU2OUPxJFXaNSOLMvV3UwDYZJ42_efA6Xkavmo",
    "privateKey": "sbV6a04GOUPpZ_YUjDuI25TY2Quy8UpxIlU8etKVGhg"
};

webPush.setVapidDetails(
    'mailto:lauriercharm3@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d0HxbD2aGco:APA91bF-ruzBjv0GXD3k9DNEea3o8hOMZoeKbgpo-z9wSXOI7ph2XnOeeghPq0PcWaUmre0G-Dv6Uc-rxlDZ7w5i_BbTx0xArUhXlUByksmWqR6Z1VWopQL9czRjEoJX-mLaVGnCvRP9",
    "keys": {
        "p256dh": "BGNZAVlQXSmKHHgOeKhUj6IJ+TSRKIsEULDBLw3Liw+t/ME8qVYsD1RJLUs9oLGOQVQM3QEoyTxpPY7uZ9BiSSU=",
        "auth": "kzceROYDAxnnZToDpHzkMw=="
    }
};

var payload = 'Selamat Aplikasi Anda sudah dapat menerima push notifikasi';
var options = {
    gcmAPIKey: "13741519889",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
