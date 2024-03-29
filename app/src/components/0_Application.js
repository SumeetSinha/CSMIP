import React, { Component, useState } from 'react';
import Tab_1 from "./1_Reference_Site_Profile";
import Tab_2 from "./2_Target_Site_Profile";
import Tab_3 from "./3_Ground_Motion";
import Tab_4 from "./4_Analysis_Parameters";
import Tab_5 from "./5_Results";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import Sample_Motion       from "./motions/Sample_Motion.json";
import Kobe                from "./motions/Kobe.json";
import Northridge          from "./motions/Northridge.json";
import LomaGilroy          from "./motions/LomaGilroy.json";
import Parkfield           from "./motions/Parkfield.json";

class Application extends Component {

    constructor(props) {
        super(props)
        // set the initial input values
        this.state = {
            step: 1,             // Current Tab

            // Reference and Target Soil Profile Parameters 
            Ref_Halfspace_Vs: 760,
            Ref_Halfspace_Damping: 0.005,
            Ref_Water_Table_Depth: 25,
            Tar_Halfspace_Vs: 760,
            Tar_Halfspace_Damping: 0.005,
            Tar_Water_Table_Depth: 5,            
            Target_Depth:5,      // Depth of Interest

            Reference_Site_Soil_Profile: [{Name: '1',Thickness: 15, Vs: 350, Gamma: 18, Damping: 0.020, PI:0, OCR: 1, SoilModel: 2},
                                          {Name: '2',Thickness:  5, Vs: 760, Gamma: 20, Damping: 0.010, PI:5, OCR: 1, SoilModel: 2}],  // Reference_Site_Soil_Profile

            Target_Site_Soil_Profile: [{Name: '1',Thickness: 10, Vs: 250, Gamma: 18, Damping: 0.020, PI:0,  OCR:1, SoilModel: 2},
                                       {Name: '2',Thickness: 10, Vs: 400, Gamma: 18, Damping: 0.010, PI:15, OCR:1, SoilModel: 2}],    // Target_Site_Soil_Profile                                          

            Site_Vs_Profile: [{"id": "Reference site","color": "hsl(120, 100%, 20%)", "data": [{"x":350, "y":0},{"x":350, "y":15},{"x":760, "y":15},{"x":760, "y":20}]},{"id": "Target site","color": "hsl(16, 88%, 54%)","data": [{"x":250, "y":0},{"x":250, "y":10},{"x":400, "y":10},{"x":400, "y":20}]},{"id": "Target depth","color": "hsl(0, 100%, 0%)","data": [{"x":0, "y":5},{"x":760, "y":5}]}], // Reference Vs Profile
            Site_Damping_Profile: [{"id": "Reference site","color": "hsl(120, 100%, 20%)", "data": [{"x":0.02, "y":0},{"x":0.02, "y":15},{"x":0.01, "y":15},{"x":0.01, "y":20}]},{"id": "Target site","color": "hsl(16, 88%, 54%)","data": [{"x":0.02, "y":0},{"x":0.02, "y":10},{"x":0.01, "y":10},{"x":0.01, "y":20}]},{"id": "Target depth","color":"hsl(0, 100%, 0%)","data": [{"x":0, "y":5},{"x":0.02, "y":5}]}], // Reference Vs Profile

            // Analysis Parameters
            Analysis_Type: 'EQL', // type of analysis
            Tol: 0.01,           // error tolerance (%)
            MaxIter: 15,         // maximum number of iterations
            EffStrain: 0.65,     // effective strain ratio
            StrainLimit: 0.05,   // strain limit
            MaxFreq: 20,         // maximum frequency (Hz)
            WavFrac: 0.2,        // wavelength fraction 
            PGA: 0.17,           // peak ground acceleration
            PGV: 13.27,          // peak ground velocity

            // Analysis Results
            whether_analyzed:  0, // Whether analysis is performed
            Transfer_Functions:  [{"id": "Reference site: bedrock to surface","color": "hsl(120, 100%, 20%)", "data": [{"x" :1, "y":2},{"x" :2, "y":5}]},{"id": "Target site: bedrock to surface","color": "hsl(16, 88%, 54%)","data": [{"x" :1, "y":2},{"x" :2, "y":5}]},{"id": "Reference site's surface to target site's surface","color": "hsl(147, 50%, 47%)","data": [{"x" :1, "y":2},{"x" :2, "y":5}]}],
            Max_Strain_Profile:  [{"id": "Reference site","color": "hsl(120, 100%, 20%)", "data": [{"x" :1, "y":2},{"x" :2, "y":5}]},{"id": "Target site","color": "hsl(16, 88%, 54%)","data": [{"x" :1, "y":2},{"x" :2, "y":5}]}],

            // FAS Parameters 
            Magnitude: 6,        // magnitude of earthquake
            Distance: 10,        // distance from site
            Region: 'wna',       // region
            FASFile: './FAS.txt',// FAS File
            FAS: [{"id": "FAS","color": "hsl(0, 100%, 0%)", "data": [{"x":0.05, "y":0.01},{"x":1.049, "y":0.0299},{"x":2.048, "y":0.0316},{"x":3.047, "y":0.031},{"x":4.046, "y":0.029},{"x":5.045, "y":0.0264625},{"x":6.044, "y":0.02419},{"x":7.043, "y":0.022034},{"x":8.042, "y":0.01976333},{"x":9.041, "y":0.01773167},{"x":10.04, "y":0.01586},{"x":11.039, "y":0.014222},{"x":12.038, "y":0.012762},{"x":13.037, "y":0.011363},{"x":14.036, "y":0.010264},{"x":15.035, "y":0.009205},{"x":16.034, "y":0.008316},{"x":17.033, "y":0.007467},{"x":18.032, "y":0.0066756},{"x":19.031, "y":0.0059976},{"x":20.03, "y":0.005396},{"x":21.029, "y":0.0047984},{"x":22.028, "y":0.0042688},{"x":23.027, "y":0.00381055},{"x":24.026, "y":0.0034118},{"x":25.025, "y":0.0030225},{"x":26.024, "y":0.0027056},{"x":27.023, "y":0.00240425},{"x":28.022, "y":0.0021556},{"x":29.021, "y":0.0019158},{"x":30.02, "y":0.001706},{"x":31.019, "y":0.00153715},{"x":32.018, "y":0.0013664},{"x":33.017, "y":0.00122245},{"x":34.016, "y":0.0010884},{"x":35.015, "y":0.00097905},{"x":36.014, "y":0.00087088},{"x":37.013, "y":0.00077557},{"x":38.012, "y":0.00069553},{"x":39.011, "y":0.00061897},{"x":40.01, "y":0.00055443},{"x":41.009, "y":0.00049555},{"x":42.008, "y":0.00044196},{"x":43.007, "y":0.00039703},{"x":44.006, "y":0.00035576},{"x":45.005, "y":0.00031815},{"x":46.004, "y":0.0002832},{"x":47.003, "y":0.00025418},{"x":48.002, "y":0.00022595},{"x":49.001, "y":0.00020298},{"x":50, "y":0.000181}]},], // FAS File Contents

            // Motion Parameters
            whether_processed: 0, // Whether analysis is performed
            Motion_File: 'Sample_Motion',// motion File
            Motion: [{"id": "Target recording","color": "hsl(0, 100%, 50%)", "data": [{"x":0,"y":0},{"x":94.14,"y":0}]},{"id": "Reference recording","color": "hsl(0, 0%, 50%)","data": [{"x":0.05, "y":0.01},{"x":50, "y":0.000181}]}], // Motion File Contents
            Response_Spectrum:  [{"id": "Target recording","color": "hsl(0, 100%, 50%)", "data": [{"x" :1, "y":2},{"x" :2, "y":5}]},{"id": "Reference recording","color": "hsl(0, 0%, 50%)","data": [{"x" :1, "y":2},{"x" :2, "y":5}]}],
            FA_Spectrum:  [{"id": "Target recording","color": "hsl(0, 100%, 50%)", "data": [{"x" :1, "y":2},{"x" :2, "y":5}]},{"id": "Reference recording","color": "hsl(0, 0%, 50%)","data": [{"x" :1, "y":2},{"x" :2, "y":5}]}],
        }

        const Motion_Data     = this.state.Motion;
        Motion_Data[1].data   = Sample_Motion.data;
        this.setState({
            Motion : Motion_Data
        })

        this.update_Reference_Site_Profile_Plots()
        this.update_Target_Site_Profile_Plots()
        this.update_Target_Depth_Plots(this.state.Target_Depth)

        // Bind the submission to handleChange() 
        this.handleChange = this.handleChange.bind(this)
    }

    
    // function to update the step by 1
    nextStep = () => {
        const {step} = this.state

        if(step===1) this.Generate_FAS();

        this.setState({
            step : step + 1
        })
        console.log(this.state)

    }

