
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/spacetech_companies/',
    component: ComponentCreator('/spacetech_companies/','25e'),
    exact: true
  },
  {
    path: '/spacetech_companies/__docusaurus/debug',
    component: ComponentCreator('/spacetech_companies/__docusaurus/debug','fd5'),
    exact: true
  },
  {
    path: '/spacetech_companies/__docusaurus/debug/config',
    component: ComponentCreator('/spacetech_companies/__docusaurus/debug/config','4b6'),
    exact: true
  },
  {
    path: '/spacetech_companies/__docusaurus/debug/content',
    component: ComponentCreator('/spacetech_companies/__docusaurus/debug/content','55b'),
    exact: true
  },
  {
    path: '/spacetech_companies/__docusaurus/debug/globalData',
    component: ComponentCreator('/spacetech_companies/__docusaurus/debug/globalData','0bc'),
    exact: true
  },
  {
    path: '/spacetech_companies/__docusaurus/debug/metadata',
    component: ComponentCreator('/spacetech_companies/__docusaurus/debug/metadata','16a'),
    exact: true
  },
  {
    path: '/spacetech_companies/__docusaurus/debug/registry',
    component: ComponentCreator('/spacetech_companies/__docusaurus/debug/registry','6a5'),
    exact: true
  },
  {
    path: '/spacetech_companies/__docusaurus/debug/routes',
    component: ComponentCreator('/spacetech_companies/__docusaurus/debug/routes','856'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog',
    component: ComponentCreator('/spacetech_companies/blog','d1a'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/archive',
    component: ComponentCreator('/spacetech_companies/blog/archive','c23'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/tags',
    component: ComponentCreator('/spacetech_companies/blog/tags','446'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/tags/docusaurus',
    component: ComponentCreator('/spacetech_companies/blog/tags/docusaurus','ba8'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/tags/hello',
    component: ComponentCreator('/spacetech_companies/blog/tags/hello','196'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/welcome',
    component: ComponentCreator('/spacetech_companies/blog/welcome','e6a'),
    exact: true
  },
  {
    path: '/spacetech_companies/docs/tags',
    component: ComponentCreator('/spacetech_companies/docs/tags','15e'),
    exact: true
  },
  {
    path: '/spacetech_companies/markdown-page',
    component: ComponentCreator('/spacetech_companies/markdown-page','0e7'),
    exact: true
  },
  {
    path: '/spacetech_companies/docs',
    component: ComponentCreator('/spacetech_companies/docs','43f'),
    routes: [
      {
        path: '/spacetech_companies/docs/blockchain/blockchain_entry',
        component: ComponentCreator('/spacetech_companies/docs/blockchain/blockchain_entry','145'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/blockchain/ipfs',
        component: ComponentCreator('/spacetech_companies/docs/blockchain/ipfs','ec0'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/blockchain/nft_entry',
        component: ComponentCreator('/spacetech_companies/docs/blockchain/nft_entry','a63'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/cadence/capability',
        component: ComponentCreator('/spacetech_companies/docs/cadence/capability','e0f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/cadence/ft',
        component: ComponentCreator('/spacetech_companies/docs/cadence/ft','963'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/cadence/marketplace',
        component: ComponentCreator('/spacetech_companies/docs/cadence/marketplace','378'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/cadence/nft',
        component: ComponentCreator('/spacetech_companies/docs/cadence/nft','a1f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/cadence/overview',
        component: ComponentCreator('/spacetech_companies/docs/cadence/overview','25a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/cadence/resource',
        component: ComponentCreator('/spacetech_companies/docs/cadence/resource','417'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/home',
        component: ComponentCreator('/spacetech_companies/docs/home','50c'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/remote_sensing/remote_sensing_basic',
        component: ComponentCreator('/spacetech_companies/docs/space/remote_sensing/remote_sensing_basic','0e2'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/satellite_data/data_processing',
        component: ComponentCreator('/spacetech_companies/docs/space/satellite_data/data_processing','f91'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/satellite_data/s2_oah',
        component: ComponentCreator('/spacetech_companies/docs/space/satellite_data/s2_oah','90f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/satellite_data/satellitedata_type',
        component: ComponentCreator('/spacetech_companies/docs/space/satellite_data/satellitedata_type','02c'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/solutions/nasa_earthdata',
        component: ComponentCreator('/spacetech_companies/docs/space/solutions/nasa_earthdata','d2a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/solutions/satellitedata_solutions',
        component: ComponentCreator('/spacetech_companies/docs/space/solutions/satellitedata_solutions','b44'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/solutions/spacetech_companies',
        component: ComponentCreator('/spacetech_companies/docs/space/solutions/spacetech_companies','3ea'),
        exact: true,
        'sidebar': "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
