//Declare variables
const exp = require('express');
const mysql = require('mysql');
const body_parser = require('body-parser');
    //var request = require("request");

const app = exp();

//establish server connection
var port_number = app.listen(process.env.PORT || 3001);
    //app.listen(port_number);
app.listen(port_number,function(){
    console.log("server running")
});

//Establish mysql connection
const con = mysql.createConnection(
    {
        host: "remotemysql.com",
        user: "U42YZEoduq",
        password: "fqjtJdxvdY",
        port: 3306,
        database: "U42YZEoduq",
    }
);

//json encoded
app.use(body_parser.urlencoded({
    extended: true
}));

// accept json 
app.use(body_parser.json());

//mysql connection status
if(con)
{
    console.log("connection success");
}
else
{
   console.log("connection failed"); 
}
app.get('/',function(req,res){
    res.send(' page is ')
});

//signup
app.post('/Register',function(req,res){
console.log("register trigger");
//get data from app
    var username = req.body.username;
    var aadharno = req.body.aadharno;
    var phoneno = req.body.phoneno;
    var usertype = req.body.usertype;
    var motorid = req.body.motorid;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;
    var licid = req.body.licid;

    if(username!=undefined && aadharno!=undefined && phoneno!=undefined && usertype!=undefined && password!=undefined && confirmpassword!=undefined)
    {
//usertype = farmer
     if(usertype=="F")
      {
          if(motorid!=undefined)
          {
          console.log(username)
//checking aadharNo
          con.query("select * from U42YZEoduq.FarmerDetail where aadharNo='"+aadharno+"'",function(err,re){
              if(err)
              {
                  throw err;
              }
              else
              { 
                  console.log(re.length)
                  if(re.length)
                  {
//user alread registered
                  res.send("user already registered");
          console.log("user already registered")  
          
                  }
                  else{
//checking password = confirmpassword
                      if(password==confirmpassword)
                      {
                    console.log("read user details")
//store data into database
                     con.query("insert into U42YZEoduq.FarmerDetail(userName,aadharNo,phoneNo,usertype,motorId,password,confirmPassword) values('"+username+"','"+aadharno+"','"+phoneno+"','"+usertype+"','"+motorid+"','"+password+"','"+confirmpassword+"');",function(e,r){
                        
                     
                     if(e)
                          {
                              throw e;
                          }
                          else{
                           console.log("query executed sucess for farmer")
                           res.send("1")
                           
                           //con.query("select (temperature,humidity,moisture) from U42YZEoduq.FarmerAccount where motorId'"+motorid+"'",)
                          }
                      })
                   // }

                   

                    }
//password != confirmpassword        
                    else
                    {
                        res.send("password does not match");
                        console.log("password does not match");
                    }
                    
                  }
        }
        
          })
        }
        else{
            res.send("field empty");
            console.log("field empty");
        }
        }
//saler
        else if(usertype=="S")
        {
            if(licid!=undefined)
            {
//checking aadharno
            con.query("select * from U42YZEoduq.SellerDetails where aadharNo='"+aadharno+"'",function(err,re){
                if(err)
                {
                    throw err;
                }
                else
                { console.log(re.length)
                    if(re.length)
                    {
 //user alread registered
                    res.send("user already registered");
            console.log("user already registered")  
            
                    }
                    else{
//checking password = confirmpassword
                        if(password==confirmpassword)
                        {
                      console.log("read user details")
//store data into database
                       con.query("insert into U42YZEoduq.SellerDetails(userName,aadharNo,phoneNo,usertype,licId,password,confirmPassword) values('"+username+"','"+aadharno+"','"+phoneno+"','"+usertype+"','"+licid+"','"+password+"','"+confirmpassword+"');",function(e,r){
                          
                       
                       if(e)
                            {
                                throw e;
                            }
                            else{
                             console.log("query executed sucess for farmer")
                             res.send("1")
                            }
                        })
                    
  
                     
  
                      }
//password != confirmpassword
                      else
                      {
                          res.send("password does not match");
                          console.log("password does not match");
                      }
                      
                    }
          }
          
            }) 
        }
        else{
            res.send("field empty");
            console.log("field empty");
        } 
        }
//user type not found
        else{
            res.send("user type not found");
            console.log("user type not found");
        }
    }
    else
    {
        res.send("fields empty");
        console.log("fields empty");
    }
        })


