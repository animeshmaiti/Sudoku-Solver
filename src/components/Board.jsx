import React, { useRef, useState } from 'react';
import { useGetSolution } from './hooks/useGetSolution';

export const Board = () => {
  const [matrix, setMatrix] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(''))
  );
  const inputRefs = useRef([]);
  const getSolution = useGetSolution();

  // Handle input change
  const handleInputChange = (rowIndex, colIndex, value) => {
    // Only accept digits 0-9
    if (value === '' || /^[0-9]$/.test(value)) {
      const newMatrix = [...matrix];
      newMatrix[rowIndex][colIndex] = value === '' ? '' : parseInt(value, 10);
      setMatrix(newMatrix);
    }

    const nextIndex = rowIndex * 9 + colIndex + 1;
    if (nextIndex < 81 && value !== '') {
      inputRefs.current[nextIndex].focus();
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Matrix:', matrix);
    // Here you can send the matrix to your backend
    getSolution(matrix).then((solution) => {
      console.log('Solution:', solution);
    //   if (solution) {
    //     setMatrix(solution);
    //   }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <table className="sudoku-table">
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => {
                const inputIndex = rowIndex * 9 + colIndex;
                return (
                  <td
                    key={colIndex}
                    className={
                      colIndex % 3 === 0 && colIndex !== 0
                        ? 'vertical-separator'
                        : ''
                    }
                  >
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleInputChange(rowIndex, colIndex, e.target.value)
                      }
                      maxLength="1"
                      ref={(el) => (inputRefs.current[inputIndex] = el)} // Set ref for each input
                      onKeyDown={(e) => {
                        // Move focus on arrow keys
                        if (e.key === 'ArrowRight') {
                          e.preventDefault();
                          const nextIndex = rowIndex * 9 + colIndex + 1;
                          if (nextIndex < 81) {
                            inputRefs.current[nextIndex].focus();
                          }
                        }
                        if (e.key === 'ArrowLeft') {
                          e.preventDefault();
                          const nextIndex = rowIndex * 9 + colIndex - 1;
                          if (nextIndex >= 0) {
                            inputRefs.current[nextIndex].focus();
                          }
                        }
                        if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          const nextIndex = (rowIndex - 1) * 9 + colIndex;
                          if (nextIndex >= 0) {
                            inputRefs.current[nextIndex].focus();
                          }
                        }
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          const nextIndex = (rowIndex + 1) * 9 + colIndex;
                          if (nextIndex < 81) {
                            inputRefs.current[nextIndex].focus();
                          }
                        }
                        if (e.key === 'Backspace') {
                          const prevIndex = rowIndex * 9 + colIndex - 1;
                          // Allow default behavior first so that input value is updated
                          if (prevIndex >= 0) {
                            setTimeout(() => {
                              inputRefs.current[prevIndex].focus();
                            }, 0);
                          }
                        }
                      }}
                      style={{
                        width: '40px',
                        height: '40px',
                        textAlign: 'center',
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
};
// import React from 'react'
// import { useGetSolution } from './hooks/useGetSolution';

// export const Board = () => {
//     let matrix=[
//         [9, 5, 7, 0, 1, 3, 0, 8, 4],
//         [4, 8, 3, 0, 5, 7, 1, 0, 6],
//         [0, 1, 2, 0, 4, 9, 5, 3, 7],
//         [1, 7, 0, 3, 0, 4, 9, 0, 2],
//         [5, 0, 4, 9, 7, 0, 3, 6, 0],
//         [3, 0, 9, 5, 0, 8, 7, 0, 1],
//         [8, 4, 5, 7, 9, 0, 6, 1, 3],
//         [0, 9, 1, 0, 3, 6, 0, 7, 5],
//         [7, 0, 6, 1, 8, 5, 4, 0, 9]
//     ];
//     const getSolution = useGetSolution();
//     const handleSubmit = () => {
//         //     event.preventDefault();
//             console.log('Submitted Matrix:', matrix);
//             // Here you can send the matrix to your backend
//             getSolution(matrix).then((solution) => {
//               console.log('Solution:', solution);
//             //   if (solution) {
//             //     setMatrix(solution);
//             //   }
//             });
//           };
//   return (
//     <button onClick={handleSubmit}>Submit</button>
//   )
// }
