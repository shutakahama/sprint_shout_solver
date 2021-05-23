import Head from 'next/head'
import React, {useState} from "react";
import utilStyles from '../../styles/utils.module.css'
import Axios from 'axios';
import Grid from "./Grid";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const InputForm: React.FC = () => {
    const [moji, setMoji] = useState<string>("あ");
    const [length, setLength] = useState<number>(7);
    const [index, setIndex] = useState<number>(0);
    const [cand, setCand] = useState<string[]>(["文字を選んでください"]);

    const handleLength = (e) => {
        setLength(e.target.value)
    }
    const handleIndex = (e) => {
        setIndex(e.target.value)
    }
    const handleMoji = (i: number, j: number) => {
        if (mojiArray[i][j] == "　") {
            return
        }
        else if (mojiArray[i][j] == "゛") {
            setMoji(String.fromCharCode(moji.charCodeAt(0) + 1));
        }
        else if (mojiArray[i][j] == "゜") {
            setMoji(String.fromCharCode(moji.charCodeAt(0) + 2));
        }
        else if (mojiArray[i][j] == "小") {
            setMoji(String.fromCharCode(moji.charCodeAt(0) - 1));
        }
        else {
            setMoji(mojiArray[i][j]);
        }
    }
    const submit = () => {
        Axios.post('http://localhost:5000/listup', {
            length: length,
            idx: index,
            moji: moji
        }).then(res => {
            let arr = [];
            for (let key in res.data.result) {
                arr.push(res.data.result[key]);
            }
            setCand(arr)
        })
    }

    const mojiArray: string[][] = [
        ["あ", "い", "う", "え", "お"],
        ["か", "き", "く", "け", "こ"],
        ["さ", "し", "す", "せ", "そ"],
        ["た", "ち", "つ", "て", "と"],
        ["な", "に", "ぬ", "ね", "の"],
        ["は", "ひ", "ふ", "へ", "ほ"],
        ["ま", "み", "む", "め", "も"],
        ["や", "　", "ゆ", "　", "よ"],
        ["ら", "り", "る", "れ", "ろ"],
        ["わ", "　", "を", "　", "ん"],
        ["゛", "゜", "小", "　", "　"]
    ]

    return (
        <div className={utilStyles.container}>
            <Head>
                <title>sprint_shout</title>
            </Head>
            <section className={utilStyles.headingLg}>
                Sprint Shout Solver!
            </section>
            <FormControl component="fieldset">
                <FormLabel component="legend">Length</FormLabel>
                <RadioGroup row aria-label="length-form" name="length-form" value={length} onChange={handleLength}>
                    {[6, 7, 8, 9].map(item => {
                        return (
                            <FormControlLabel
                                value={item}
                                key={item}
                                control={<Radio />}
                                label={item}
                                checked={length == item}/>
                        );
                    })}
                </RadioGroup>
            </FormControl>
            <br/>
            <FormControl component="fieldset">
                <FormLabel component="legend">Index</FormLabel>
                <RadioGroup row aria-label="index-form" name="index-form" value={index} onChange={handleIndex}>
                    {[...Array(10)].map((v, i)=> i).map(item => {
                        return (
                            <FormControlLabel
                                value={item}
                                key={item}
                                control={<Radio />}
                                label={item}
                                checked={index == item}/>
                        );
                    })}
                </RadioGroup>
            </FormControl>
            <div className="moji-form">
                <Grid
                    squares={mojiArray}
                    onClick={(i: number, j: number) => handleMoji(i, j)}
                />
            </div>
            <div>length: {length}, index: {index}, moji: {moji}</div>
            <Button variant="contained" color="primary" onClick={() => submit()}>
                検索！
            </Button>
            <Typography component="div">
                {cand.map(item => {
                    return (
                        <Box fontWeight="fontWeightLight" m={1}>{item}</Box>
                    )
                })}
            </Typography>
        </div>
    );
}

export default InputForm;
