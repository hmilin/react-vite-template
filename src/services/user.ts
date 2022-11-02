export type User = {
  id: string;
  username: string;
  ninckname: string;
  avatarUrl: string;
  email?: string;
  mobile?: string;
};

export function fetchUser() {
  const user = {
    id: 'C21121309514446500000002181843',
    username: 'hhh',
    ninckname: '一个零基础前端',
    avatarUrl: '/api/filestorage/group1/M00/00/18/CgoLFGMFmn6AWaQbAAHslIekblg599.png',
    mobile: '123456',
  } as User;
  return Promise.resolve({
    data: user,
  });
}
