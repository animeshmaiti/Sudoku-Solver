export const useGetSolution = () => {
    
  const getSolution = async (matrix) => {
    const formattedMatrix = matrix.map((row) =>
      row.map((value) => (value === '' ? 0 : value))
    );
    try {
      const response = await fetch('/matrix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matrix: formattedMatrix }), // Send the matrix in the request body
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      return data.received_matrix;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return {getSolution};
};