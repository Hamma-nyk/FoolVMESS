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

function doRequest(country,tls,BugHost) {
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
                    console.log(chalk.bold.cyan(`VMESS [${parseInt(i)+1}] [${VPNList[i].region}] [${VPNList[i].country_code}] [${VPNList[i].org}]`));
                    console.log(chalk.bold.yellow(line));
                    console.log(`- name: ${VPNList[i].remark}`)
                    console.log(`  server: ${BugHost}`)
                    console.log(`  port: ${VPNList[i].server_port}`)
                    console.log(`  type: ${VPNList[i].vpn}`)
                    console.log(`  uuid: ${VPNList[i].uuid}`)
                    console.log(`  alterId: 0`)
                    console.log(`  cipher: auto`)
                    console.log(`  tls: ${tlsStatus}`)
                    console.log(`  skip-cert-verify: true`)
                    console.log(`  servername: ${VPNList[i].host}`)
                    console.log(`  network: ${VPNList[i].transport}`)
                    console.log(`  ws-opts:`)
                    console.log(`      path: ${VPNList[i].path}`)
                    console.log(`      headers:`)
                    console.log(`          Host: ${VPNList[i].host}`)
                    console.log(`  udp: true`)
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
    console.log(chalk.cyan(`Edukasi : 104.17.2.81 / 104.17.3.81
Game    : 104.18.21.94
You can input your bug host too...`))
    const BugHost = prompt("Bug host/IP) : ");
    console.log(chalk.bold.yellow(line));
    const tls     = prompt("TLS (1/0)    : ");
    const country = null;
    doRequest(country,tls,BugHost);
}

function customChoice(){
    console.clear()
    title(); 
    console.log(chalk.bold.yellow(line));
    console.log(chalk.cyan(`Edukasi : 104.17.2.81 / 104.17.3.81
Game    : 104.18.21.94
You can input your bug host too...`))
    const BugHost = prompt("Bug host/IP) : ");
    console.log(chalk.bold.yellow(line));
    console.log(`${chalk.cyan(`SG : Singapore
ID : Indonesia
US : United States`)}
${chalk.green("Visit website for all list.")}`)
    const country = prompt("Country Code : ");
    console.log(chalk.bold.yellow(line));
    const tls     = prompt("TLS (1/0)    : ");
    doRequest(country,tls,BugHost);
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
