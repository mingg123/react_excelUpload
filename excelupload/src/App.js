import { useState } from "react";
import * as XLSX from "xlsx";
import "./App.css";

function App() {
  const [excelData, setExcelData] = useState([]);

  const excelExport = (event) => {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result;
      console.log("fileData", fileData);
      const wb = XLSX.read(fileData, { type: "binary" });
      wb.SheetNames.forEach((sheetName) => {
        const rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
        console.log("123456", rowObj);
        setExcelData(rowObj);
      });
    };
    reader.readAsBinaryString(input.files[0]);
  };

  return (
    <div className="App">
      <input type="file" onChange={excelExport} />
      {excelData.length > 0 && excelData[0].포스키이름}
    </div>
  );
}

export default App;
