// those that hold the token are then able to add more texts to decrease the total value
// there need to be 2 opposite drives 
// tbh the sort of thing like IPFS uses to not replicate data is ver important
// todo there were old files:account operations, crux, global-values

// TODO 'both' should trigger a flag
export type Veracity = 'true' | 'false' | 'both' | 'neither';
const allVeracities: Veracity[] = ['true', 'false', 'both', 'neither'];
// should have a word list in the contract maybe? no, that's a separate operation tbh
// need to trace game theory for all of these
// it is time - bound project, like r/place
// the resource that this moves is information from the old texts
// need to paint all the blackboxes and the social stuff

type LogicalGroupDivision = {
  opinion: Opinion,
  views: Map<Veracity, number>
}

const getNumberOfVeracity = (opinion: Opinion, v: Veracity, parties: Party[]) => {
  const mergedTrees: Tree[] = parties.reduce((accumulator: Tree[], current: Party) => accumulator.concat(current.trees), []);
  return mergedTrees
    .reduce((accumulator: number, current: Tree) =>
      accumulator + (current.find((o: Opinion) => o === opinion) ? 1 : 0)
      , 0);
}

/**
 * note: Jain logic here isn't descriptive enough, as we have 4 values
 * @param opinion 
 * @param parties 
 * @returns 
 */
const getGroupDivision = (opinion: Opinion, parties: Party[]): LogicalGroupDivision => {
  return {
    opinion: opinion,
    views: new Map(allVeracities.map(v => [v, getNumberOfVeracity(opinion, v, parties)])),
  }
}



type Opinion = {
  text: Claim,
  value: Veracity,
  source?: string // that is an optional link etc
};

type AtomicClaim = string;
type Claim = AtomicClaim | SingleOrderHigherLevelClaim | DoubleHigherLevelClaim;
type Operator = SingleOperator | DoubleOperator | CustomOperator;
type LogicalOperator = () => Veracity;
// TODO non-logical operators
// TODO prune this only for double crux
// but one larger meta game and minigames sounds really fun
type DoubleOperator = (claim1: Opinion, claim2: Opinion) => Opinion;
type SingleOperator = (claim: Opinion) => Opinion;
type CustomOperator = DoubleOperator | SingleOperator;

/**
 * true only if both true, false otherwise
 * todo that needs implementation
 * @param claim1 
 * @param claim2 
 */
const strict_and: DoubleOperator = (claim1: Opinion, claim2: Opinion): Opinion => {
  return claim1;
  // if (claim1.value === claim2.value && claim1.value === 'true') {
  //   const and: DoubleHigherLevelClaim = {
  //     operator: 
  //   }
  //   return
  // }
  // todo might do microtransactions? idk, it should be addictive
};

const negateVeracity = (v: Veracity): Veracity => {
  return v === 'false' ? 'true' : 'false';
}

const not_operator: SingleOperator = (claim: Opinion): Opinion => {
  return {
    value: negateVeracity(claim.value),
    text: claim.text
  }
}

type SingleOrderHigherLevelClaim = {
  operator: Operator,
  object: Claim
}

type DoubleHigherLevelClaim = {
  operator: Operator,
  object1: Claim,
  object2: Claim
}

type Tree = Opinion[]; // todo change, it will be like a linked list

const treeify = (claims: Claim[]): Tree[] => {
  return [];
}

type EpistemicHealth = {
  numberOfSubtrees: number,
  verisimilitude: number, // to how many of the global statements does correspond
}

const getEpistemicHealth = (p: Party): EpistemicHealth => {
  return {
    numberOfSubtrees: p.trees.length,
    verisimilitude: p.claims.length / globalParty.claims.length
  }
}

type Party = {
  address: string, // TODO remake into some identity system
  claims: Claim[],
  status: EpistemicHealth,
  trees: Tree[]
};

type NewInput = {
  author: Party,
  data: AtomicClaim
}


const inputToAtomic = (raw: AtomicClaim): AtomicClaim => {
  return raw;
}

const claimFromUserInput = (raw: AtomicClaim): Opinion => {
  const text: AtomicClaim = inputToAtomic(raw);
  return {
    text: text,
    value: 'true'
  }
};

