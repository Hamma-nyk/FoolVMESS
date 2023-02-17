const chalk = require('chalk')
const figlet = require('figlet')
const request = require('request');
const prompt = require("prompt-sync")({ sigint: false });
const line = "---------------------------------------------------";

function title() {
    console.clear()
    console.log(chalk.bold.green(figlet.textSync('FoolVMESS', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: false
        })
    ))
    console.log(chalk.red("Credit: http://fool.azurewebsites.net/"));
}

function doRequest(country,tls) {
    if (country!=null){
        var urlP = `http://fool.azurewebsites.net/get?vpn=vmess&network=ws&mode=cdn&tls=${tls}&cc=${country}`
    }else{
        var urlP = `http://fool.azurewebsites.net/get?vpn=vmess&network=ws&mode=cdn&tls=${tls}`    
    }
    return new Promise(function (resolve, reject) {
        request.get({
            url:    urlP
        }, function(error, response, body){
            if (!error && response.statusCode === 200) {
                console.clear();
                title();
                const VPNList = JSON.parse(body)
                if (tls=="1"){
                    var tlsStatus = "true";
                }else{
                    var tlsStatus = "false";
                }
                for (let i in VPNList){
                    console.log(chalk.bold.yellow(line));
                    console.log(chalk.bold.cyan(`VMESS ${parseInt(i)+1}`));
                    console.log(chalk.bold.yellow(line));
                    console.log('UUID     : '+VPNList[i].uuid);
                    console.log('Host     : '+VPNList[i].host);
                    console.log('Port     : '+VPNList[i].server_port);
                    console.log('Path     : '+VPNList[i].path);
                    console.log('Country  : '+VPNList[i].country_code);
                    console.log('Region   : '+VPNList[i].region);
                    console.log('Org      : '+VPNList[i].org);
                    console.log('Security : '+VPNList[i].security);
                    console.log(`Tls      : `+tlsStatus);
                    console.log('Transport: '+VPNList[i].transport);
                    console.log('Mode     : '+VPNList[i].conn_mode);
                    console.log('Network  : '+VPNList[i].vpn);
                }
                resolve(body);
                console.log(chalk.bold.yellow(line));
                const back = prompt("Back to menu? (y/n) : ");
                if(back=="y"){
                    start();
                }else if(back=="n"){
                    console.log("Bye.")
                }
            }else{
                reject(error);
            }
        })
    })
}

function randomChoice(){
    console.clear()
    title(); 
    console.log(chalk.bold.yellow(line));
    const country = null;
    const tls = prompt("TLS (1/0) : ");
    doRequest(country,tls);
}

function customChoice(){
    console.clear()
    title(); 
    console.log(chalk.bold.yellow(line));
    console.log(`SG : Singapore
ID : Indonesia
US : United States
${chalk.green("Visit website for all list.")}`)
    console.log(chalk.bold.yellow(line));
    const country = prompt("Country Code : ");
    const tls     = prompt("TLS (1/0)    : ");
    doRequest(country,tls);
}
function start(){
    title();    
    console.log(chalk.bold.yellow(line));
    console.log('[1] Random Vmess (WS & CDN)')
    console.log('[2] Custom Country Vmess (WS & CDN)')
    console.log('[3] Exit')
    console.log(chalk.bold.yellow(line));
    const choose = prompt("Choose Menu : ");
    if(choose=="1"){
        randomChoice();
    }else if(choose=="2"){
        customChoice();    
    }else if(choose=="3"){
        console.clear();
        title();
        console.log("Bye.")        
    }
}

start()
