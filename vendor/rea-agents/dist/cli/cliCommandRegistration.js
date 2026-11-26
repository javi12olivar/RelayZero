export const plain = (load, register) => ({ analysis: false, load, register });
export const withAnalysis = (load, register) => ({ analysis: true, load, register });
