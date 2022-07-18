import * as React from 'react'
import Box from '@mui/material/Box';
import {auth,db} from '../firebase';
import { doc, getDoc, onSnapshot,getDocs,collection } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
//import convertArrayToCSV from 'convert-array-to-csv';
import { CSVLink, CSVDownload } from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';

class Info{
    constructor(user_name,score,answers){
      this.user_name = user_name;
      this.score = score;
      this.answers = answers
    }
};

function Result() {
    let {qid} = useParams(); // quiz id
    const [scoreList,setScoreList] = React.useState([]);
    const [questionList,setQuestionsList] = React.useState([]);
    const [twoD,setTwoD] = React.useState([]);

    function create2dmat(){
        var tdmat = new Array();
        var temparr = new Array();
        temparr.push("User Name");temparr.push("Score");
        questionList.map((val,idx)=>{
            var temp = idx+1;
            temparr.push(temp.toString());
        })
        tdmat.push(temparr);
        scoreList.map((value,idx)=>{
            var tempuarr = new Array();
            tempuarr.push(value.user_name);tempuarr.push(value.score.toString());
            questionList.map((val,index)=>{
                if (value.answers===undefined) tempuarr.push("-1");
                else if (index>=value.answers.length) tempuarr.push("-1");
                else tempuarr.push(value.answers[index].toString());
            })
            tdmat.push(tempuarr);
        })
        setTwoD(tdmat);
    }
    React.useEffect(()=>{
        async function get_scores(){
            const colref = collection(db,"quizes",qid,"Participants");
            const colsnap = await getDocs(colref);
            var temparr = new Array();
            colsnap.forEach((doc)=>{
                var data = new Info(doc.data().Name,doc.data().Score,doc.data().Answers);
                if (data.user_name!=='' && data.user_name!==undefined){
                    temparr.push(data);
                    console.log(data);
                }
            })
            setScoreList(temparr);
        }
        async function get_ques_list(){
            const colref = collection(db,"quizes",qid,"Questions");
            const colsnap = await getDocs(colref);
            var templist = []
            colsnap.forEach((doc)=>{
                templist.push(doc.data().description);
            })
            setQuestionsList(templist);
        }
        get_scores();
        get_ques_list();
    },[])
    
    return (
        <Box sx={{ boxShadow:7, margin:'50px',display:'flex',flexDirection:'column',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <h1>Result</h1>
                <CSVLink style={{marginLeft:"10px"}} onClick={create2dmat} data={twoD}>
                    <IconButton size='small'>
                        <DownloadIcon />
                    </IconButton>
                </CSVLink>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'><h3>User Name</h3></TableCell>
                            <TableCell align='justify'><h3>Score</h3></TableCell>
                            {
                                questionList.map((question,idx)=>(
                                    <TableCell align='justify' padding='2px'>
                                        <IconButton size='small' title={question}>
                                            {idx+1}
                                        </IconButton>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {scoreList.map((value)=>{
                            return (
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align='center'>
                                    {value.user_name}
                                </TableCell>
                                <TableCell align='justify'>{value.score}</TableCell>
                                {
                                    value.answers !== undefined ? (
                                        questionList.map((correct,idx)=>{
                                            if (idx>=value.answers.length) return (
                                                <TableCell align='justify'>none</TableCell>
                                            )
                                            else{
                                                if (value.answers[idx]==1)
                                                    return <TableCell align='justify'><CheckIcon style={{ color: "green" }} /></TableCell>
                                                else 
                                                    return <TableCell align='justify'><ClearIcon style={{ color: "red" }} /></TableCell>
                                            } 
                                        })
                                    ) : (
                                        questionList.map((val)=>(
                                            <TableCell align='justify'>none</TableCell>
                                        ))
                                    )
                                }
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Result