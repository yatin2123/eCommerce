import React, { useState } from 'react';

const data = [
    {
        q1: "my name ?",
        op1: 'yatin',
        op2: 'rohit',
        op3: 'jayesh',
        op4: 'dipak',
        ans: 1,
    },
    {
        q1: "my name ?",
        op1: 'yatin',
        op2: 'rohit',
        op3: 'jayesh',
        op4: 'dipak',
        ans: 1,
    },
]

function Quiz(props) {
    const [question, setQuestion] = useState(data)
    console.log(question);
    const [ans, setAns] = useState()
    const [index, setIndex] = useState(0)

    console.log(question);
    const handleoption = (e, ans) => {
        console.log(e, ans);
        {
            question.map((v) => {
                if (v.ans === ans) {
                    setAns(ans)
                    console.log('yyyyyyyyyyyyyyyyyy');
                } else {
                    console.log('eeeeeeeeeeeeeeeeeee');
                }
            })
        }
    }
    const handleNext = (v) => {
        if (ans === v.ans) {
            console.log('ppppppp');

        } else {
            console.log('qqqq');
        }
    }
    return (
        <div>
            {
                question.map((v, i) => {
                    return (
                        <>
                            <h>{v.q1}</h>
                            <ul>
                                <li onClick={(e) => handleoption(e, 1)}>{v.op1}</li>
                                <li onClick={(e) => handleoption(e, 2)}>{v.op2}</li>
                                <li onClick={(e) => handleoption(e, 3)}>{v.op3}</li>
                                <li onClick={(e) => handleoption(e, 4)}>{v.op4}</li>
                            </ul>
                            <button onClick={() => handleNext(v)}>Next</button>
                        </>
                    )
                })
            }

        </div>
    );
}

export default Quiz;