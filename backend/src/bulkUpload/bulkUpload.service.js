const db = require('../../models/index');
const ExcelJS = require("exceljs");
const path = require("path");

const { BadRequestError, DataNotFoundError } = require('../../utils/customError');


exports.addBulkUpload = async (reqFiles, userId) => {
    const file = reqFiles.file[0];
    const filePath = file.path;
    const data = await createBulkUploadData(filePath);

    // create bulk upload data
    const bulkUpload = await db.bulkUpload.create({
      userId: userId,
      fileId: file.filename,
      filePath,
      extention: path.extname(file.originalname),
      status : 'Pending'
    });
    const bulkCreateRecord = await db.user.insertMany(data);
    let status = "Failed";
    if (bulkCreateRecord && bulkCreateRecord.length > 0) {
      status = "Success";
    }
  
    // update the status in bulkUpload
    await db.bulkUpload.findOneAndUpdate(
        { _id : bulkUpload.id },
        {status : status}
    );

    if(status == "Failed"){
        throw new BadRequestError("Failed to bulkUpload the records");
    }
    return {
        error: false,
        result: 'bulkUpload created successfull'
    };
};

exports.getUploadDetails = async (userId) => {
    const result = await db.bulkUpload.find({
      userId : userId
    });
  
    if (!result && result.length == 0) {
      throw new DataNotFoundError("No data found");
    }
  
    for (let file of result) {
      result.filePath = `${process.env.URL}${file.filePath.replace("public", "")}`;
    }
    return {
        message :"Upload details fetch successfully",
        data : result
    };
};

exports.exportFileById = async (id) => {
  const result = await db.bulkUpload.findOne({
    _id : id
  });

  if (!result && result.length == 0) {
    throw new DataNotFoundError("No data found");
  }
  return {
      message :"Upload details fetch successfully",
      data : result,
      export : `${process.env.BASE_URL}/uploads/${result.fileId}`
  };
};

async function createBulkUploadData(filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(1);
    const data = [];
    const obj = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: "",
    };
    const keys = Object.keys(obj);
    addValuesToData(sheet, keys, data);
    return data;
}

function addValuesToData(sheet, keys, data) {
    for (let rowNumber = 2; rowNumber <= sheet.lastRow.number; rowNumber++) {
      const obj = {};
      for (
        let columnNumber = 1;
        columnNumber <= sheet.lastColumn.number;
        columnNumber++
      ) {
        const headerCell = sheet.getCell(1, columnNumber);
        const cell = sheet.getCell(rowNumber, columnNumber);
        if (headerCell && keys.includes(headerCell.value)) {
          obj[headerCell.value] = cell.value;
        }
      }
      data.push(obj);
    }
}