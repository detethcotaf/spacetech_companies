
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
    component: ComponentCreator('/spacetech_companies/docs','7c2'),
    routes: [
      {
        path: '/spacetech_companies/docs/blockchain/blockchain_entry',
        component: ComponentCreator('/spacetech_companies/docs/blockchain/blockchain_entry','145'),
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
        path: '/spacetech_companies/docs/space/data_processing',
        component: ComponentCreator('/spacetech_companies/docs/space/data_processing','7fb'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/nasa_earthdata',
        component: ComponentCreator('/spacetech_companies/docs/space/nasa_earthdata','e2a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/remote_sensing_basic',
        component: ComponentCreator('/spacetech_companies/docs/space/remote_sensing_basic','122'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/satellite_data_solutions',
        component: ComponentCreator('/spacetech_companies/docs/space/satellite_data_solutions','fd6'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/space/spacetech_companies',
        component: ComponentCreator('/spacetech_companies/docs/space/spacetech_companies','1b4'),
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
