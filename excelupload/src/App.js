import { useState } from "react";
import * as XLSX from "xlsx";
import "./App.css";

function App() {
  const [excelData, setExcelData] = useState([]);
  const [parseData, setParseData] = useState([]);

  function changeLabel(data) {
    return data === "요율" ? "PERCENTAGE" : "VALUE";
  }

  function changeNullLabel(data) {
    return data === "" ? null : data;
  }

  const excelExport = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result;
      console.log("fileData", fileData);
      const wb = XLSX.read(fileData, { type: "binary" });
      wb.SheetNames.forEach((sheetName) => {
        const rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);

        let parseList = [];
        rowObj.map((row) => {
          const discount =
            row.할인금액 === ""
              ? null
              : {
                  name: row.할인명,
                  value: row.할인금액,
                  type: changeLabel(row.할인유형),
                };
          const newRow = {
            color: changeNullLabel(row.포스키색상),
            label: changeNullLabel(row.포스키이름),
            productInfoId: changeNullLabel(row.상품번호),
            discountInfo: discount,
          };

          parseList.push(newRow);
        });

        setParseData(parseList);
        setExcelData(rowObj);
      });
    };
    reader.readAsBinaryString(input.files[0]);
  };

  return (
    <div className="App">
      <input type="file" onChange={excelExport} />
      {excelData.length > 0 && excelData[0].포스키이름}
      {parseData.toString()}
    </div>
  );
}

export default App;
