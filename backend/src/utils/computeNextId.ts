function increment(char: string) {
  if (char.length == 1) {
    return String.fromCharCode(char.charCodeAt(0) + 1);
  } else {
    throw new Error("Incorrect input parameter given in function");
  }
}

export default function computeNextId(s: string): string {
  let newS = s.split("");

  for (let i = s.length - 1; i >= 0; i--) {
    let last = newS[i];
    if (last == "9") {
      newS[i] = "0";
    } else if (last == "Z") {
      newS[i] = "A";
    } else {
      newS[i] = increment(newS[i]);
      return newS.join("");
    }
  }

  throw new Error("String reached its limit (ZZ999)");
}

export function computeNextPegId(s: string): string {
  let newS = s.split("");

  for (let i = s.length - 1; i >= 0; i--) {
    let last = newS[i];
    if (last == "9") {
      newS[i] = "0";
    } else if (last == "G") {
      break;
    } else {
      newS[i] = increment(newS[i]);
      return newS.join("");
    }
  }

  throw new Error("String reached its limit (PEG999999999)");
}
