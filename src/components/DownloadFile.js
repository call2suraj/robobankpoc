import { JsonToExcel } from "react-json-to-excel";

/*  
This file is the download component. Pass the data object to download as .xls file.

@author : Suraj Behera

*/
export default function DownloadFile(props) {
    return (
       <JsonToExcel
        title="Download as Excel"
        data={props.data}
        fileName="sample-file"
      />
    );
}