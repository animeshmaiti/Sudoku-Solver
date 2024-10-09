export const SolvedBoard = ({solvedMatrix}) => {
    
  return (
    <table className='sudoku-table-sol'>
      <tbody>
        {solvedMatrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((value, colIndex) => {
              return (
                <td
                  key={colIndex}
                  className={
                    colIndex % 3 === 0 && colIndex !== 0
                      ? 'vertical-separator'
                      : ''
                  }
                >
                  {value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
