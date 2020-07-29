const express = require('express');

const fs = require('fs');

const router = express.Router()
const mySQL = require('mysql');
const { query } = require('express');


router.post('/retrieve', (req, res, next) => {
    const db = mySQL.createPool({
        host: "localhost",
        user: 'root',
        password: '4210',
        database: "testdb"
    });
    let returnData = {};
    db.getConnection((err) => {
        if (err) return err;
        db.query(req.body.query, (err, result) => {
            if (err) return (err);
            console.log(result)
            returnData = result;
            // console.log(result)
            return res.json(returnData)
        });
        // console.log( 'end');

    });
});
router.post('/insert', (req, res, next) => {
    let message = null;
    const db = mySQL.createConnection({
        host: "localhost",
        user: 'root',
        password: '',
        database: "testdb"
    });
    db.query('use testdb', (err, result) => {

    });
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let sql = '';
            let fileData = req.files.file.data.toString().split('\n');
            let tableName = req.body.table;
            let insetType = req.body.insetType;
            if (insetType == 'single') {
                let queay = [];
                var pre_query = new Date().getTime();
                    let count = 0;
                    sql = `${'insert into'} ${tableName}  ${"values ( "}`;
                    for (let index = 0; index < fileData.length; index++) {
                        if (fileData[index].substr(-1) == '\r') {
                            queay = sql + fileData[index].slice(0, -1) + " )";
                        }
                        else {
                            queay = sql + fileData[index] + ")";
                        }
                        db.query(queay, (err, result) => {
                            if (err) throw err;
                        });
    
                    }  
             setTimeout(() => { 
                var post_query = new Date().getTime();
                var duration = (post_query - pre_query) / 1000;
                message = duration;
                console.log(message)
                res.send({
                   status: true,
                   message: message
                 });
                }, 700000);
               
                
            }
            else {
                var pre_query = new Date().getTime();
                let a = 0;
                let b = 0;
                while (a <= fileData.length - 1) {
                    let times = 0;
                    let totalVale = '';
                    while (times < 1000 && b <= fileData.length - 1) {
                        if (fileData[b].substr(-1) == '\r') {
                            if (times === 999) {
                                totalVale = totalVale + "(" + fileData[b].slice(0, -1) + ")";
                            }
                            else {
                                totalVale = totalVale + "(" + fileData[b].slice(0, -1) + "),";
                            }
                        }
                        else {
                            totalVale = totalVale + "(" + fileData[b] + ")";
                        }
                        times++;
                        b++;
                    };
                    let tableColo = [];
                    db.query(`${"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'"}${'players'}${"'"};`, (err, result) => {
                        for (let index = 0; index < result.length; index++) {
                            tableColo.push(result[index].COLUMN_NAME)
                        };
                        // console.log(tableColo);
                        db.end
                    })
                    setTimeout(() => {
                        sql = `${'insert into'} ${tableName} ${'('}${tableColo}${')'} ${'values'} ${totalVale}; `;
                        // console.log('quary', sql)
                        db.query(sql, function (err, result, feilds) {
                            if (err) throw err;

                        })
                    }, 2000);
                    a = a + 1000;

                    // console.log('a', a)

                };

                var post_query = new Date().getTime();
                var duration = (post_query - pre_query) / 1000;
                message = duration;
                res.send({
                    status: true,
                    message: message
                });
            }
            
        }
    } catch (err) {
        res.status(500).send({ err });
    }
});

router.post('/insert-load', (req, res) => {
    let message = null;
    const db = mySQL.createConnection({
        host: "localhost",
        user: 'root',
        password: '',
        database: "testdb"
    });
    try {
        if (!req.body.file) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
           
            let fileData = req.body.file;
            console.log(fileData)
            let tableName = req.body.table;
            var pre_query = new Date().getTime();
            let sql = "LOAD DATA LOCAL INFILE " + "\"" + req.body.file +
            "\"" + " INTO TABLE players FIELDS TERMINATED BY ','" + " OPTIONALLY ENCLOSED BY \"" + "'" + "\"";
            db.query(sql, function (err, result, fields) {
                if (err) throw err;
                /*  Object.keys(result).forEach(function(key) {
            
                }); */
                
                db.query('SHOW WARNINGS', (err, resu) => {
                    console.log(resu)
                })

            });
            var post_query = new Date().getTime();
            var duration = (post_query - pre_query) / 1000;
            message = duration;
            res.send({
                status: true,
                message: message
            })
        }
    } catch (err) {
        res.status(500).send({ err });
    }
})
router.delete('/delete/:id', (req, res, next) => {
    let tableName
    /// Im also trying to dp with dpionPool also
    const db = mySQL.createPool({
        host: "localhost",
        user: 'root',
        password: '',
        database: "testdb"
    });
    switch (req.params.id) {
        case "1":
            tableName = 'players'
            break;
        case "2":
            tableName = 'play'
            break;
        case "3":
            tableName = 'games'
            break;
        case "4":
            tableName = 'teams'
            break;

    }
    // dp.getdpion((err) => {
    //     if (err) return err;
    db.query(`${'Delete from '}${tableName}`, (err, result) => {
        if (err) return err;
        res.json('Successfully deleted')
    });

});


router.post('/max', (req, res, next) => {
    /// Im also trying to connect with ConnectionPool also
    const db = mySQL.createConnection({
        host: "localhost",
        user: 'root',
        password: '',
        database: "testdb"
    });
    let returnData = {};
    let seletedcol = req.body.colName;
    let seletedTable = req.body.table;
    console.log('req.body',req)
    let query = `${'select max('} ${seletedcol} ${') from'} ${seletedTable}`;
    //console.log( query)
    db.query(query, (err, result) => {
        if (err) return err;
        console.log( result)
        res.json(result)
     });
   
});

router.post('/retrive',(req, res,next) =>{
    const db = mySQL.createConnection({
        host: "localhost",
        user: 'root',
        password: '',
        database: "testdb"
    });
    
    let returnData = {};
     let query = `${'select * from '} ${req.body.table} `;
     
         db.query(query, (err, result) => {
            if (err) return err;
            returnData = result;
            
         });
         setTimeout(() => {
            return res.json(returnData)
         }, 1000);
         
})



module.exports = router;