import path from 'path';
import { readCSV } from '../utils/csvReader';
import { readExcel } from '../utils/excelReader';
import fs, { readFileSync } from 'fs';
// import { error } from 'console';

export function readData(filePath: string, sheetName?: string) {
    const ext = path.extname(filePath).toLocaleLowerCase();
    switch (ext) {
        case ".csv":
            console.log(".. I am readng csv..");
            return readCSV(filePath);
        case ".xlsx":
            console.log(".. I am readng excel..");
            return readExcel(filePath, sheetName || 'LoginData');
        case ".json":
            console.log(".. I am readng json..");
            const JSONData = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(JSONData)
        default:
            throw new Error(`unsuppoerted file type - ${ext}`);

    }
}

