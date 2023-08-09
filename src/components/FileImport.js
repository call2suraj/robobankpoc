
import React, { useState } from "react";
import Papa from "papaparse";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DataTable from '../components/DataTable';
import DownloadFile from './DownloadFile';
import '../styles/components/FileImport.css';

// Allowed extensions for input file
const allowedExtensions = ["csv"];

/*  
This file is the main file for importing .csv file and showing the duplicate data with
referance number and wrong end balance. The app will not allow any other file format to
import.

@author : Suraj Behera

*/

export default function FileImport() {

    // This state will store the parsed data from csv
    const [data, setData] = useState([]);
    // This state will store the parsed duplicate data from csv
    const [duplicateData, setDuplicateData] = useState([]);

    const [wrongData, setWrongData] = useState([]);

    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");

    const handleFileChange = (e) => {
        // everytime user select a new file reset all the table data 
        setFile("");
        setError("");
        setData([]);
        setWrongData([]);
        setDuplicateData([]);

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // untill a csv file selected we disable the submit button
            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }
            // If input type is correct set the state
            setFile(inputFile);
        }
    };

    const handleParse = () => {
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            console.log('csv', csv);
            // get the data from csv file
            const parsedData = csv?.data;
            setData(parsedData);
            const duplicates = [];
            parsedData.forEach((el, i) => {
                parsedData.forEach((element, index) => {
                    if (i === index) return null;
                    if (element.Reference === el.Reference) {
                        // store duplicate date here
                        if (!duplicates.includes(el)) duplicates.push(el);
                    }
                });
            });
            console.log("duplicates", duplicates);
            // set duplicate data to state
            setDuplicateData(duplicates);
            // start end balance validation
            validateEndBalanceData(parsedData);
        };
        reader.readAsText(file);

    };

    const validateEndBalanceData = (tableData) => {
        const wrongData = tableData.filter(row => {
            // check if start balance and mutation is equal to end balance
            if (parseFloat(row["Start Balance"]) + parseFloat(row["Mutation"]) != parseFloat(row["End Balance"])) {
                console.log(parseFloat(row["Start Balance"]) + parseFloat(row["Mutation"]))
                console.log('End', parseFloat(row["End Balance"]))
                return true
            }
            return false;
        })
        console.log('wrongData', wrongData);
        // store wrong data 
        setWrongData(wrongData)
    }

    return (
        <div className='main'>
            <Card sx={{ width: 965, height: 180, backgroundColor: 'beige' }}>
                <CardActions>
                    <div>
                        <label htmlFor="csvInput" style={{ display: "block", marginBottom: 5 }}>
                            Select an account balance file (allowed only .csv format)
                        </label>
                        <input
                            onChange={handleFileChange}
                            id="csvInput"
                            name="file"
                            type="File"
                        />
                        <div style={{ marginTop: 10 }}>
                            <Button variant="contained" size="small"
                                onClick={handleParse}
                                disabled={file ? false : true}>
                                Submit
                            </Button>
                        </div>
                        <div className="error-msg"> {error !== '' ? 'Wrong file format selected' : null} </div>
                    </div>
                </CardActions>
            </Card>
            <div style={{ margin: 10 }}>
                {duplicateData.length == 0 ?
                    <div style={{ paddingLeft: 1 }}>
                        {data.length > 0 &&
                            <div>
                                <div className="success-msg">
                                    No Duplicate references number found.
                                </div>
                                <DownloadFile data={data} />
                                <DataTable data={data} />
                            </div>
                        }
                    </div> :
                    <div>
                        {duplicateData.length > 0 &&
                            <div>
                                <div className="error-msg">
                                    Duplicate references number encountered.
                                </div>
                                <DownloadFile data={duplicateData} />
                                <DataTable data={duplicateData} />
                            </div>
                        }
                    </div>
                }

                {
                    wrongData.length > 0 ? <div style={{ paddingLeft: 1 }}>
                        {
                            data.length > 0 && <div className="error-msg">
                                {wrongData.length == 1 ?
                                    <div> There is {wrongData.length} record with wrong End Balance </div>
                                    : <div> There are {wrongData.length} records with wrong End Balance </div>
                                }
                            </div>
                        }
                        <DownloadFile data={wrongData} />
                        <DataTable data={wrongData} />
                    </div> : null
                }
            </div>
        </div>
    );
}