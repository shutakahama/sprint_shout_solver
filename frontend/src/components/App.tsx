import React, {useEffect, useState} from "react";
import Axios from 'axios';
import Board from "./Grid";
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import styled from 'styled-components';
import Paper from "@material-ui/core/Paper";
// import data from '../data/sprintshoutdict.json';

const InputForm: React.FC = () => {
  const [moji, setMoji] = useState<string>("あ");
  const [length, setLength] = useState<number>(7);
  const [index, setIndex] = useState<number>(0);
  const [cand, setCand] = useState<string[]>([]);

  const handleLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value))
  }
  const handleIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(Number(e.target.value))
  }
  const handleMoji = (i: number, j: number) => {
    if (mojiArray[i][j] === "　") {
      return
    }
    else if (mojiArray[i][j] === "゛") {
      setMoji(String.fromCharCode(moji.charCodeAt(0) + 1));
    }
    else if (mojiArray[i][j] === "゜") {
      setMoji(String.fromCharCode(moji.charCodeAt(0) + 2));
    }
    else if (mojiArray[i][j] === "小") {
      setMoji(String.fromCharCode(moji.charCodeAt(0) - 1));
    }
    else {
      setMoji(mojiArray[i][j]);
    }
  }

  useEffect(() => {
    const postData = () => {
      Axios.post('http://localhost:8000/word_list', {
        length: length,
        idx: index,
        moji: moji
      }).then(res => {
        let arr = [];
        console.log(res)
        for (let key in res.data.result) {
          arr.push(res.data.result[key]);
        }
        setCand(arr)
      }).catch(error => {
        setCand(['存在しません'])
      })
    }
    postData();
  }, [length, index, moji]);

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
      <Wrapper>
        <div>
          <title>sprint shout solver</title>
        </div>
        <Title>
          Sprint Shout Solver!
        </Title>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <Row>
              <FormControl component="fieldset">
                <FormLabel component="legend">長さ</FormLabel>
                <RadioGroup row aria-label="length-form" name="length-form" value={length} onChange={handleLength}>
                  {[6, 7, 8, 9].map(item => {
                    return (
                        <FormControlLabel
                            value={item}
                            key={item}
                            control={<Radio />}
                            label={item}
                            checked={length === item}/>
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Row>
            <Row>
              <FormControl component="fieldset">
                <FormLabel component="legend">位置</FormLabel>
                <RadioGroup row aria-label="index-form" name="index-form" value={index} onChange={handleIndex}>
                  {[...Array(length)].map((v, i)=> i).map(item => {
                    return (
                        <FormControlLabel
                            value={item}
                            key={item}
                            control={<Radio />}
                            label={item}
                            checked={index === item}/>
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Row>
            <Row>
              <div className="moji-form">
                <FormLabel component="legend">文字</FormLabel>
                <Board
                    squares={mojiArray}
                    onClick={(i: number, j: number) => handleMoji(i, j)}
                />
              </div>
            </Row>
            {/*<Row>*/}
            {/*  <Button id="search" variant="contained" color='primary' onClick={() => submit()}>*/}
            {/*    検索！*/}
            {/*  </Button>*/}
            {/*</Row>*/}
          </Grid>
          <Grid item xs={6}>
            <Row>
              検索結果
            </Row>
            <Row>
              <div>長さ: {length}   位置: {index}   文字: {moji}</div>
            </Row>
            <Row>
                {cand.map(item => {
                  return (
                      <Paper
                          style={{
                            textAlign: 'center',
                            width: '20rem',
                            margin: '0.5rem auto',
                            padding: 8,
                            background: 'whitesmoke'
                          }}
                      >
                        {item}
                      </Paper>
                      // <StyledPaper>{item}</StyledPaper>
                  )
                })}
            </Row>
          </Grid>
        </Grid>
      </Wrapper>
  );
}

export default InputForm;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: MidnightBlue;
  font-family: "arial black";
`;

const Wrapper = styled.div`
  margin: 4rem 2rem;
`;

const Row = styled.div`
  text-align: center;
  margin: 1.2rem 0;
`;

// const StyledPaper = styled(Paper)`
//   textAlign: center;
//   width: 20rem;
//   margin: 0.5rem auto;
//   padding: 12;
//   background: whitesmoke;
// `;