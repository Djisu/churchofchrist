//import bcrypt from 'bcryptjs'

const data = {
  /*   users: [
    {
      name: 'Djesu',
      email: 'djesu@yahoomail.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user111@example.com',
      password: bcrypt.hashSync('7654', 8),
      isAdmin: false,
    },
    ,
    {
      name: 'Paul',
      email: 'pfleischer2002@yahoo.co.uk',
      password: bcrypt.hashSync('5678', 8),
      isAdmin: false,
    },
  ], */
  members: [
    {
      _id: '1',
      name: 'Efua Sam',
      address: 'P O Box 3453, Accra',
      telno: '0249221188',
      employment: 'Nurse',
      description: 'A young and energietic person full of grace and truth',
      image: '/images/passport7.jpg',
      gpAddress: '373-543-123',
    },
    {
      _id: '2',
      name: 'Mary Mensah',
      address: 'P O Box 3453, Accra',
      telno: '0249221145',
      employment: 'Carpenter',
      description: 'I offer a good carpentry service',
      image: '/images/passport2.jpg',
      gpAddress: '373-543-412',
    },
    {
      _id: '3',
      name: 'Esi Asante',
      address: 'P O Box 3453, Accra',
      telno: '0249223123',
      employment: 'Mason',
      description: 'A good and accurate service is what I will give to you',
      image: '/images/passport3.jpg',
      gpAddress: '373-543-909',
    },
    {
      _id: '4',
      name: 'Yaa smith-Asante',
      address: 'P O Box 34, Accra',
      telno: '0249222222',
      employment: 'Plumber',
      description: 'I offer a very good and lasting plumbing services',
      image: '/images/passport4.jpg',
      gpAddress: '373-543-123',
    },
    {
      _id: '5',
      name: 'Steve Apiah',
      address: 'P O Box 4123, Accra',
      telno: '0249221188',
      employment: 'Tiler',
      description:
        'Tile laying is my profession. I will give you neat service.',
      image: '/images/passport5.jpg',
      gpAddress: '373-543-123',
    },
    {
      _id: '6',
      name: 'Ama Ntim',
      address: 'P O Box 3453, Accra',
      telno: '0249221145',
      employment: 'Lawyer',
      description:
        'Trust all your legal requirements into my care and I will deliver',
      image: '/images/passport6.jpg',
      gpAddress: '373-543-123',
    },
  ],
}
export default data
