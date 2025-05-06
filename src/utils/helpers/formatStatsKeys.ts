export const formatStatsKeys = (key: string) => {
  switch (key) {
    case 'goals':
      return 'Goals';
    case 'assists':
      return 'Assists';
    case 'mvp':
      return 'MVP';
    case 'conceded':
      return 'Conceded';
    case 'ownGoals':
      return 'Own Goals';
    case 'pensScored':
      return 'Pens Scored';
    case 'pensMissed':
      return 'Pens Missed';
    case 'pensSaved':
      return 'Pens Saved';
    case 'redCard':
      return 'Red Card';
    case 'yellowCards':
      return 'Yellow Cards';
    case 'cleanSheet':
      return 'Clean Sheet';
    default:
      break;
  }
};
