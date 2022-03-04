
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/spacetech-companies/',
    component: ComponentCreator('/spacetech-companies/','d56'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog',
    component: ComponentCreator('/spacetech-companies/blog','783'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog/archive',
    component: ComponentCreator('/spacetech-companies/blog/archive','6c3'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog/first-blog-post',
    component: ComponentCreator('/spacetech-companies/blog/first-blog-post','7d6'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog/long-blog-post',
    component: ComponentCreator('/spacetech-companies/blog/long-blog-post','faf'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog/mdx-blog-post',
    component: ComponentCreator('/spacetech-companies/blog/mdx-blog-post','ffe'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog/tags',
    component: ComponentCreator('/spacetech-companies/blog/tags','26a'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog/tags/docusaurus',
    component: ComponentCreator('/spacetech-companies/blog/tags/docusaurus','e28'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog/tags/facebook',
    component: ComponentCreator('/spacetech-companies/blog/tags/facebook','bc5'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog/tags/hello',
    component: ComponentCreator('/spacetech-companies/blog/tags/hello','ff3'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog/tags/hola',
    component: ComponentCreator('/spacetech-companies/blog/tags/hola','729'),
    exact: true
  },
  {
    path: '/spacetech-companies/blog/welcome',
    component: ComponentCreator('/spacetech-companies/blog/welcome','de7'),
    exact: true
  },
  {
    path: '/spacetech-companies/docs/tags',
    component: ComponentCreator('/spacetech-companies/docs/tags','db0'),
    exact: true
  },
  {
    path: '/spacetech-companies/markdown-page',
    component: ComponentCreator('/spacetech-companies/markdown-page','606'),
    exact: true
  },
  {
    path: '/spacetech-companies/docs',
    component: ComponentCreator('/spacetech-companies/docs','968'),
    routes: [
      {
        path: '/spacetech-companies/docs/intro',
        component: ComponentCreator('/spacetech-companies/docs/intro','9be'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech-companies/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/spacetech-companies/docs/tutorial-basics/congratulations','a61'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech-companies/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/spacetech-companies/docs/tutorial-basics/create-a-blog-post','50b'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech-companies/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/spacetech-companies/docs/tutorial-basics/create-a-document','10d'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech-companies/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/spacetech-companies/docs/tutorial-basics/create-a-page','77c'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech-companies/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/spacetech-companies/docs/tutorial-basics/deploy-your-site','76c'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech-companies/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/spacetech-companies/docs/tutorial-basics/markdown-features','00d'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech-companies/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/spacetech-companies/docs/tutorial-extras/manage-docs-versions','caa'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/spacetech-companies/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/spacetech-companies/docs/tutorial-extras/translate-your-site','200'),
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
