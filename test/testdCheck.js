const dCheck = artifacts.require("dcheck");
const dCheckToken =artifacts.require('dCheckToken');
const truffleAssert = require("truffle-assertions");

contract('Testing dCheck Contract', (accounts) => {

  let firstaccount = accounts[0];
  let secondaccount = accounts[1];

 


  it('Adding an employee', async () => {
    const token = await dCheckToken.deployed();
    const dccontract = await dCheck.deployed();
    await token.approve(dccontract.address, web3.utils.toWei('100','ether'), {from: secondaccount})


   
    let response = await dccontract.addemployeeinfo("A", "B", "C", "D", {from: secondaccount});
      response = await dccontract.addemployeeinfo("Q", "R", "S", "T", {from: secondaccount});
      response = await dccontract.addemployeeinfo("E", "F", "G", "H", {from: secondaccount});
      response = await dccontract.addemployeeinfo("I", "J", "K", "L", {from: secondaccount});
        response = await dccontract.addemployeeinfo("M", "N", "O", "P", {from: secondaccount});

     

      truffleAssert.eventEmitted(response, 'employeeadded', (ev) => {

        return ev[0] == secondaccount && ev[1] [0] == "M" && ev[1] [1] == "N" && ev[1] [2] =="O" && ev[1] [3]== "P";
      
      });

  }); 


  it('Adding a student', async () => {
    const token = await dCheckToken.deployed();
    const dccontract = await dCheck.deployed();
    await token.approve(dccontract.address, web3.utils.toWei('100','ether'), {from: secondaccount})


   
    let response = await dccontract.addstudent("P", "Q", "R", "S", {from: secondaccount});
    response = await dccontract.addstudent("U", "V", "W", "X", {from: secondaccount});
      response = await dccontract.addstudent("Y", "Z", "AA", "BB", {from: secondaccount});
      response = await dccontract.addstudent("CC", "DD", "EE", "FF", {from: secondaccount});
        response = await dccontract.addstudent("GG", "HH", "II", "JJ", {from: secondaccount});

      //console.log(response);

      truffleAssert.eventEmitted(response, 'studentadded', (ev) => {
        //console.log(ev[1] [0]);
        //console.log(secondaccount);
        return ev[0] == secondaccount && ev[1] [0] == "GG" && ev[1] [1] == "HH" && ev[1] [2] =="II" && ev[1] [3]== "JJ";
      
      });

  }); 

  it('Search employee', async () => {
    const token = await dCheckToken.deployed();
    const dccontract = await dCheck.deployed();
    let response =  await token.approve(dccontract.address, web3.utils.toWei('100','ether'), {from: secondaccount})

    response = await dccontract.addemployeeinfo("A", "B", "C", "D", {from: secondaccount});
  

    //search employeee
    let employee = await dccontract.findemployee( 0, {from: secondaccount});
   
    //let response = await dccontract.findemployee( 0, {from: secondaccount});

    // console.log("employee test");

    //   console.log(employee.logs[0].args[2]);

      truffleAssert.eventEmitted(employee, 'searchemployee', (ev) => {
        // console.log(ev[1] [0]);
        // console.log(secondaccount);
         return ev[0] == secondaccount && ev[1] [0] == "A" && ev[1] [1] == "B" && ev[1] [2] =="C" && ev[1] [3]== "D";
      
       });


      

  }); 
 
  it('Search student', async () => {
    const token = await dCheckToken.deployed();
    const dccontract = await dCheck.deployed();
    let response =  await token.approve(dccontract.address, web3.utils.toWei('100','ether'), {from: secondaccount})

    response = await dccontract.addstudent("P", "Q", "R", "S", {from: secondaccount});
  

    //search employeee
    let student = await dccontract.findstudent( 0, {from: secondaccount});
   
    

    // console.log("student test");

    //   console.log(student.logs[0].args[2]);

      truffleAssert.eventEmitted(student, 'searchstudent', (ev) => {
        console.log(ev[1] [0]);
        console.log(secondaccount);
         return ev[0] == secondaccount && ev[1] [0] == "P" && ev[1] [1] == "Q" && ev[1] [2] =="R" && ev[1] [3]== "S";
      
       });


      

  }); 

  it('Adding employees, sending error', async () => {
    const token = await dCheckToken.deployed();
    const dccontract = await dCheck.deployed();
    await token.approve(dccontract.address, web3.utils.toWei('100','ether'), {from: secondaccount});


      await truffleAssert.reverts(
        dccontract.addemployeeinfo( "A", 1, 2, "D", {from: secondaccount}),null,
        "Error "
    );

  });

})

