import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Board } from './Board';
import { SolvedBoard } from './SolvedBoard';
import { useGetSolution } from './hooks/useGetSolution';

export const Home = () => {
  const [solvedMatrix, setSolvedMatrix] = useState(
    Array(9).fill().map(() => Array(9).fill(''))
  );
  
  const { getSolution } = useGetSolution();

  const handleSolve = async (matrix) => {
    const solution = await getSolution(matrix);
    setSolvedMatrix(solution);
  };

  return (
    <>
      <Navbar />
      <div className='problem-sol-board'>
        <Board onSolve={handleSolve} />
        <SolvedBoard solvedMatrix={solvedMatrix} />
      </div>
    </>
  );
};
