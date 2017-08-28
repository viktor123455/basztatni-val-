"use strict";
function json_getUser(username, password){
    var userkey = username+password;
    var objGet = {
        REQUEST:{
        COMMAND:"GETTABLE",
        TRNUMBER:"658930",
        DATE:"2017.03.27 15:40:40",
        SYSKOD:"15"
        },
        CMD:[{
            COMMAND:"GET",
            TABLE:[{
                NAME:"fxuser",
                ORDER:3,
                KEY:username,
                DATA:[{
                    FIELDS:"UGYKOD,UGYNEV,JELSZO,LANKOD,LETILT"
                }]
            }]
        }]
    }

    return objGet;
}

/***
 * ha van order akkor KEY-nek meg kell adni az erteket
 * ha nincs megadva order akkor KEYFIELD="kereendo mezo neve" es utana a KEY szakasz
 * 
 */
function json_getData(table,fields, order = 0, keyfields = '', key = '', forfeltetel = ''){
    var TABLE;

    if(order == 0){//ha nincs megadva order...
        if(keyfields != ""){//..akkor megnezem hogy nem e ures a kivant mezok listaja....
            if(key != ""){//...ha nem ures a kivant mezok listaja akkor megnezem, hogy az adott kulcsok "string"-je nem e ures
                TABLE = [{//ha nem ures akkor a table blokkot fel lehet tolteni
                NAME:table,
                ORDER:order,
                KEYFIELDS: keyfields,
                KEY: key,
                EXCLUSIVE:0,
                    DATA:[{
                    FIELDS:fields
                    }]
                }]
            }else{
                console.log(table + "ures  a kulcs adat lekeres kozben");
            }

        }else{
            console.log(table + "ures keyfield adat lekeres kozben");
        }
    }else{//ha van order akkor a megadott kulcs szerint keresunk.
        if(forfeltetel != ""){//ha van megadva for feltetel
            TABLE = [{
                NAME:table,
                ORDER:order,
                KEY: key,
                EXCLUSIVE:0,
                FOR:forfeltetel,
                DATA:[{
                    FIELDS:fields
                }]
            }]            
        }else{
            TABLE = [{
                NAME:table,
                ORDER:order,
                KEY: key,
                EXCLUSIVE:0,
                DATA:[{
                    FIELDS:fields
                }]
            }]
        }

    }

    var objGet = {
        REQUEST:{
        COMMAND:"GETTABLE",
        TRNUMBER:"658930",
        DATE:"2017.03.27 15:40:40",
        SYSKOD:"15"
        },
        CMD:[{
            COMMAND:"GET",
            TABLE
        }]
    }
    return objGet;
}

/**uj elem hozzadasa */
function json_appendData(table,fields, order = 0){
    var data = fields;

    var array = [];//egy tombbe osszeszedem a kulcs-ertek parokat
    for(var name in data){
        array.push(name+":"+data[name]);
    }

    var DATA = addDataBlock(fields);

    var objAppend = {
        REQUEST:{
        COMMAND:"SETTABLE",
        TRNUMBER:"658930",
        DATE:"2017.03.27 15:40:40",
        SYSKOD:"15"
        },
        CMD:[{
            COMMAND:"APPEND",
            TABLE:[{
                NAME:table,
                ORDER:order,
                DATA
            }]
        }]
    }
    return objAppend;
}

/**table = adatbazis neve; fields = milyen mezokbe mit irunk; order = rendezes; keyfields = milyen mezok szerint keres; key = mezo adatok */
function json_replaceData(table,fields, order = 0, keyfields = '', key){

    var DATA = addDataBlock(fields);//fields adatainak feldolgozasa
    var TABLE;//ez lesza json TABLE szakasz ami lenteb van feltoltve

    if(order == 0){//ha nincs megadva order...
        if(keyfields != ""){//..akkor megnezem hogy nem e ures a kivant mezok listaja....
            if(key != ""){//...ha nem ures a kivant mezok listaja akkor megnezem, hogy az adott kulcsok "string"-je nem e ures
                TABLE = [{//ha nem ures akkor a table blokkot fel lehet tolteni
                NAME:table,
                ORDER:order,
                KEYFIELDS: keyfields,
                KEY: key,
                EXCLUSIVE:0,
                DATA
                }]
            }else{
                console.log("ures  a kulcs adat modositas kozben");
            }

        }else{
            console.log("ures keyfield adat modositas kozben");
        }
    }else{//ha van order akkor a megadott kulcs szerint keresunk.
         TABLE = [{
            NAME:table,
            ORDER:order,
            KEY: key,
            EXCLUSIVE:0,
            DATA
        }]
    }

    var objReplace = {
        REQUEST:{
        COMMAND:"SETTABLE",
        TRNUMBER:"658930",
        DATE:"2017.03.27 15:40:40",
        SYSKOD:"15"
        },
        CMD:[{
            COMMAND:"REPLACE",
            TABLE
        }]
    }

    return objReplace;
}

/*REKORD TORLES*table = adatbazis neve; order = rendezes; keyfields = milyen mezok szerint keres; key = mezo adatok */
function json_deleteData(table,order = 0, keyfields = '', key){

    var TABLE;//ez lesza json TABLE szakasz ami lenteb van feltoltve

    if(order == 0){//ha nincs megadva order...
        if(keyfields != ""){//..akkor megnezem hogy nem e ures a kivant mezok listaja....
            if(key != ""){//...ha nem ures a kivant mezok listaja akkor megnezem, hogy az adott kulcsok "string"-je nem e ures
                TABLE = [{//ha nem ures akkor a table blokkot fel lehet tolteni
                NAME:table,
                ORDER:order,
                KEYFIELDS: keyfields,
                KEY: key,
                EXCLUSIVE:0,
                DATA:[{//azert kell fiktiv data szakasz, mert egyebkent nem hejtja vegre tivadar, ha ez nincs
                     "X": "Y"
                    }]
                }]
            }else{
                console.log("ures  a kulcs adat modositas kozben");
            }

        }else{
            console.log("ures keyfield adat modositas kozben");
        }
    }else{//ha van order akkor a megadott kulcs szerint keresunk.
         TABLE = [{
            NAME:table,
            ORDER:order,
            KEY: key,
            EXCLUSIVE:0,
            DATA:[{//azert kell fiktiv data szakasz, mert egyebkent nem hejtja vegre tivadar, ha ez nincs
                "X": "Y"
            }]
        }]
    }

    var objDelete = {
        REQUEST:{
        COMMAND:"SETTABLE",
        TRNUMBER:"658930",
        DATE:"2017.03.27 15:40:40",
        SYSKOD:"15"
        },
        CMD:[{
            COMMAND:"DELETE",
            TABLE
        }]
    }

    return objDelete;
}

function addDataBlock(array){
    var objData = [];var element = {};
    for(var key in array){
        element[key] = array[key];
    }
     objData.push(element);
    return objData;
}

