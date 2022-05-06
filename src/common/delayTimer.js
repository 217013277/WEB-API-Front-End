const timeout = (ms) => {
    return new Promise( resolve => setTimeout(resolve, ms))
}

export default timeout

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
