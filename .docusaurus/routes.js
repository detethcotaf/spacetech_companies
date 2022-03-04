
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
    component: ComponentCreator('/spacetech_companies/docs','bf3'),
    routes: [
      {
        path: '/spacetech_companies/docs/companies',
        component: ComponentCreator('/spacetech_companies/docs/companies','d34'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/intro',
        component: ComponentCreator('/spacetech_companies/docs/intro','ba2'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/spacetech_companies/docs/tutorial-basics/congratulations','c03'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/spacetech_companies/docs/tutorial-basics/create-a-blog-post','622'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/spacetech_companies/docs/tutorial-basics/create-a-document','2a4'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/spacetech_companies/docs/tutorial-basics/create-a-page','078'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/spacetech_companies/docs/tutorial-basics/deploy-your-site','8d8'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/spacetech_companies/docs/tutorial-basics/markdown-features','2e9'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/spacetech_companies/docs/tutorial-extras/manage-docs-versions','f35'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech_companies/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/spacetech_companies/docs/tutorial-extras/translate-your-site','22e'),
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
