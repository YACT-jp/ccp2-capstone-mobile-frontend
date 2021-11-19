//For use later with API:
// const fetchData = async () => {
//   const response = await fetch('https://randomuser.me/api/')
//   const data = await response.json()
//   return data
// }

//For use in other component:
// const printData = async () => {
//   try {
//     const data = await fetchData()
//     console.log('Data', data)
//   } catch (error) {
//     console.error('Problem', error)
//   }
// }

const mediaResults = () => {
  const data =`[{'Name': 'Death Note', 'Media ID': 1},
    {'Name': 'Mob Psycho 100', 'Media ID': 2},
    {'Name': 'Steins Gate', 'Media ID': 3},
    {'Name': 'Kimi No Na Wa (Your Name)', 'Media ID': 4},
    {'Name': 'Lost In Translation', 'Media ID': 5},
    {'Name': 'Kill Bill', 'Media ID': 6}]`.replace(/'/g, '"');
  return(data);
}

export default mediaResults;