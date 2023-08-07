import { JsonToExcel } from "react-json-to-excel";

export default function DownloadFile(props) {
    return (
       <JsonToExcel
        title="Download as Excel"
        data={props.data}
        fileName="sample-file"
      />
    );
}