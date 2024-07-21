### Levanter Md in Termux <Ubuntu>

Simple deployment

## Setup
1. First above all, install Termux Apk. Click [Here](https://termux.en.uptodown.com/android/post-download/106885413) to download.

2. Open Termux App info and Allow access to Files and Media:

3. Make sure you have Ubuntu Installed in your termux

  First step below 👇👇👇

1 . Run below cmd / to Open Ubuntu in termux:
   
             bash start-ubuntu.sh

2. after Install git, ffmpeg, and curl:
   
             apt -y update && apt -y upgrade
             apt -y install git ffmpeg curl
    
3. run below 👇 cmd to Install nodejs:
   
             curl -fsSl https://deb.nodesource.com/setup_lts.x | bash - && apt -y install nodejs

4. Update nodejs version in termux:
   
             npm install -g npm@10.8.0

5. run below 👇 cmd to Install yarn:
   
             npm install -g yarn

6. Install pm2 in termux:
   
             yarn global add pm2

7. Clone the repository and install packages:
   
             git clone https://github.com/lyfe00011/whatsapp-bot-md botName
             cd botName
             yarn install --network-concurrency 1

8. After you clone above repo click the below 👇 Link to get your session id using pairing code


      [Levanter](https://qr-hazel-alpha.vercel.app/session):

9. watch carefully after you get session I'd  Edit below script by adding your session I'd and your number and some other necessary things

             echo "SESSION_ID = Session_Id
             PREFIX = .
             STICKER_PACKNAME = Muindi
             ALWAYS_ONLINE = true
             RMBG_KEY = null
             LANGUAG = en
             WARN_LIMIT = 1
             FORCE_LOGOUT = false
             BRAINSHOP = 159501,6pq8dPiYt7PdqHz3
             MAX_UPLOAD = 200
             REJECT_CALL = true
             SUDO = 254739642355,254115783375
             TZ = Africa/Nairobi
             VPS = true
             AUTO_STATUS_VIEW = no-dl
             SEND_READ = true
             AJOIN = true
             DISABLE_START_MESSAGE = false
             PERSONAL_MESSAGE = null" > config.env

10. after you edit copy all script above after you have add Your session id and the rest
     and paste in termux 

11. To save, press Ctrl  O then press Enter, press Ctrl  X to exit.

12. Start the Bot: {After this, your bot should start running just copy below 👇 text and paste in termux then tap enter}
    
            pm2 start . --name botName --attach --time

 - You can leave it at this point, but if you want the bot to run even on offline mode: Do as below

13. Click acquire Wakelock in the Termux notification to enable it run in background. Exit both the ubuntu & Termux
    and that all




             INCASE BOT STOP OR YOU MISTAKELY CLOSE CONNECTION FOLLOW BELOW 👇 STEP
1. open Termux again and copy and paste all command below 👇
    
            bash start-ubuntu.sh
            cd botName
            pm2 start . --name botName --attach --time




🛑 Stop bot:(Incase you wanna stop it):
    
            pm2 stop botName




### Thanks To

- [Ndeleva](https://github.com/Ndelevamutua) for [Backend](https://github.com/Ndelevamutua/whatsapp)
- [Muindi](https://github.com/muindi6602) for [Frontend](https://muindi6602.github.io/)

### Get me on:

- [WhatsApp](https://wa.me/2348108395270)

