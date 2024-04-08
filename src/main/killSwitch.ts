const expire = 1725123600000; // 01.May.2024

const fourWeeks = 1000 * 60 * 60 * 24 * 7 * 8; // 4 weeks
const today = new Date().getTime();

export const isExpired = expire < today;
export const versionExpirityDateInMs = expire;
export const willExpireSoon = expire < today + fourWeeks;
