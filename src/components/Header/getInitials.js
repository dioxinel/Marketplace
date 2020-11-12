export function getInitials(fullName) {
  if (fullName.length >= 2) {
    return fullName[0][0] + fullName[1][0];
  } else {
    return fullName[0][0] + fullName[0][1];
  }
}
