import * as React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import {auth,add_quiz} from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// three pages here in slide manner

const steps = ['Quiz Details', 'Questions', 'Preview & Publish'];
const style = {
    height: 500,
    width: "100%",
    padding: 20,
    margin: "20px 0px 20px 0px",
  };

const style2 = {
    height:"100%",
    width: "100%",
    padding: 20,
    margin: "20px 0px 20px 0px",
  };

class Question{
    constructor(desc,option1,option2,option3,option4,answer){
      this.desc = desc;
      this.option1 = option1;
      this.option2 = option2;
      this.option3 = option3;
      this.option4 = option4;
      this.answer = answer;
    }
}

function CreateQuiz() {

    const navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);
    
    React.useEffect(()=>{
        if (loading){
            // Show a loading screen
        }
        if (error){
            navigate('/');
        }
    })

    const [activeStep, setActiveStep] = React.useState(0);

    const [title,setTitle] = React.useState("");
    const [quizDuration,setQuizDuration] = React.useState(0);
    const textInput1 = React.useRef(null);
    const textInput2 = React.useRef(null);
    const textInput3 = React.useRef(null);
    const textInput4 = React.useRef(null);
    const textInput5 = React.useRef(null);
    const textInput6 = React.useRef(null);

    const [questionDescription,setQuestionDescription] = React.useState(0);
    const [option1,setOption1] = React.useState("");
    const [option2,setOption2] = React.useState("");
    const [option3,setOption3] = React.useState("");
    const [option4,setOption4] = React.useState("");
    const [answer,setAnswer] = React.useState("");
    const [questionsList,setQuestionsList] = React.useState([]);
    function desc_onchange(e){
        setQuestionDescription(e.target.value);
    }
    function option1_onchange(e){
        setOption1(e.target.value);
    }
    function option2_onchange(e){
        setOption2(e.target.value);
    }
    function option3_onchange(e){
        setOption3(e.target.value);
    }
    function option4_onchange(e){
        setOption4(e.target.value);
    }
    function answer_onchange(e){
        setAnswer(e.target.value);
    }
    function addMoreClicked(){
        // push current data to questions list
        var c=0;
        if (answer===option1)c = c+1;
        if (answer===option2)c = c+1;
        if (answer===option3)c = c+1;
        if (answer===option4)c = c+1;
        if (questionDescription===''){
            alert("Please Enter the question")
        }
        else if (option1==='' || option2==='' || option3==='' || option4===''){
            alert("Please provide valid options")
        }
        else if (answer==='')
            alert("Please provide the answer")
        else if (c==0){
            alert("answer should match one option")
        }
        else if (c>1){
            alert("anwer is matching with more than one option");
        }
        else{
            const tempobj = new Question(questionDescription,option1,option2,option3,option4,answer);
            textInput1.current.value = "";
            textInput2.current.value = "";
            textInput3.current.value = "";
            textInput4.current.value = "";
            textInput5.current.value = "";
            textInput6.current.value = "";
            setAnswer("");setOption1("");setOption2("");setOption3("");setOption4("");setQuestionDescription("");
            setQuestionsList(oldArray => [...oldArray, tempobj]);
        }
    }
    
    function handleChange(e){
        setTitle(e.target.value);
    }
    function handleChange2(e){
        console.log(e.target.value);
    }
    function handleChange3(e){
        console.log(e.target.value);
    }
    function handleChange4(e){
        setQuizDuration(e.target.value);
    }
    function publish_app(){ // publish quiz
        add_quiz(title,quizDuration,questionsList);
        // go to admin home
        navigate("/admin");
    }
    const handleNext = () => {
        if (activeStep===2){
            // Publish the app
            publish_app();
        }
        else if (activeStep===1){
            // check if valid then only
            var c=0;
            if (answer===option1)c = c+1;
            if (answer===option2)c = c+1;
            if (answer===option3)c = c+1;
            if (answer===option4)c = c+1;
            if (questionDescription===''){
                alert("Please Enter the question")
            }
            else if (option1==='' || option2==='' || option3==='' || option4===''){
                alert("Please provide valid options")
            }
            else if (answer==='')
                alert("Please provide the answer")
            else if (c==0){
                alert("answer should match one option")
            }
            else if (c>1){
                alert("anwer is matching with more than one option");
            }
            else{
                const tempobj = new Question(questionDescription,option1,option2,option3,option4,answer);
                textInput1.current.value = "";
                textInput2.current.value = "";
                textInput3.current.value = "";
                textInput4.current.value = "";
                textInput5.current.value = "";
                textInput6.current.value = "";
                setAnswer("");setOption1("");setOption2("");setOption3("");setOption4("");setQuestionDescription("");
                setQuestionsList(oldArray => [...oldArray, tempobj]);
                setActiveStep((prevActiveStep) => prevActiveStep+1);
            }
        }
        else{ 
            // check if first step is valid then only
            console.log(quizDuration);
            if (title===""){
                alert("Please provide the title");
            }
            else if (quizDuration===0 || quizDuration===''){
                alert("Please Provide the valid Quiz Duration")
            }
            else{

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
                
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    return (

        <Box sx={{ margin: '50px' }}>
            <Stepper activeStep={activeStep}>
                {
                    steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })
                }
            </Stepper>
            {
                <React.Fragment>
                    {
                        activeStep===0 ? (
                            <Box sx={{ marginTop:'80px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                                <TextField
                                    id="quiz-title"
                                    label="Quiz Title"
                                    onChange={handleChange}
                                />
                                <br/><br/>
                                {/* <div>
                                    <h2>Start Time :</h2>
                                    <TextField id="start-time" type="datetime-local" onChange={handleChange2}/>
                                </div>
                                <div>
                                    <h2>End Time:</h2>
                                    <TextField id="end-time" type="datetime-local" onChage={handleChange3}/>
                                </div> */}
                                <TextField label="Quiz Duration (in minutes)" id="quiz-duration" type="number" onChange={handleChange4} />
                                <br/><br/>
                            </Box>
                        ) : (
                            activeStep == 1 ? (
                                
                                <Box sx={{width:"100%"}}>
                                    <div>
                                        <center>
                                        <p>Question: {questionsList.length+1}</p>
                                        <Paper style={style} >
                                            <TextField inputRef={textInput1} type="text" placeholder="Question" label="Question" onChange={desc_onchange}/> <br /><br />
                                            <TextField inputRef={textInput2} type="text" placeholder="Option 1" label="Option 1" onChange={option1_onchange}/> <br /><br />
                                            <TextField inputRef={textInput3} type="text" placeholder="Option 2" label="Option 2" onChange={option2_onchange}/><br /><br />
                                            <TextField inputRef={textInput4} type="text" placeholder="Option 3" label="Option 3" onChange={option3_onchange}/><br /><br />
                                            <TextField inputRef={textInput5} type="text" placeholder="Option 4" label="Option 4" onChange={option4_onchange}/><br /><br />
                                            <TextField inputRef={textInput6} type="text" placeholder="Answer" label="Answer" onChange={answer_onchange}/><br /><br />
                                        </Paper>
                                        <Button onClick={addMoreClicked}>Add More+</Button>
                                        </center>
                                    </div>
                                </Box>

                            ) : (
                                <Box sx={{width:"100%"}}>
                                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                    <h1>{title} </h1>
                                </div>
                                    {
                                        questionsList.map((question,index)=>{
                                            return(
                                                <Paper style={style2} >
                                                    <div style={{display:'flex'}}>
                                                        <h4 style={{marginRight:'10px',marginTop:'21px'}}>{index+1}.</h4>
                                                        <h3>{question.desc}</h3>
                                                    </div>
                                                    {
                                                        <div>
                                                            <div style={{display:'flex', marginTop:"8px"}}>
                                                                <RadioButtonUncheckedIcon fontSize='small' />
                                                                <p style={{margin:'0px 0px 0px 5px'}}>{question.option1}</p>
                                                            </div>
                                                            <div style={{display:'flex',marginTop:"8px"}}>
                                                                <RadioButtonUncheckedIcon fontSize='small' />
                                                                <p style={{margin:'0px 0px 0px 5px'}}>{question.option2}</p>
                                                            </div>
                                                            <div style={{display:'flex',marginTop:"8px"}}>
                                                                <RadioButtonUncheckedIcon fontSize='small' />
                                                                <p style={{margin:'0px 0px 0px 5px'}}>{question.option3}</p>
                                                            </div>
                                                            <div style={{display:'flex',marginTop:"8px"}}>
                                                                <RadioButtonUncheckedIcon fontSize='small' />
                                                                <p style={{margin:'0px 0px 0px 5px'}}>{question.option4}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                </Paper>
                                            )
                                        })
                                    }
                                </Box>
                            )
                        )
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} >Back</Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>{activeStep === 2 ? 'Publish' : 'Next'}</Button>
                    </Box>
                </React.Fragment>
            }
        </Box>
    )
}

export default CreateQuiz
