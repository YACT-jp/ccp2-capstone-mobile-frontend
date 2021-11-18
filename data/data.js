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