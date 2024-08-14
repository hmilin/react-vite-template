import { http, HttpResponse } from 'msw';

export default [
  http.get('/api/user/profile', ({ request, params, cookies }) => {
    return HttpResponse.json(
      {
        code: '0',
        data: {
          userId: 'xxx',
          userCode: null,
          userMobile: 'xxx',
          nickname: 'xxx',
          userEmail: '',
          userPassword: null,
          userState: '0',
          userType: 'mobile',
          registerDate: '2023-12-13T09:51:44.000+00:00',
          modifyDate: '2023-11-08T03:19:52.000+00:00',
          source: 'admin',
          identityCertified: true,
          permission: 'admin',
        },
      },
      {
        status: 202,
        statusText: 'Mocked status',
      },
    );
  }),
];
