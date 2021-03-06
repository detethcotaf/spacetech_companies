
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
    component: ComponentCreator('/spacetech_companies/blog','50e'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/archive',
    component: ComponentCreator('/spacetech_companies/blog/archive','c23'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/first-blog-post',
    component: ComponentCreator('/spacetech_companies/blog/first-blog-post','d70'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/long-blog-post',
    component: ComponentCreator('/spacetech_companies/blog/long-blog-post','8bb'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/mdx-blog-post',
    component: ComponentCreator('/spacetech_companies/blog/mdx-blog-post','c38'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/tags',
    component: ComponentCreator('/spacetech_companies/blog/tags','446'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/tags/docusaurus',
    component: ComponentCreator('/spacetech_companies/blog/tags/docusaurus','44a'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/tags/facebook',
    component: ComponentCreator('/spacetech_companies/blog/tags/facebook','4b8'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/tags/hello',
    component: ComponentCreator('/spacetech_companies/blog/tags/hello','373'),
    exact: true
  },
  {
    path: '/spacetech_companies/blog/tags/hola',
    component: ComponentCreator('/spacetech_companies/blog/tags/hola','55b'),
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
    component: ComponentCreator('/spacetech_companies/docs','871'),
    routes: [
      {
        path: '/spacetech_companies/docs/companies',
        component: ComponentCreator('/spacetech_companies/docs/companies','d34'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/data_processing',
        component: ComponentCreator('/spacetech_companies/docs/data_processing','88c'),
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
        path: '/spacetech_companies/docs/nasa_earthdata',
        component: ComponentCreator('/spacetech_companies/docs/nasa_earthdata','887'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/remote_sensing_basic',
        component: ComponentCreator('/spacetech_companies/docs/remote_sensing_basic','5c9'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/satellite_data_solutions',
        component: ComponentCreator('/spacetech_companies/docs/satellite_data_solutions','51d'),
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
