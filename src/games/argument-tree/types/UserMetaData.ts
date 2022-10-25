export type UserData = {
  areasOfInterest: string[];
  joinDate: Date;
  statistics: StatisticsMetadata;
  gameStatistics: GamificationMetadata;
};

export type StatisticsMetadata = {
  topicsStarted: number;
  statementsInSupport: number;
  statemenetsInOpposition: number;
};

export type GamificationMetadata = {
  coins: number;
  starsGained: number;
  achievements: string[];
};
