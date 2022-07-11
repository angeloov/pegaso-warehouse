function increment(char: string) {
  if (char.length == 1) {
    return String.fromCharCode(char.charCodeAt(0) + 1);
  } else {
    throw new Error("Incorrect input parameter given in function");
  }
}

let i = 1;
export default function computeNextId(s: any): string {
  if (s == "ZZ999") new Error("String reached its limit");

  const last = s[s.length - i];

  if (last == "9" || last == "Z") {
    s = s.split("");

    if (last.match(/[0-9]/)) 
      s[s.length - i] = "0";
    else 
      s[s.length - i] = "A";
    
    s = s.join("");

    i++;
    return computeNextId(s);
  } else {
    let newS = s.split("");
    newS[s.length - i] = increment(newS[s.length - i]);
    newS = newS.join("");

    return newS;
  }
}
