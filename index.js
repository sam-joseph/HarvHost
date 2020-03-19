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


app.post('/Register',function(req,res){
console.log("register trigger");
//res.send("register")
//app.post('/r',function(r,re){
    //res.send("execute")
    //get details from users
   // console.log(req.body);
  //var name='\'name\'';
    var username = req.body.username;
   // console.log("name");
    var aadharno = req.body.aadharno;
    var phoneno = req.body.phoneno;
    var usertype = req.body.usertype;
    var motorid = req.body.motorid;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;
    var licid = req.body.licid;
console.log(username)
//console.log(emailid)
    //Establish query
    //con.query("use sam;",function(error,result){
     // if(error)
     // {
      //    throw error;
    //  }
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
          //con.end();
                  }
                  else{
                      //read user details
                      if(password==confirmpassword)
                      {
                    console.log("read user details")
                    //if(usertype=="F")
                    //{
                     con.query("insert into U42YZEoduq.FarmerDetail(userName,aadharNo,phoneNo,usertype,motorId,password,confirmPassword) values('"+username+"','"+aadharno+"','"+phoneno+"','"+usertype+"','"+motorid+"','"+password+"','"+confirmpassword+"');",function(e,r){
                        //con.query("insert into users(username) values('"+username+"');",function(e,r){ 
                     
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
                    //res.send("read user details")
                   // con.end();
                  }
        }
        
          })
    //  }
    //con.end();
//});}
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
            //con.end();
                    }
                    else{
                        //read user details
                        if(password==confirmpassword)
                        {
                      console.log("read user details")
                      //if(usertype=="F")
                      //{
                       con.query("insert into U42YZEoduq.SellerDetails(userName,aadharNo,phoneNo,usertype,licId,password,confirmPassword) values('"+username+"','"+aadharno+"','"+phoneno+"','"+usertype+"','"+licid+"','"+password+"','"+confirmpassword+"');",function(e,r){
                          //con.query("insert into users(username) values('"+username+"');",function(e,r){ 
                       
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
                      //res.send("read user details")
                     // con.end();
                    }
          }
          
            })  
        }
        else{
            res.send("user type not found");
            console.log("user type not found");
        }
      
        })
    

    /*
     if(usertype=="S")
                    {
                     con.query("insert into U42YZEoduq.SellerDetails(userName,,aadharNo,phoneNo,usertype,licId,password,confirmPassword) values('"+username+"','"+aadharno+"','"+phone+"','"+usertype+"','"+licid+"','"+password+"','"+confirmpassword+"');",function(e,r){
                        //con.query("insert into users(username) values('"+username+"');",function(e,r){ 
                     
                     if(e)
                          {
                              throw e;
                          }
                          else{
                           console.log("query executed sucess")
                           res.send("query executed insert")
                          }
                      })
                    }
    */
//})

//login
//app.get("/login",function(req,res){
  //  res.sendFile(__dirname + '/login.html');
    //res.send('sam');
//})
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
else if(usertype=="A")
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
else{
    res.send("user type not found");
    console.log("user type not found");
}
})

//Establish query for insert  from post method
/*app.post('/register',function(req,res){

    var username = req.body.name;

con.query("use sam;",function(error,result){
    if(error)
    {
throw error;
    }
    else
    {
        con.query("insert into users(username) values('"+username+"');",function(err,resu){
            if(err){
                throw err;
            }
            else{
                console.log('querry executed')
                res.send("query executed")
                
                con.end();
            }
        })
    }
});

});

//Establish query for insert try
con.query("use sam;",function(error,result){
    if(error)
    {
throw error;
    }
    else
    {
        //con.query("select * from users")
        con.query("insert into users(username) values('joseph')",function(err,resu){
            if(err){
                throw err;
            }
            else{
                console.log('querry executed')
            }
        })
    }
})
*/
/*
var username = req.body.name;
    var password = req.body.password;
con.query("select * from U42YZEoduq.users where username ='"+username+"' ",function(err,resu){
    if(err){
        throw err;
    }
    else
    {
        if(resu.length)
        {
            con.query("select * from U42YZEoduq.users where username='"+username+"' and password='"+password+"'",function(e,r){
                if(e){
                    throw e;
                }
                else
                {
                    if(r.length){
                    res.send("open account")
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
*/