// // export default App;
// import React, { useState } from 'react';
// import { TextareaAutosize, Typography, Box, CircularProgress, Button, Paper} from '@mui/material';
// import axios from 'axios';

// function App() {
//     const [essay, setEssay] = useState('');
//     const [response, setResponse] = useState('');
//     const [loading, setLoading] = useState(false);
//     // const handleSubmit = async () => {
//     //   setLoading(true);
//     //   try {
//     //       const result = await axios.post('/evaluate', { essay: essay });
//     //       setResponse(result.data.response);
//     //   } catch (error) {
//     //       console.error("Error evaluating the essay:", error);
//     //   } finally {
//     //       setLoading(false);
//     //   }
//     // };
//     const handleSubmit = async () => {
//         setLoading(true);
//         try {
//             const result = await axios.post('/evaluate', { essay: essay });
//             // setResponse(JSON.parse(result.data.response));
//             console.log("API response:", result.data);  // add this line for debugging
//             // setResponse(result.data.response);
//             setResponse(result.data);
//         } catch (error) {
//             console.error("Error evaluating the essay:", error);
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     // return (
//     //     <Box display="flex" p={2}>
//     //         <Box flex={1} pr={2}>
//     //             <TextareaAutosize 
//     //                 minRows={15} 
//     //                 placeholder="Paste your IELTS essay here..." 
//     //                 // style={{ width: '100%' }}
//     //                 style={{ width: '100%', marginBottom: '20px' }}
//     //                 value={essay}
//     //                 onChange={(e) => setEssay(e.target.value)}
//     //             />
//     //             {/* <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
//     //               提交
//     //             </Button>
//     //             {loading && <CircularProgress />} */}
//     //             <Box display="flex" alignItems="center" gap={2}>
//     //                 <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
//     //                     提交
//     //                 </Button>
//     //                 {loading && <CircularProgress size="1.5rem" />}
//     //             </Box>
//     //         </Box>
//     //         <Box flex={1} pl={2}>
//     //             <Typography variant="body1">{response}</Typography>
//     //             {/* <Typography variant="body1">{JSON.stringify(response, null, 2)}</Typography> */}
//     //         </Box>
//     //     </Box>
//     // );

//     // return (
//     //     <Box display="flex" p={2}>
//     //         <Box flex={1} pr={2}>
//     //             {loading && <CircularProgress />}
//     //             <TextareaAutosize 
//     //                 minRows={15} 
//     //                 placeholder="Paste your IELTS essay here..." 
//     //                 style={{ width: '100%', marginBottom: '20px' }}
//     //                 value={essay}
//     //                 onChange={(e) => setEssay(e.target.value)}
//     //             />
//     //             <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
//     //                 提交
//     //             </Button>
//     //         </Box>
//     //         <Box flex={1} pl={2}>
//     //             {response && (
//     //                 <>
//     //                     <Typography variant="h6">{response.总评}</Typography>
//     //                     {["任务完成", "连贯与衔接", "词汇资源", "语法范围和准确性"].map(key => (
//     //                         <Box mt={3} key={key}>
//     //                             <Typography variant="h7">{key}</Typography>
//     //                             <Typography>分数: {response[key].分数}</Typography>
//     //                             <Typography>评价: {response[key].评价}</Typography>
//     //                             <Typography>改进建议: {response[key].改进建议}</Typography>
//     //                         </Box>
//     //                     ))}
//     //                 </>
//     //             )}
//     //         </Box>
//     //     </Box>
//     // );
//     const textAreaStyle = {
//         width: '100%', 
//         backgroundColor: '#f5f5f5', 
//         border: '1px solid #e0e0e0',
//         borderRadius: '4px',
//         height: '400px', 
//         padding: '15px', 
//         resize: 'none' // 禁止用户调整文本框的大小
//     };

//     const containerStyle = {
//         maxWidth: '800px', 
//         margin: '0 auto' // 使容器在页面中居中
//     };

//     return (
//         <Box display="flex" p={2} style={containerStyle}>
//             <Box flex={1} pr={2}>
//                 <TextareaAutosize 
//                     placeholder="Paste your IELTS essay here..." 
//                     style={textAreaStyle}
//                     value={essay}
//                     onChange={(e) => setEssay(e.target.value)}
//                 />
//                 <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
//                     <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
//                         提交
//                     </Button>
//                     {loading && <CircularProgress size={30} />} {/* 调整加载圈大小以与按钮对齐 */}
//                 </Box>
//             </Box>
//             <Box flex={1} pl={2}>
//                 <TextareaAutosize 
//                     style={textAreaStyle}
//                     value={response ? JSON.stringify(response, null, 2) : ""}
//                     readOnly
//                 />
//             </Box>
//         </Box>
//     );
    
// }

// export default App;
import React, { useState } from 'react';
import { TextareaAutosize, Typography, Box, CircularProgress, Button, useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';

function App() {
    const [essay, setEssay] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const textAreaStyle = {
        width: '100%', 
        backgroundColor: '#f5f5f5', 
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        height: isSmallScreen ? '200px' : '500px', 
        padding: '15px', 
        resize: 'none' ,
    };

    const containerStyle = {
        maxWidth: isSmallScreen ? '100%' : '80%', 
        margin: '0 auto'
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const result = await axios.post('/evaluate', { essay: essay });
            // setResponse(JSON.parse(result.data.response));
            console.log("API response:", result.data);  // add this line for debugging
            // setResponse(result.data.response);
            setResponse(result.data);
        } catch (error) {
            console.error("Error evaluating the essay:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} p={2} style={containerStyle}>
            <Box flex={1} mr={!isSmallScreen && 2} mb={isSmallScreen && 2}>
                <TextareaAutosize 
                    placeholder="Input your IELTS essay here..." 
                    style={textAreaStyle}
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                />
                <Box display="flex" alignItems="center" justifyContent="flex-end" mt={1}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
                        提交
                    </Button>
                    {loading && <CircularProgress size={30}/>}
                </Box>
            </Box>
            <Box flex={1} ml={!isSmallScreen && 2}>
                <TextareaAutosize 
                    style={textAreaStyle}
                    value={response ? JSON.stringify(response, null, 2) : ""}
                    readOnly
                />
            </Box>
        </Box>
    );
}

export default App;
