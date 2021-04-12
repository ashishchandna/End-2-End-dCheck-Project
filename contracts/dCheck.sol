
// "SPDX-License-Identifier: UNLICENSED"

pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;
import "./dCheckToken.sol"; 


contract dcheck{
    
    dCheckToken instance; 
    address  owner; 
    
    constructor ( address _instance ){
        instance = dCheckToken(_instance);
        owner = msg.sender;}
    
// ********Mappings *********

    
    // Employee mapping 
    mapping (uint => employeeinfo) employee;
    uint employeeKey= 0;
    
    // Student Mappings
    mapping (uint => studentinfo)  student; 
    uint studentkey = 0; 

//*****************Structs ******************
    //employee structs 

    struct employeeinfo{
    
        string employeename;
        string employername;
        string employeedesignation;
        string employeetenure; }
    
    struct studentinfo{
        
        string studentName;
        string program;
        string duration;
        string graduationtime; }
        
///*************Events ******************

event employeeadded(address ,employeeinfo); 
event studentadded(address ,studentinfo); 
event searchemployee(address,employeeinfo);
event searchstudent(address,studentinfo);
        
//********************************Functions ***************************

//******************************Employee functions********************* 


//******************* Adding Employees ****************************
    
function addemployeeinfo( string memory _employeename, string memory _employername, string memory _employeedesignation, string memory _employeetenure) public {
require(bytes(_employeename).length > 0  && bytes(_employername).length > 0 && bytes(_employeedesignation).length > 0 && bytes(_employeetenure).length > 0 , "Cannot pass empty strings");
    employee[employeeKey] = employeeinfo(_employeename, _employername, _employeedesignation, _employeetenure);
    instance.transferFrom(owner,msg.sender, 1*10**18);
     emit employeeadded(msg.sender, employee[employeeKey]); 
    employeeKey++; }
   

//********************Finding Employee******************************

function findemployee(uint empKey) public  returns(employeeinfo memory){
    require (instance.balanceOf(msg.sender) >=5*10**18 , "insufficinet balance");
     instance.transferFrom(msg.sender,owner,5*10**18);
    emit searchemployee(msg.sender,employee[empKey]);
    return employee[empKey]; 
    }


//********************************Studnet function************************* 

//******************adding student *******************
        
function addstudent(string memory _studentName, string memory _program, string memory _duration, string memory _graduationtime) public {
    student[studentkey] = studentinfo(_studentName ,_program, _duration, _graduationtime); 
     instance.transferFrom(owner,msg.sender, 1*10**18);
     emit studentadded(msg.sender, student[studentkey]); 
    studentkey++; }
    

//****************************finding students**************************
    
function findstudent(uint studentId) public  returns(studentinfo memory){
    require (instance.balanceOf(msg.sender) >=5*10**18 , "insufficinet balance");
     instance.transferFrom(msg.sender,owner,5*10**18);
     emit searchstudent(msg.sender,student[studentId]); 
    return student[studentId]; }
}
