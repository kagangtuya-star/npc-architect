// scripts/data-vault.js
import { raceData } from './data/races.js';
import { classData } from './data/classes.js';
import { socialClassData } from './data/social.js';
import { attitudeData } from './data/attitude.js';
import { mannerismData } from './data/mannerisms.js';
import { quirkData } from './data/quirks.js';
import { interestData } from './data/interests.js';
import { personalityData } from './data/personality.js';

export const ARCHITECT_DATA = {
    races: raceData,
    classes: classData,
    socialClasses: socialClassData,
    attitudes: attitudeData,
    mannerisms: mannerismData,
    quirks: quirkData,
    interests: interestData,
    personalities: personalityData
};