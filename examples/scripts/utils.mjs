const getData = async function(url) {
  const rawData = await fetch(url);
  const data = await rawData.json();
  return data;
};

export { getData };