    // function to decrement the step by 1
    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }
    
    /////////////////////////////////////////////
    // Function to perform analysis when the  
    // analyse button is clicked
    /////////////////////////////////////////////
    Analyze = () => {
        const { step } = this.state
        this.setState({
            whether_analyzed : 1
        })
        fetch('/Analyze',
            {
                method: 'POST',
                mode: 'cors',
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }
        )
        .then(response => response.json())
        .then(json => {
            // console.log(json);
            this.setState({
                whether_analyzed : json.whether_analyzed,
                Transfer_Functions : json.Transfer_Functions,
                Max_Strain_Profile : json.Max_Strain_Profile
            })
            console.log(this.state);

            if (this.state.whether_analyzed === 2){

                this.Generate_Motion();
                this.setState({
                    step : step + 1,
                    whether_analyzed : 0
                })
            }

        })
        .catch(error => console.log(error));
    }

    /////////////////////////////////////////////
    // Function to create the FAS inout based on 
    // the input properties from user
    /////////////////////////////////////////////
    Generate_FAS = () => {

        const { step } = this.state
        console.log(this.state)

        this.setState({whether_analyzed : 1})

        fetch('/Generate_FAS',
            {
                method: 'POST',
                mode: 'cors',
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }
        )
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                whether_analyzed : json.whether_analyzed,
                FAS : json.FAS,
            })
            console.log(this.state);

            if (this.state.whether_analyzed === 2){
                this.setState({
                    whether_analyzed : 0
                })
            }           
        })
        .catch(error => console.log(error));
    }

    /////////////////////////////////////////////
    // Function to generate input motion from 
    // the given ground motion   
    /////////////////////////////////////////////
    Generate_Motion = () => {
        const { step } = this.state
        this.setState({
            whether_processed : 1
        })
        fetch('/Generate_Motion',
            {
                method: 'POST',
                mode: 'cors',
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }
        )
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                whether_processed : json.whether_processed,
                Motion : json.Motion,
                FA_Spectrum : json.FA_Spectrum,
                Response_Spectrum : json.Response_Spectrum
            })
            console.log(this.state);

            if (this.state.whether_processed === 2){
                this.setState({
                    whether_processed : 0
                })
            }           
        })
        .catch(error => console.log(error));
    }

    // function to handle update of values in form 
    handleChange = (event) => {
        const inputName  = event.target.name;
        const inputValue = event.target.value;

        this.setState({[inputName]:inputValue});

        if(inputName==="Target_Depth"){
            this.setState({[inputName]: parseFloat(inputValue)});
            this.update_Target_Depth_Plots(inputValue)
        }
        else if(inputName==="Magnitude" || inputName==="Distance" || inputName==="Tol" || inputName==="MaxIter" || inputName==="EffStrain" || inputName==="MaxFreq" || inputName==="WavFrac" || inputName==="Ref_Halfspace_Vs" 
            || inputName==="Ref_Halfspace_Damping"|| inputName==="Ref_Water_Table_Depth"|| inputName==="Tar_Halfspace_Vs"|| inputName==="Tar_Halfspace_Damping"|| inputName==="Tar_Water_Table_Depth")
        {
            this.setState({[inputName]: parseFloat(inputValue)});
        }
        else{
            // run the validation here 
            this.setState({[inputName]:inputValue});
        }

        if(inputName==="Motion_File"){

            const Motion_Data     = this.state.Motion

            if(inputValue==="Sample_Motion")
                Motion_Data[1].data=Sample_Motion.data;
            if(inputValue==="Kobe")
                Motion_Data[1].data=Kobe.data;
            if(inputValue==="Northridge")
                Motion_Data[1].data=Northridge.data;
            if(inputValue==="LomaGilroy")
                Motion_Data[1].data=LomaGilroy.data;
            if(inputValue==="Parkfield")
                Motion_Data[1].data=Parkfield.data;
            this.Generate_Motion();
        }

        console.log(this.state)

    }

   // function to handle upload of FAS file
    handleFile = (event) => {

        const inputName  = event.target.name;
        const inputValue = event.target.value;

        const reader = new FileReader()
        let file_content =""

        reader.onload = function(event) {  
            const file_data_array =  reader.result.split(/\r?\n/);
            const FAS_Data = this.state.FAS

            let n = file_data_array.length;
            var FAS_Data_Array  = [];
            var FAS_Data_Points = {};

            for (let i = 0; i < n; i++){
                let data = file_data_array[i].split(",");
                FAS_Data_Points.y = data[1];
                FAS_Data_Points.x = data[0];
                FAS_Data_Array.push({...FAS_Data_Points});
            }

            FAS_Data[0].data = FAS_Data_Array;
            this.setState({FAS:FAS_Data});

        }.bind(this);

        var file = event.target.files[0]; 
        reader.readAsText(file)

        // try{
        //    reader.readAsText(file)
        // }catch(error){
        //     console.log("Error")
        //     alert("Failed to read file");
        // }
    }

    //////////////////////////////////////////////////////////////////
    // Function to read motion file
    //////////////////////////////////////////////////////////////////
    readMotionFile = (event) => {

        const reader = new FileReader()
        let file_content =""

        reader.onload = function(event) {  
            const file_data_array =  reader.result.split(/\r?\n/);
            const Motion_Data     = this.state.Motion

            let n = file_data_array.length;
            var Motion_Data_Array  = [];
            var Motion_Data_Points = {};
            var dt = file_data_array[0].split(",")[0];

            for (let i = 1; i < n; i++){
                let data = file_data_array[i].split(",");
                if (data==""){ continue}
                Motion_Data_Points.y = data[0];
                Motion_Data_Points.x = (i-1)*dt;
                Motion_Data_Array.push({...Motion_Data_Points});
            }

            Motion_Data[1].data = Motion_Data_Array;
            this.setState({Motion:Motion_Data});

            this.Generate_Motion();

        }.bind(this);

        var file = event.target.files[0]; 

        console.log(event.target.files[0])
        reader.readAsText(file)



        // try{
        //    reader.readAsText(file)
        // }catch(error){
        //     console.log("Error")
        //     alert("Failed to read file");
        // }
    }

    //////////////////////////////////////////////////////////////////
    // Read the Excel Profile data
    //////////////////////////////////////////////////////////////////
    readExcelProfileData = (event) => {

        // get the id and input value
        const inputName  = event.target.name;
        const inputValue = event.target.value;

        const reader = new FileReader()
        let file_content =""

        reader.onload = function(event) {  

            const bstr = event.target.result;
            const workbook = XLSX.read(bstr, { type: "binary" });

            var worksheetName = workbook.SheetNames[0];

            console.log(workbook.SheetNames)

            if(workbook.SheetNames.length>1){
                if(inputName==="ReferenceDataFile") worksheetName='Reference';
                if(inputName==="TargetDataFile") worksheetName='Target';
            }

            // console.log(worksheetName)

            const worksheet  = workbook.Sheets[worksheetName];

            const data_array = XLSX.utils.sheet_to_csv(worksheet, { header: 1 }).split(/\r?\n/);

            console.log(data_array[1]);

            let n = data_array.length;
            var Site_Soil_Profile_Data_Array  = [];
            var Site_Soil_Profile_Data_Points = {};

            for (let i = 1; i < n; i++){
                let data = data_array[i].split(",");
                Site_Soil_Profile_Data_Points.Name      = i;
                Site_Soil_Profile_Data_Points.Thickness = parseFloat(data[1]);
                Site_Soil_Profile_Data_Points.Vs        = parseFloat(data[2]);
                Site_Soil_Profile_Data_Points.Gamma     = parseFloat(data[3]);
                Site_Soil_Profile_Data_Points.PI        = parseFloat(data[4]);
                Site_Soil_Profile_Data_Points.OCR       = parseFloat(data[5]);
                Site_Soil_Profile_Data_Points.Damping   = parseFloat(data[6]);
                Site_Soil_Profile_Data_Points.SoilModel = parseInt(data[7]);
                Site_Soil_Profile_Data_Array.push({...Site_Soil_Profile_Data_Points});
            }

            // console.log(inputName)

            if(inputName==="ReferenceDataFile"){
                this.setState({Reference_Site_Soil_Profile:Site_Soil_Profile_Data_Array});
                this.update_Reference_Site_Profile_Plots();
            }
            if(inputName==="TargetDataFile"){
                this.setState({Target_Site_Soil_Profile:Site_Soil_Profile_Data_Array});
                this.update_Target_Site_Profile_Plots();
            }
            this.update_Target_Depth_Plots(this.state.Target_Depth);

        }.bind(this);

        // get the excel file
        var file = event.target.files[0]; 
        reader.readAsBinaryString(file);
    }


    //////////////////////////////////////////////////////////////////
    // Read the Excel Profile data
    //////////////////////////////////////////////////////////////////
    writeExcelProfileData = (event) => {

        // get the id and input value
        const inputName  = event.target.name;
        const inputValue = event.target.value;

        // create a new XLSX file
        var wb = XLSX.utils.book_new();

        // update properties of the file
        wb.Props = {
                Title: "CSMIP App",
                Subject: "Profile",
                Author: "Sumeet Kumar Sinha",
                CreatedDate: new Date()
        };

        var ws = XLSX.utils.json_to_sheet(this.state.Reference_Site_Soil_Profile);
        XLSX.utils.book_append_sheet(wb,ws,"Reference");

        ws = XLSX.utils.json_to_sheet(this.state.Target_Site_Soil_Profile);
        XLSX.utils.book_append_sheet(wb,ws,"Target");

        XLSX.writeFile(wb,"SoilProfile.xlsx");
    }

    //////////////////////////////////////////////////////////////////
    // Read the Excel Profile data
    //////////////////////////////////////////////////////////////////
    downloadInputMotionFile = (event) => {

        // get the id and input value
        const inputName  = event.target.name;
        const inputValue = event.target.value;

        // const Input_Motion_Data = this.state.Motion[1]["data"];
        // var dt = Input_Motion_Data[1].x - Input_Motion_Data[0].x;

        // var data = dt.toString();
        // var n = Input_Motion_Data.length;

        // for (let i = 0; i < n; i++){
        //     data=data+"\n"+Input_Motion_Data[i].y;
        // }

        // var blob = new Blob([data], { type: "text/plain;charset=utf-8" });
        // saveAs(blob, "InputMotion.txt");


        // // get the id and input value
        // const inputName  = event.target.name;
        // const inputValue = event.target.value;

        // create a new XLSX file
        var wb = XLSX.utils.book_new();

        // update properties of the file
        wb.Props = {
                Title: "CSMIP App",
                Subject: "Results",
                Author: "Sumeet Kumar Sinha",
                CreatedDate: new Date()
        };

        const time = [];
        const recording = [];
        const Target_Recording    = this.state.Motion[0]["data"]
        const Reference_Recording = this.state.Motion[1]["data"]
        var n = Target_Recording.length;

        for (let i = 0; i < n; i++){
            time[i]=[Target_Recording[i].x];
            recording[i] = [Reference_Recording[i].y,Target_Recording[i].y]
        }

        const freq = [];
        const FAS_Spectrum  = [];
        const Target_FAS_Spectrum    = this.state.FA_Spectrum[0]["data"]
        const Reference_FAS_Spectrum = this.state.FA_Spectrum[1]["data"]
        n = Target_FAS_Spectrum.length;

        for (let i = 0; i < n; i++){
            freq[i]=[Target_FAS_Spectrum[i].x];
            FAS_Spectrum[i] = [Reference_FAS_Spectrum[i].y,Target_FAS_Spectrum[i].y]
        }

        const freq2 = [];
        const PSA_Spectrum  = [];
        const Target_PSA_Spectrum    = this.state.Response_Spectrum[0]["data"]
        const Reference_PSA_Spectrum = this.state.Response_Spectrum[1]["data"]
        n = Target_PSA_Spectrum.length;

        for (let i = 0; i < n; i++){
            freq2[i]=[Target_PSA_Spectrum[i].x];
            PSA_Spectrum[i] = [Reference_PSA_Spectrum[i].y,Target_PSA_Spectrum[i].y]
        }

        const freq3 = [];
        const Transfer_Functions  = [];
        const Target_Transfer_Functions              = this.state.Transfer_Functions[1]["data"]
        const Reference_Transfer_Functions           = this.state.Transfer_Functions[0]["data"]
        const Reference_to_Target_Transfer_Functions = this.state.Transfer_Functions[2]["data"]
        n = Target_Transfer_Functions.length;

        for (let i = 0; i < n; i++){
            freq3[i]=[Target_Transfer_Functions[i].x];
            Transfer_Functions[i] = [Reference_Transfer_Functions[i].y,Target_Transfer_Functions[i].y,Reference_to_Target_Transfer_Functions[i].y]
        }

        const Target_Max_Strain_Profile_Array        = [];
        const Reference_Max_Strain_Profile_Array     = [];
        const Target_Max_Strain_Profile              = this.state.Max_Strain_Profile[1]["data"]
        const Reference_Max_Strain_Profile           = this.state.Max_Strain_Profile[0]["data"]
        
        n = Target_Max_Strain_Profile.length;
        for (let i = 0; i < n; i++){
            Target_Max_Strain_Profile_Array[i]=[Target_Max_Strain_Profile[i].y,Target_Max_Strain_Profile[i].x];
        }

        n = Reference_Max_Strain_Profile.length;
        for (let i = 0; i < n; i++){
            Reference_Max_Strain_Profile_Array[i]=[Reference_Max_Strain_Profile[i].y,Reference_Max_Strain_Profile[i].x];
        }

        //######################################################################################
        //######################################################################################
        // create a sheet for motion_analysis 
        var ws = XLSX.utils.json_to_sheet(this.state.Motion);

        /* merge cells A1:C1 */
        var merge = { s: {r:0, c:0}, e: {r:0, c:2} };
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merge);

        XLSX.utils.sheet_add_aoa(ws, [["Recordings (g)"]], {origin: "A1"});
        XLSX.utils.sheet_add_aoa(ws, [["Time (s)","Reference site","Target site"]], {origin: "A2"});
        XLSX.utils.sheet_add_aoa(ws, time, {origin: "A3"});
        XLSX.utils.sheet_add_aoa(ws, recording, {origin: "B3"});

        /* merge cells D1:F1 */
        var merge = { s: {r:0, c:4}, e: {r:0, c:6} };
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merge);

        XLSX.utils.sheet_add_aoa(ws, [["Frequency smplitude spectrum (g-s)"]], {origin: "E1"});
        XLSX.utils.sheet_add_aoa(ws, [["Frequency (Hz)","Reference site","Target site"]], {origin: "E2"});
        XLSX.utils.sheet_add_aoa(ws, freq, {origin: "E3"});
        XLSX.utils.sheet_add_aoa(ws, FAS_Spectrum, {origin: "F3"});

        /* merge cells H1:J1 */
        var merge = { s: {r:0, c:8}, e: {r:0, c:10} };
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merge);

        XLSX.utils.sheet_add_aoa(ws, [["Pseudo spectral acceleration (g)"]], {origin: "I1"});
        XLSX.utils.sheet_add_aoa(ws, [["Frequency (Hz)","Reference site","Target site"]], {origin: "I2"});
        XLSX.utils.sheet_add_aoa(ws, freq2, {origin: "I3"});
        XLSX.utils.sheet_add_aoa(ws, PSA_Spectrum, {origin: "J3"});

        XLSX.utils.book_append_sheet(wb,ws,"Motion_Analysis");

        //######################################################################################
        //######################################################################################
        // create a sheet for transfer functions
        var ws = XLSX.utils.json_to_sheet(this.state.Motion);

        /* merge cells A1:D1 */
        var merge = { s: {r:0, c:0}, e: {r:0, c:3} };
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merge);

        XLSX.utils.sheet_add_aoa(ws, [["Transfer functions (g-s)"]], {origin: "A1"});
        XLSX.utils.sheet_add_aoa(ws, [["Frequency (Hz)","Reference site: bedrock to surface","Target site: bedrock to surface", "Reference site's surface to target site's surface"]], {origin: "A2"});
        XLSX.utils.sheet_add_aoa(ws, freq3, {origin: "A3"});
        XLSX.utils.sheet_add_aoa(ws, Transfer_Functions, {origin: "B3"});

        /* merge cells E1:G1 */
        var merge = { s: {r:0, c:5}, e: {r:0, c:8} };
        if(!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(merge);

        XLSX.utils.sheet_add_aoa(ws, [["Maximum shear strain profile (%)"]], {origin: "F1"});
        XLSX.utils.sheet_add_aoa(ws, [["Depth (m)","Reference site", "Depth (m)", "Target site"]], {origin: "F2"});
        XLSX.utils.sheet_add_aoa(ws, Reference_Max_Strain_Profile_Array, {origin: "F3"});
        XLSX.utils.sheet_add_aoa(ws, Target_Max_Strain_Profile_Array, {origin: "H3"});

        // ws = XLSX.utils.json_to_sheet(this.state.Transfer_Functions);
        XLSX.utils.book_append_sheet(wb,ws,"Site_Response_Analysis");

        XLSX.writeFile(wb,"Results.xlsx");
    }

    //////////////////////////////////////////////////////////////////
    // Update Target Depth Plot
    //////////////////////////////////////////////////////////////////
    update_Target_Depth_Plots=(Target_Depth)=>{

        const Site_Vs_Profile_Data      = this.state.Site_Vs_Profile;
        const Site_Damping_Profile_Data = this.state.Site_Damping_Profile;

        const Vs_Profile_Data = Site_Vs_Profile_Data[0].data.concat(Site_Vs_Profile_Data[1].data)
        var maxValue = Math.max.apply(null,Vs_Profile_Data.map(function(o) { return o.x; }));
        var minValue = Math.min.apply(null,Vs_Profile_Data.map(function(o) { return o.x; }));
        var Target_Depth_Vs_Data  = [{"x":0,"y":Target_Depth},{"x":maxValue*1.1,"y":Target_Depth}];

        const Damping_Profile_Data = Site_Damping_Profile_Data[0].data.concat(Site_Damping_Profile_Data[1].data)
        maxValue = Math.max.apply(null,Damping_Profile_Data.map(function(o) { return o.x; }));
        minValue = Math.min.apply(null,Damping_Profile_Data.map(function(o) { return o.x; }));
        var Target_Depth_Damping_Data  = [{"x":0,"y":Target_Depth},{"x":maxValue*1.1,"y":Target_Depth}];

        // update Vs and Damping profile arrays
        Site_Vs_Profile_Data[2].data = Target_Depth_Vs_Data;
        Site_Damping_Profile_Data[2].data = Target_Depth_Damping_Data;

        // update the state 
        this.setState({Site_Vs_Profile:Site_Vs_Profile_Data});
        this.setState({Site_Damping_Profile:Site_Damping_Profile_Data});
    }

    //////////////////////////////////////////////////////////////////
    // Update the Reference Site Profile Plot
    //////////////////////////////////////////////////////////////////
    update_Reference_Site_Profile_Plots(){

        // get the shear wave velocity, damping and refernce site soil profile from the current state
        const Site_Vs_Profile_Data      = this.state.Site_Vs_Profile
        const Site_Damping_Profile_Data = this.state.Site_Damping_Profile
        const Reference_Site_Profile    = this.state.Reference_Site_Soil_Profile;

        // calculate the number of layers
        let Reference_Site_Num_Layers = Reference_Site_Profile.length;

        // declare variables for Vs and Damping arrays
        var Reference_Site_Vs_Data    = [];
        var Reference_Site_Damping_Data  = [];

        // declare variable for Vs and Damping data points
        var Vs_Data = {};
        var Damping_Data = {};

        // start with an initial depth =0
        var depth = 0;

        // To print message in console
        // console.log(JSON.stringify(Reference_Site_Num_Layers));

        // Loop over the layers
        for (let i = 0; i < Reference_Site_Num_Layers; i++) {

            Vs_Data.y = depth;
            Vs_Data.x = Reference_Site_Profile[i].Vs;
            Reference_Site_Vs_Data.push({...Vs_Data});

            Damping_Data.y = depth;
            Damping_Data.x = Reference_Site_Profile[i].Damping;
            Reference_Site_Damping_Data.push({...Damping_Data});

            depth = depth + Reference_Site_Profile[i].Thickness

            Vs_Data.y = depth;
            Vs_Data.x = Reference_Site_Profile[i].Vs;
            Reference_Site_Vs_Data.push({...Vs_Data});

            Damping_Data.y = depth;
            Damping_Data.x = Reference_Site_Profile[i].Damping;
            Reference_Site_Damping_Data.push({...Damping_Data});
        }

        // update Vs and Damping profile arrays
        Site_Vs_Profile_Data[0].data = Reference_Site_Vs_Data;
        Site_Damping_Profile_Data[0].data = Reference_Site_Damping_Data;

        // update the state 
        this.setState({Site_Vs_Profile:Site_Vs_Profile_Data});
        this.setState({Site_Damping_Profile:Site_Damping_Profile_Data});
    }


    //////////////////////////////////////////////////////////////////
    // Update the Target Site Profile Plot
    //////////////////////////////////////////////////////////////////
    update_Target_Site_Profile_Plots(){

        // get the shear wave velocity, damping and refernce site soil profile from the current state
        const Site_Vs_Profile_Data      = this.state.Site_Vs_Profile
        const Site_Damping_Profile_Data = this.state.Site_Damping_Profile
        const Target_Site_Profile    = this.state.Target_Site_Soil_Profile;

        // calculate the number of layers
        let Target_Site_Num_Layers = Target_Site_Profile.length;

        // declare variables for Vs and Damping arrays
        var Target_Site_Vs_Data    = [];
        var Target_Site_Damping_Data  = [];

        // declare variable for Vs and Damping data points
        var Vs_Data = {};
        var Damping_Data = {};

        // start with an initial depth =0
        var depth = 0;

        // To print message in console
        // console.log(JSON.stringify(Target_Site_Num_Layers));

        // Loop over the layers
        for (let i = 0; i < Target_Site_Num_Layers; i++) {

            Vs_Data.y = depth;
            Vs_Data.x = Target_Site_Profile[i].Vs;
            Target_Site_Vs_Data.push({...Vs_Data});

            Damping_Data.y = depth;
            Damping_Data.x = Target_Site_Profile[i].Damping;
            Target_Site_Damping_Data.push({...Damping_Data});

            depth = depth + Target_Site_Profile[i].Thickness

            Vs_Data.y = depth;
            Vs_Data.x = Target_Site_Profile[i].Vs;
            Target_Site_Vs_Data.push({...Vs_Data});

            Damping_Data.y = depth;
            Damping_Data.x = Target_Site_Profile[i].Damping;
            Target_Site_Damping_Data.push({...Damping_Data});
        }

        // update Vs and Damping profile arrays
        Site_Vs_Profile_Data[1].data = Target_Site_Vs_Data;
        Site_Damping_Profile_Data[1].data = Target_Site_Damping_Data;

        // update the state 
        this.setState({Site_Vs_Profile:Site_Vs_Profile_Data});
        this.setState({Site_Damping_Profile:Site_Damping_Profile_Data});
    }

    //////////////////////////////////////////////////////////////////
    // Update the properties of Reference Site Profile
    //////////////////////////////////////////////////////////////////
    update_Reference_Site_Soil_Profile = (newData) => {

        // update the state to new Reference Site Profile 
        this.setState({Reference_Site_Soil_Profile:newData});
        this.update_Reference_Site_Profile_Plots();
        this.update_Target_Depth_Plots(this.state.Target_Depth);
    }

    //////////////////////////////////////////////////////////////////
    // Update the properties of Target Site Profile
    //////////////////////////////////////////////////////////////////
    update_Target_Site_Soil_Profile = (newData) => {

        // update the state to new Target Site Profile 
        this.setState({Target_Site_Soil_Profile:newData});
        this.update_Target_Site_Profile_Plots();
        this.update_Target_Depth_Plots(this.state.Target_Depth);
    }

    render(){

        const { step,Ref_Halfspace_Vs,Ref_Halfspace_Damping,Ref_Water_Table_Depth,Tar_Halfspace_Vs,Tar_Halfspace_Damping,Tar_Water_Table_Depth, Analysis_Type, Tol, MaxIter,  EffStrain, StrainLimit, MaxFreq, WavFrac, PGA, PGV, Magnitude, Distance, Region, FASFile, FAS, Target_Depth, whether_analyzed, Reference_Site_Soil_Profile, Site_Vs_Profile, Site_Damping_Profile, Target_Site_Soil_Profile, Transfer_Functions, Motion_File,Motion,whether_processed,Max_Strain_Profile,Response_Spectrum,FA_Spectrum} = this.state;
        const inputValues = { Ref_Halfspace_Vs,Ref_Halfspace_Damping,Ref_Water_Table_Depth,Tar_Halfspace_Vs,Tar_Halfspace_Damping,Tar_Water_Table_Depth, Analysis_Type, Tol, MaxIter, EffStrain, StrainLimit, MaxFreq, WavFrac, PGA, PGV, Magnitude, Distance, Region, FASFile, FAS, Target_Depth, whether_analyzed, Reference_Site_Soil_Profile, Site_Vs_Profile, Site_Damping_Profile, Target_Site_Soil_Profile, Transfer_Functions, Motion_File,Motion,whether_processed,Max_Strain_Profile,Response_Spectrum,FA_Spectrum};
               
        switch(step) {
        case 1:
            return <Tab_1
                    nextStep                  = {this.nextStep}
                    updateSoilLayers          = {this.update_Reference_Site_Soil_Profile}
                    readSoilProfileData       = {this.readExcelProfileData}
                    downloadSoilProfileData   = {this.writeExcelProfileData}
                    handleChange = {this.handleChange}
                    inputValues={inputValues}
                    />
        case 2:
            return <Tab_2
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    updateSoilLayers = {this.update_Target_Site_Soil_Profile}
                    readSoilProfileData   = {this.readExcelProfileData}
                    downloadSoilProfileData   = {this.writeExcelProfileData}
                    handleChange = {this.handleChange}
                    inputValues={inputValues}
                    />
        case 3:
            return <Tab_3
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleFile = {this.handleFile}
                    handleChange = {this.handleChange}
                    inputValues={inputValues}
                    Generate_FAS={this.Generate_FAS}
                    />
        case 4:
            return <Tab_4
                nextStep={this.Analyze}
                prevStep={this.prevStep}
                inputValues={inputValues}
                handleChange = {this.handleChange}
                />
        case 5:
            return <Tab_5
                // nextStep={this.Analyze}
                prevStep={this.prevStep}
                inputValues={inputValues}
                handleChange = {this.handleChange}
                handleFile = {this.readMotionFile}
                downloadFile = {this.downloadInputMotionFile}
                />
        }
    }
}

export default Application;