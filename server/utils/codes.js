function newWorkspaceCode(currentCodes) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let numbersFirst, code;

  do {
    numbersFirst = Math.random() < 0.5;
    code = "";

    for (let i = 0; i < 6; i++) {
      if ((i < 3 && numbersFirst) || (i >= 3 && !numbersFirst)) {
        code += numbers.charAt(Math.floor(Math.random() * numbers.length));
      } else {
        code += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
    }
  } while (currentCodes.has(code));

  return code;
}

module.exports = { newWorkspaceCode };
