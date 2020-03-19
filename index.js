//Declare variables
const exp = require('express');
const mysql = require('mysql');
const body_parser = require('body-parser');
//var request = require("request");

const app = exp();

//server listen
var port_number = app.listen(process.env.PORT || 3001);
//app.listen(port_number);
app.listen(port_number,function(){
    console.log("server running")
});

//Establish connection
const con = mysql.createConnection(
    {
        host: "remotemysql.com",
        user: "U42YZEoduq",
        password: "fqjtJdxvdY",
        port: 3306,
        database: "U42YZEoduq",
    }
);

// accept url encoded
app.use(body_parser.urlencoded({
    extended: true
}));

// accept json 
app.use(body_parser.json());

//connection success or failed
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
    var username = req.body.username;
    var aadharno = req.body.aadharno;
    var phoneno = req.body.phoneno;
    var usertype = req.body.usertype;
    var motorid = req.body.motorid;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;
    var licid = req.body.licid;
     if(usertype=="F")
      {
          con.query("select * from U42YZEoduq.FarmerDetail where aadharNo='"+aadharno+"'",function(err,re){
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
                    
                      if(password==confirmpassword)
                      {
                    console.log("read user details")
                    
                     con.query("insert into U42YZEoduq.FarmerDetail(userName,aadharNo,phoneNo,usertype,motorId,password,confirmPassword) values('"+username+"','"+aadharno+"','"+phoneno+"','"+usertype+"','"+motorid+"','"+password+"','"+confirmpassword+"');",function(e,r){
                        
                     
                     if(e)
                          {
                              throw e;
                          }
                          else{
                           console.log("query executed sucess for farmer")
                           res.send("1")
                          }
                      })
                   // }

                   

                    }
                    
                    else
                    {
                        res.send("password does not match");
                        console.log("password does not match");
                    }
                    
                  }
        }
        
          })
    
        }
        else if(usertype=="S")
        {
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
                        //read user details
                        if(password==confirmpassword)
                        {
                      console.log("read user details")
                      
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
            res.send("user type not found");
            console.log("user type not found");
        }
      
        })
    
        //login
app.post("/Login",function(req,res){
    var username = req.body.name;
    var password = req.body.password;
    //res.send("login trigged")
    console.log("login trigged")
    if(usertype=="F")
    {
con.query("select * from U42YZEoduq.FarmerDetail where aadharNO ='"+aadharno+"' ",function(err,resu){
    if(err){
        throw err;
    }
    else
    {
        if(resu.length)
        {
            con.query("select * from U42YZEoduq.FarmerDetail where aadharNO='"+aadharno+"' and password='"+password+"'",function(e,r){
                if(e){
                    throw e;
                }
                else
                {
                    if(r.length){
                    res.send("1")
                    console.log("open account")
                    }
                    else{
                        res.send("incorrect passwored")
                        console.log("incorrect password")
                    }
                }
            })
        }
        else{
            console.log("user not registered")
            res.send("user not registered")
        }
    }
})
}
else if(usertype=="S")
{
    con.query("select * from U42YZEoduq.SellerDetails where aadharNO ='"+aadharno+"' ",function(err,resu){
        if(err){
            throw err;
        }
        else
        {
            if(resu.length)
            {
                con.query("select * from U42YZEoduq.SellerDetails where aadharNO='"+aadharno+"' and password='"+password+"'",function(e,r){
                    if(e){
                        throw e;
                    }
                    else
                    {
                        if(r.length){
                        res.send("1")
                        console.log("open account")
                        }
                        else{
                            res.send("incorrect passwored")
                            console.log("incorrect password")
                        }
                    }
                })
            }
            else{
                console.log("user not registered")
                res.send("user not registered")
            }
        }
    })
}
else if(usertype=="A")``
{
    con.query("select * from U42YZEoduq.Admin where aadharNO ='"+aadharno+"' ",function(err,resu){
        if(err){
            throw err;
        }
        else
        {
            if(resu.length)
            {
                con.query("select * from U42YZEoduq.Admin where aadharNO='"+aadharno+"' and password='"+password+"'",function(e,r){
                    if(e){
                        throw e;
                    }
                    else
                    {
                        if(r.length){
                        res.send("1")
                        console.log("open account")
                        }
                        else{
                            res.send("incorrect passwored")
                            console.log("incorrect password")
                        }
                    }
                })
            }
            else{
                console.log("user not registered")
                res.send("user not registered")
            }
        }
    })
}

})

