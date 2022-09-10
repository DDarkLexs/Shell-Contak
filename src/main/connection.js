"use strict"
const { app } = require("electron")
const path = require('path')
const isDev = require('electron-is-dev')
const sqllite = require('sqlite3')
const sqllite3 = sqllite.verbose()
// const { default: knex } = require("knex")
let dbFile
let db

if(isDev){
    try {
      
        dbFile = path.join(app.getAppPath(),'src','database','database.db')
        db = new sqllite3.Database(dbFile)

    } catch (error) {
        console.log(error)

    }

}else{
    try {

        dbFile = path.join(app.getAppPath(),'..','..','resources','app.asar.unpacked', 'src','database','database.db')
        db = new sqllite3.Database(dbFile)
 
    } catch (error) {
        console.log(error)

    }
    
}






module.exports = class Connection {
  connect () {
    try {
        
        const  knex = require("knex") ({
            client: "sqlite3",
            connection: {
                filename:dbFile,
                connectionTimeout:3000,
                pool:{
                  // afterCreate: (conn,cb) => conn.run('PRAGMA foreign_keys = ON', cb),
                }
              },
            useNullAsDefault: true,
          
        })


        knex.raw("PRAGMA foreign_keys = ON;")
        .then((a) => {
       //  console.log("Verificação de chave estrangeira ativada.");
      });

        return knex
    } catch (error) {
        console.log(error)   
    }
    }

 queryBuilder(script){
    
        return new Promise((resolve,reject) => {
  
          db.each(`${script};`, function(err, row) {
            try {
              
              resolve(row)
  
            } catch (error) {
              
              reject(err)
  
            }
  
        });
  
  
    })
  
  
  
  
  }

  queryBuilderInsert(script) {
  
   return new Promise((resolve,reject) => {
  
     var data = db.run(script,[],function(err,res){
  
       try {
         
         resolve(res)
   
       } catch (error) {
         
         reject(err)
   
       }
     });
  
  
  })
  
  
  
  
  }

  queryBuilderAllData(script) {
  
    return new Promise((resolve,reject) => {
  
      var data = db.all(script,[],function(err,res){
  
        try {
          
          resolve(res)
    
        } catch (error) {
          
          reject(err)
    
        }
      });
  
  
  })
  
  
  
  
  }
}
