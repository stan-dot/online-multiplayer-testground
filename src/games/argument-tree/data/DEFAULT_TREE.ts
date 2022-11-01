import { Statement, Topic } from '../types/TopicTypes';

const loremData: Statement[] = [
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    id: '51',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title:
      'Fusce vehicula elit ut orci fermentum, eget condimentum neque bibendum.',
    id: '52',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title:
      'Nullam tincidunt ipsum id mauris ullamcorper, eu congue elit consequat.',
    id: '53',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Sed vestibulum odio sit amet ex pulvinar rhoncus.',
    id: '54',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Curabitur suscipit est non pharetra dapibus.',
    id: '55',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title:
      'Donec hendrerit massa a nibh suscipit, in bibendum tellus scelerisque.',
    id: '49',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Nulla placerat arcu ullamcorper quam pharetra lobortis.',
    id: '48',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Sed egestas tellus vitae massa fermentum aliquet.',
    id: '47',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Aenean dignissim urna vel porta iaculis.',
    id: '46',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Nam id libero in nulla pharetra dictum blandit ac est.',
    id: '45',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Praesent faucibus dui interdum, dapibus elit vel, sagittis sem.',
    id: '44',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title:
      'Vestibulum sit amet magna feugiat, consequat erat in, eleifend sapien.',
    id: '43',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title:
      'Pellentesque sit amet ante sit amet magna feugiat iaculis at ut diam.',
    id: '42',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Donec id tellus sit amet lectus volutpat congue.',
    id: '42',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title:
      'Mauris euismod est vitae orci consequat bibendum tincidunt eget turpis.',
    id: '41',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title:
      'Nulla hendrerit eros quis nisi ullamcorper, vel convallis urna hendrerit.',
    id: '40',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Morbi scelerisque turpis ac malesuada luctus.',
    id: '39',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Suspendisse a lectus pulvinar, placerat quam ac, ultrices orci.',
    id: '38',
    supportingChildren: [],
    opposingChildren: [],
  },
  {
    title: 'Sed quis leo quis justo euismod tincidunt.',
    id: '37',
    supportingChildren: [],
    opposingChildren: [],
  },
];

const testStatement3: Statement = {
  title: "I've been observing this clock for a couple of hourse",
  id: '3',
  supportingChildren: [],
  opposingChildren: [],
};
const testStatement4: Statement = {
  title: 'even a broken clock is right twice a day',
  id: '4',
  supportingChildren: [],
  opposingChildren: [],
};

const testStatment2: Statement = {
  title: 'The clock has been showing 1:30 for some time now.',
  id: '2',
  supportingChildren: [testStatement3],
  opposingChildren: [...loremData],
};

const testStatement1: Statement = {
  title: 'It must be different time than 1:30',
  id: '1',
  supportingChildren: [testStatment2],
  opposingChildren: [testStatement4],
};

export const DEFAULT_TREE: Topic = {
  statements: [testStatement1],
  metadata: {
    creatorsIds: [],
    confirmationPercent: 0,
    tags: [],
    triggerWarnings: [],
    question: '',
    imageUrl: undefined,
  },
};