const checkDefiniteVeracity = (v: Veracity): boolean => {
  return (v === 'false' || v === 'true');
}


// cruxes should be generated automatically from connected statements with operators
// TODO interactive function
const checkValidCrux = (claim: Opinion): boolean => {
  const valid: boolean = checkDefiniteVeracity(claim.value);
};

const getCruxSuggestionsForATree = (tree: Tree, o: Opinion): Opinion[] => {
  return [];
};

// iterate through possible statements, present to both, you get a list of disagreements
// that's an algorithm bit, might do some ML here
// TODO might do the choice based also on the height of the pyramid built on top of something - or as an additional parameter
const getDisagreement = (p1: Party, p2: Party): Opinion => {
  return {
    text: '',
    value: 'false'
  }
}

const getCruxSuggestionsForAParty = (p: Party, o: Opinion): Opinion[] => {
  return p.trees
    .reduce((accumulator: Opinion[], tree: Tree) =>
      accumulator.concat(getCruxSuggestionsForATree(tree, o))
      , []);
}

type DoubleCrux = {
  claim: Claim,
  position1: Veracity,
  position2: Veracity,
}

// todo this might be different if we use hashes and store on ipfs
// todo solve the -1 check issue
const getDoubleCruxes = (cruxes1: Opinion[], cruxes2: Opinion[]): DoubleCrux[] => {

  const [longer, shorter] = cruxes1.length > cruxes2.length ? [cruxes1, cruxes2] : [cruxes2, cruxes1];

  const unfiltered: (DoubleCrux | string)[] = longer.map(current => getOneDoubleCrux(current, shorter));
  return unfiltered.reduce((acc: DoubleCrux[], current: DoubleCrux | string) => { }, []);
};

const getOneDoubleCrux = (singularOpinion: Opinion, manyOpinions: Opinion[]): DoubleCrux | string => {
  const index: number = manyOpinions.map(o => o.text).indexOf(singularOpinion.text);
  if (index === -1) {
    return 'e';
  }
  return {
    claim: singularOpinion.text,
    position1: singularOpinion.value,
    position2: manyOpinions[index].value
  }
};


const bigLoop = (p1: Party, p2: Party): void => {

  const originalDisagreement: Opinion = getDisagreement(p1, p2);
  const doubleCruxes: DoubleCrux[] = givenOpinionGetDoubleCruxes(p1, p2, originalDisagreement);

  // then a table of 
  const ITERATION_LIMIT = 100;
  let count = 0;
  while (doubleCruxes.length > 0 && count < 100) {
    // display some question, get responses
    count++;
  }
  console.log("print congratulations");
}

const givenOpinionGetDoubleCruxes = (p1: Party, p2: Party, opinion: Opinion): DoubleCrux[] => {
  const cruxSuggestions1: Opinion[] = getCruxSuggestionsForAParty(p1, opinion);
  const cruxSuggestions2: Opinion[] = getCruxSuggestionsForAParty(p2, opinion);
  return getDoubleCruxes(cruxSuggestions1, cruxSuggestions2);
};


const ranking: Party[] = [];
const hostspots: Claim[] = [];
const convergenceQuotient: number = 0;
const saturation: number = 0;

const globalParty: Party = {
  address: "",
  claims: [],
  status: {
    numberOfSubtrees: 0,
    verisimilitude: 0
  },
  trees: []
};

// need to put the global part and nft mining part into a solidity contract
const globalStatus = {
  globalParty: globalParty,
  hostspots: []
}

// todo make possible like philosopher watermarks
type NftGenerationSetup = {
  color: string,
  other?: string
}

const rankedColors: Map<number, string> = new Map([[0.1, 'blue'], [0.9, 'gold']]);

const rewardEpistemicStatus = (status: EpistemicHealth): NftGenerationSetup => {
  return {
    color: rankedColors.get(Math.floor(status.verisimilitude)) ?? 'pink',
  };
}

const produceShape = (tree: Tree): void => {

}

/**
 * it is golden if you have high coherence. here it's a game. it's a one off event
 * someone has to get there first
 * @param party 
 * @returns 
 */
const generateNFT = (party: Party): void => {
  const setup: NftGenerationSetup = rewardEpistemicStatus(getEpistemicHealth(party));

  console.log("generating nft");
} 