//login
app.post("/Login",function(req,res){
    var aadharno = req.body.aadharno;
    var password = req.body.password;
    var usertype = req.body.usertype;
    //res.send("login trigged")
    console.log("login trigged")
//farmer
    if(usertype=="F")
    {
//cheking aadhar no found
con.query("select * from U42YZEoduq.FarmerDetail where aadharNO ='"+aadharno+"' ",function(err,resu){
    if(err){
        throw err;
    }
    else
    {
        if(resu.length)
        {
//checking aadhar no and password match
            con.query("select * from U42YZEoduq.FarmerDetail where aadharNO='"+aadharno+"' and password='"+password+"'",function(e,r){
                if(e){
                    throw e;
                }
                else
                {
                    if(r.length){
//aadhar and password match sucess
                  // res.send("1")
                    console.log("open account")
                   con.query("select temperature,humidity,moisture from U42YZEoduq.FarmerAccount where motorId IN (select motorId from U42YZEoduq.FarmerDetail where aadharNO='"+aadharno+"') ",function(erra,resulta)
                           {
                               if(erra)
                               {
                                   throw(erra)
                               }
                               else{
                                   if(resulta.length)
                                   {var out=[];
                                       console.log("motor found");
                                       out.push("1")
                                       //for(var i = 0; i<resulta.length; i++ ){     
                                       // out.push(res[i]);
                                       console.log(resulta);
                                       console.log(resulta[0]);
                                    out.push(resulta[0].temperature)
                                      out.push(resulta[0].humidity)
                                      out.push(resulta[0].moisture)
                                      console.log(out[0]);
                                      console.log(out[1])
                                      console.log(out[2])
                                      console.log(out[3]);
                                      console.log(out);
                                      res.send(resulta[0]);

                            //}
                                  //res.render('user-list', { title: 'User List', userData: data})
                                 // res.send("1");
                                   }
                                   else
                                   {
                                       console.log("motor not found")
                                       res.send("buy motor")
                                   }
                               }
                           })
                    }
//password not match
                    else{
                        res.send("incorrect passwored")
                        console.log("incorrect password")
                    }
                }
            })
        }
        else{
//aadhar no not register
            console.log("user not registered")
            res.send("user not registered")
        }
    }
})
}
//saler
else if(usertype=="S")
{
//checking aadharno found
    con.query("select * from U42YZEoduq.SellerDetails where aadharNO ='"+aadharno+"' ",function(err,resu){
        if(err){
            throw err;
        }
        else
        {
            if(resu.length)
            {
//checking aadharno and password match
                con.query("select * from U42YZEoduq.SellerDetails where aadharNO='"+aadharno+"' and password='"+password+"'",function(e,r){
                    if(e){
                        throw e;
                    }
                    else
                    {
                        if(r.length){
                        res.send("1")
//aadharno and password match success
                        console.log("open account")
                        }
                        else{
//password not match
                            res.send("incorrect passwored")
                            console.log("incorrect password")
                        }
                    }
                })
            }
            else{
//aadhar no not register
                console.log("user not registered")
                res.send("user not registered")
            }
        }
    })
}
//admin
else if(usertype=="A")
{
//checking aadhar no found
    con.query("select * from U42YZEoduq.Admin where aadharNO ='"+aadharno+"' ",function(err,resu){
        if(err){
            throw err;
        }
        else
        {
            if(resu.length)
            {
//checking aadharno and password match
                con.query("select * from U42YZEoduq.Admin where aadharNO='"+aadharno+"' and password='"+password+"'",function(e,r){
                    if(e){
                        throw e;
                    }
                    else
                    {
                        if(r.length){
//aadharno and password match success
                        res.send("1")
                        console.log("open account")
                        }
                        else{
//password not match
                            res.send("incorrect passwored")
                            console.log("incorrect password")
                        }
                    }
                })
            }
            else{
//aadharno not register
                console.log("user not registered")
                res.send("user not registered")
            }
        }
    })
}
else{
//user type not found
    res.send("user type not found");
    console.log("user type not found");
}


})

