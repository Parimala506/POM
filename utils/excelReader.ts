import * as XLSX from 'xlsx';
import  path  from 'path';


export type LoginData = {
    username: string;
    password: string;
    expected: string;
    run: string;
};

export function readExcel(filePath: string, sheetName: string) {

    const fullPath = path.resolve(filePath);
    console.log('path is ', fullPath);

    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
}