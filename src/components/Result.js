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

class Info{
    constructor(user_name,score){
      this.user_name = user_name;
      this.score = score;
    }
};

function Result() {
    let {qid} = useParams(); // quiz id
    const [scoreList,setScoreList] = React.useState([]);
    const [questionListSize,setQuestionsListSize] = React.useState(0);
    React.useEffect(()=>{
        async function get_scores(){
            const colref = collection(db,"quizes",qid,"Participants");
            const colsnap = await getDocs(colref);
            var temparr = new Array();
            colsnap.forEach((doc)=>{
              var data = new Info(doc.id,doc.data().Score);
              console.log("user_bane" ,data.user_name);
                temparr.push(data);
                console.log(data);
            })
            setScoreList(temparr);
        }
        async function get_ques_list(){
            const colref = collection(db,"quizes",qid,"Questions");
            const colsnap = await getDocs(colref);
            var temp = 0;
            colsnap.forEach((doc)=>{
                temp = temp+1;
            })
            setQuestionsListSize(temp);
        }
        get_scores();
        get_ques_list();
    },[])
    
    return (
        <Box sx={{ boxShadow:7, margin:'50px',display:'flex',flexDirection:'column',alignContent:'center',alignItems:'center',justifyContent:'center'}}>
            <h1>Scores (Out of {questionListSize})</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'><h3>User Name</h3></TableCell>
                            <TableCell align='justify'><h3>Score</h3></TableCell>
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
                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Result