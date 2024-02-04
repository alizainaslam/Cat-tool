import { testText, test2Text } from "./api.mjs";
const userResponse = document.querySelector(".user-response");
const userInput = document.querySelector(".user-input");

// Test.Text
async function inputTestText(apiLinkForBothTest) {
  const inputValue = userInput.value;
  const getResponse = await apiLinkForBothTest;

  // Function for read input from standard 1️⃣ ✅
  function standardInput() {
    const nCommand = "-n";
    let index = "";
    for (let i = 0; i < inputValue.length; i++) {
      if (!isNaN(inputValue[i])) {
        index += inputValue[i].trim();
      }
    }

    const responseForCompleteJSON =
      inputValue.includes(nCommand) && index !== "";
    if (responseForCompleteJSON) {
      userResponse.innerHTML += `<p>${getResponse[index]}</p>`;
    } else {
      userResponse.innerHTML += `<p>${getResponse.join("<p></p>")}</p>`;
    }
  }

  // Numbers the line min to max 2️⃣ ✅
  function numberOfLines() {
    let indexOfLines = inputValue.match(/\d+/g);
    if (indexOfLines) {
      // Check if numeric values were found in the user input
      let firstIndex = Number(indexOfLines[0]);
      let lastIndex = Number(indexOfLines[1]);

      const finelIndex = [];

      // Adjust loop range to iterate from smaller to larger index
      for (
        let i = Math.min(firstIndex, lastIndex);
        i <= Math.max(firstIndex, lastIndex);
        i++
      ) {
        finelIndex.push(i);
      }

      const res = finelIndex.map((ele) => getResponse[ele]);
      userResponse.innerHTML += `<p>${res.join("<p></p>")}</p>`;
    }
  }

  // Blank Lines 3️⃣ ✅
  function blankLines() {
    const outputLines = [];
    let blankLine = inputValue.match(/\d+/g);

    const firstIndex = blankLine[0];
    const secondIndex = blankLine[1];
    outputLines.push(firstIndex, secondIndex);

    const res = outputLines.map((ele) => getResponse[ele]);
    userResponse.innerHTML += `<p>${res.join("<p></p>")}</p>`;
  }

  // Invoke the appropriate function based on the input
  if (inputValue.includes("|")) {
    numberOfLines();
  } else if (inputValue.includes("head")) {
    blankLines();
  } else {
    standardInput();
  }

  userInput.value = "";
}

// Function for DISPLAY Data.
const handleUserResponse = async () => {
  const inputValue = userInput.value.trim().toLowerCase();

  if (inputValue.includes("test.text") && inputValue.includes("test2.text")) {
    await inputTestText(testText);
    await inputTestText(test2Text);
  } else if (inputValue.includes("test.text")) {
    await inputTestText(testText);
  } else if (inputValue.includes("test2.text")) {
    await inputTestText(test2Text);
  }

  userInput.value = "";
};

// Function for CLEAR Data.
const clearPrompt = () => {
  const clsPrompt = userInput.value.trim().toLowerCase();
  if (clsPrompt === "cls") {
    userResponse.innerHTML = `<p>Enter Command for outPut:</p>`;
    userInput.value = "";
  }
};

// ------------
userInput.addEventListener("change", handleUserResponse);
userInput.addEventListener("keydown", clearPrompt);
