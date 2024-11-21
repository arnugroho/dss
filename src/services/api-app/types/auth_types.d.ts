declare namespace API_TYPES {
  type LoginParams = {
    username?: string;
    password?: string;
  };

  type User = {
    name?: string;
    username?: string;
    // password?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    lastLogin?: string;
    image?: string;
    menu?: any;
  };
}
