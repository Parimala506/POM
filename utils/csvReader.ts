import fs from 'fs' ;
//filesystem module this comes from node and this is require for reading file from our project 
// import path from 'path';

import { parse } from 'csv-parse/sync';
// csv-parse is a third party library (needs npm install)
// sync means it reads the file synchronously (waits to finish before moving on)
// parse is the function that converts raw CSV content into usable data
// npm install csv-parse xlsx - commmand for CSV and EXCEL


export function readCSV(filePath: string) {
    // Creates a reusable function called readCSV
    // export means other files can import and use this function
    // filePath: string — accepts the path to your CSV file as input

// or we can use it in different way , 
// const fullpath = path.resolve(filePath); //we use this path.resolve To convert relative path → absolute path
// consoe.log('full path path', fullpath)


    const fileCotent = fs.readFileSync(filePath);
    // readFileSync — reads the CSV file from the given path
    // Returns the raw file content (not yet usable data, just raw text)

    const records = parse(fileCotent, {
        columns: true, //Converts rows into objects using header names
        skip_empty_lines: true
        // parse() — converts raw CSV text into a JavaScript array of objects
        // columns: true — treats the first row as column headers/keys
        // skip_empty_lines: true — ignores blank lines in the CSV


    });
    return records;
    // Returns the parsed data (array of objects) back to whoever calls this function
}


// overalflow :
// CSV File → fs.readFileSync() → raw text → parse() → array of objects → returned

// // Example — if your CSV looks like:
// username,password,expected
// standard_user,secret_sauce,success
// locked_out_user,secret_sauce,error
// After parse() it becomes:
// typescript[
//   { username: "standard_user", password: "secret_sauce", expected: "success" },
//   { username: "locked_out_user", password: "secret_sauce", expected: "error" }
// ]