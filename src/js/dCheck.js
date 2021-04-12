//Created check function to see if the MetaMask extension is installed
const isMetaMaskInstalled = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
};


//Row1
const networkDiv = document.getElementById('network')
const chainIdDiv = document.getElementById('chainId')
const accountsDiv = document.getElementById('accounts')

// connection with Metamask
const connectwithMetamask = document.getElementById('Connect')

// Add employee Form
const employeename= document.getElementById('employeename')
const employername= document.getElementById('employername')
const employeedesignation= document.getElementById('employeedesignation')
const los= document.getElementById('los')
const submitemployee= document.getElementById('submitemployee')

// Add student form
const studentname= document.getElementById('studentname')
const studies= document.getElementById('studies')
const lengthofstudy= document.getElementById('lengthofstudy')
const dateofcompletion = document.getElementById('dateofcompletion')
const addstudent= document.getElementById('addstudent')

// Verify Employee or Student

const employeekey= document.getElementById('employeekey')
const studentid = document.getElementById('studentid')
const findemployeeinfo= document.getElementById('findemployeeinfo')
const findstudentinfo= document.getElementById('findstudentinfo')
const results= document.getElementById('results')




// Contract Section
let contractInitialized = false;
let dcheck = undefined;




const initialize = () => {
    //Metamask Connection Section
    const MetaMaskClientCheck = () => {
        //Now we check to see if MetaMask is installed
        if (!isMetaMaskInstalled()) {
            //If it isn't installed we ask the user to install it
            connectwithMetamask.innerText = 'Install MetaMask Plugin!';
        } else {
            //If it is installed we change our button text
            //connectwithMetamask.innerText = 'Connect';
            //When the button is clicked we call this function to connect the users MetaMask Wallet
            connectwithMetamask.onclick = onClickConnect;
            //The button is now disabled
            connectwithMetamask.disabled = false;


        // adding an employee Form Button 
            submitemployee.onclick = addemployee; 

        
        // adding student Form Button 
        addstudent.onclick = submitstudent; 

        //verify student or employee  Form Button 

findemployeeinfo.onclick =searchemployee;
findstudentinfo.onclick =searchstudent;


          

            ethereum.on('chainChanged', handleNewChain)
            ethereum.on('networkChanged', handleNewNetwork)
            ethereum.on('accountsChanged', handleNewAccounts)

        }
    };

    MetaMaskClientCheck();
    
    
    
};

const onClickConnect = async () => {
    try {
        console.log('test')
        const newAccounts = await ethereum.request({ method: 'eth_requestAccounts', })
        handleNewAccounts(newAccounts)
        networkId = await getNetworkAndChainId();
        
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            
            initContracts(networkId);
        }

    } catch (error) {
      console.error(error)
    }
}

// Adding an Employee
const addemployee = async () => { 
    try {
        let empname = employeename.value;
        let emplrname = employername.value;
        let empdsg = employeedesignation.value;
        let lengthofservices = los.value;
        await dcheck.methods.addemployeeinfo(empname, emplrname, empdsg, lengthofservices).send({from: accounts[0]}, function(error, result){
            alert('Employee added successfully ! ');
            console.log(result);
        });

    } catch (error) {
        alert( `Fail to add an employee`);
        console.error(error)
    }
}

// Add Student 

const submitstudent = async () => { 
    try {
        let stuname = studentname.value;
        let stdy = studies.value;
        let lofstudy = lengthofstudy.value;
        let completiondate = dateofcompletion.value;
        await dcheck.methods.addstudent(stuname, stdy, lofstudy, completiondate).send({from: accounts[0]}, function(error, sinfo){
            alert('Student added successfully ! ');
            console.log(sinfo);
        });

    } catch (error) {
        alert( `Fail to add student`);
        console.error(error)
    }
}
// Search Employee 
const searchemployee = async () => { 
    try {
        let key =    employeekey.value;     
        await dcheck.methods.findemployee(key).send({from: accounts[0]},

            function(error, result){             
           dcheck.events.allEvents( {fromBlock: "latest", toBlock: "latest" }, function(error, event){ 
        // console.log("generic_callback :", event); 
    }).on("connected", function(subscriptionId){
        console.log("on Connected :",subscriptionId);
    }).on('data', function(event){
        console.log("on Data :",event);
        results.innerHTML = event.returnValues[1];

        
    }).on('error', function(error, receipt) { 
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log("on error :",error); 
    });
           
            console.log(result);
        });

    } 
    
    catch (error) {
        alert( `Failed to retrieve value`);
        console.error(error)
    }
}

// Search student
const searchstudent = async () => { 
    try {
        let sid = studentid.value;     
        await dcheck.methods.findstudent(sid).send({from: accounts[0]},
            
            function(error, result){             
                dcheck.events.allEvents( {fromBlock: "latest", toBlock: "latest" }, function(error, event){ 
             // console.log("generic_callback :", event); 
         }).on("connected", function(subscriptionId){
             console.log("on Connected :",subscriptionId);
         }).on('data', function(event){
             console.log("on Data :",event);
             results.innerHTML = event.returnValues[1];
     
             
         }).on('error', function(error, receipt) { 
             // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
             console.log("on error :",error); 
         });
                
                 console.log(result);
             });
     
         } 
         
    catch (error) {
        alert( `Failed to retrieve value`);
        console.error(error)
    }
}


function handleNewAccounts (newAccounts) {
    accounts = newAccounts
    accountsDiv.innerHTML = accounts
}

const isMetaMaskConnected = () => accounts && accounts.length > 0

function handleNewChain (chainId) {
    chainIdDiv.innerHTML = chainId
}
function handleNewNetwork (networkId) {
    networkDiv.innerHTML = networkId
}

async function getNetworkAndChainId () {
    let networkId = undefined
    try {
      const chainId = await ethereum.request({
        method: 'eth_chainId',
      })
      handleNewChain(chainId)

      networkId = await ethereum.request({
        method: 'net_version',
      })
      handleNewNetwork(networkId)
    } catch (err) {
      console.error(err)
    }
    return networkId;
}

async function initContracts(networkId) {
    if(contractInitialized == false){

        $.getJSON('dcheck.json', function(data) {

            try {
                console.log('Hello')
                // Get the contract instance.
                const deployedNetwork = data.networks[networkId];
                
                dcheck = new web3.eth.Contract( data.abi, deployedNetwork.address );
                console.log('hello world')
                contractInitialized = true;


                // console.log("simpleStorage:",simpleStorage);

                subscribe();
                console.log('toronto')
            } catch (error) {
                // Catch any errors for any of the above operations.
                alert( `Failed to load web3, accounts contracts. Check console for details.`);
                console.log(error);
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', initialize);






function subscribe(){
    dcheck.events.allEvents( {fromBlock: "latest", toBlock: "latest" }, function(error, event){ 
        // console.log("generic_callback :", event); 
    }).on("connected", function(subscriptionId){
        console.log("on Connected :",subscriptionId);
    }).on('data', function(event){
        console.log("on Data :",event);
        
    }).on('error', function(error, receipt) { 
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log("on error :",error); 
    });
}
