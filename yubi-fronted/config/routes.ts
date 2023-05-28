export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: 'login', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: 'welcome', icon: 'smile', component: './Welcome' },
  { icon: 'BarChart', path: '/add_chart', name: '智能分析', component: './Chart/AddChart' },
  { icon: 'PieChart', path: '/my_chart', name: '我的图表', component: './Chart/MyChart' },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: 'sub-page', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
